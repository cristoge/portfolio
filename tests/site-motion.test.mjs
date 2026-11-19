import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { attachSiteMotion } from '../src/lib/site-motion.mjs';

test('localized pages reveal editorial text without duplicate container entrances or split controls', async () => {
  const pages = [
    ['', ['hero-kicker', 'projects-heading', 'case-summary', 'education-heading', 'education-note', 'stack-heading', 'stack-description']],
    ['personal/', ['personal-heading', 'personal-body', 'entry-kicker', 'entry-content']],
    ['contact/', ['contact-heading', 'contact-channels-heading', 'contact-form-heading', 'contact-map-heading']],
    ['projects/rag-pdf/', ['project-header', 'project-summary', 'project-context', 'detail-heading', 'outcome-text']],
  ];
  const voidTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr']);
  const ownsEntrance = (attrs) => /\bdata-motion(?:\s|=|$)/.test(attrs) || /\bclass="[^"]*\breveal\b/.test(attrs);
  for (const locale of ['', 'es/', 'en/']) {
    for (const [route, markers] of pages) {
      const html = await readFile(new URL(`../dist/${locale}${route}index.html`, import.meta.url), 'utf8');
      const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
      assert.ok(main);
      const stack = [], covered = new Set();
      for (const token of main.matchAll(/<\/?([a-z][\w:-]*)\b([^>]*)>/gi)) {
        const [, tag, attrs] = token;
        if (token[0].startsWith('</')) {
          const index = stack.findLastIndex((node) => node.tag === tag);
          if (index !== -1) stack.length = index;
          continue;
        }
        const node = { tag, attrs };
        if (/\bdata-text-reveal(?:\s|=|$)/.test(attrs)) {
          assert.ok(!['a', 'button', 'input', 'label', 'form'].includes(tag), `${locale}${route}: no split controls`);
          for (const ancestor of [...stack, node]) {
            assert.equal(ownsEntrance(ancestor.attrs), false, `${locale}${route}: duplicate entrance on ${ancestor.tag} ${ancestor.attrs}`);
            for (const marker of markers) {
              if (new RegExp(`(?:id="${marker}"|class="[^"]*\\b${marker}\\b)`).test(ancestor.attrs)) covered.add(marker);
            }
          }
          assert.ok(!stack.some(({ tag }) => ['button', 'label', 'form'].includes(tag)), 'form content stays unsplit');
        }
        if (!voidTags.has(tag) && !token[0].endsWith('/>')) stack.push(node);
      }
      assert.deepEqual([...covered].sort(), [...markers].sort(), `${locale}${route}: representative editorial hooks`);
    }
  }
});

function harness({ intro = false, reduced = false, observersAvailable = true, text = false, embedded = false, stable = false } = {}) {
  const tweens = [], observers = [], mutations = [], contexts = [], splits = [];
  const listeners = new Map();
  const targetListeners = new Map();
  const target = {
    disabled: false,
    dataset: text ? { textReveal: '' } : {},
    querySelector: (selector) => selector === '[data-scramble-text]' && embedded ? {} : null,
    matches: (selector) => selector === ':focus-visible' || (stable && selector !== ':focus-within'),
    closest: () => null,
    addEventListener: (name, fn) => targetListeners.set(name, fn),
    removeEventListener: (name) => targetListeners.delete(name),
  };
  const doc = {
    documentElement: { classList: { contains: () => intro } },
    querySelectorAll: () => [target],
    activeElement: null,
  };
  const win = {
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: (name) => listeners.delete(name),
    matchMedia: () => ({ matches: true }),
    IntersectionObserver: observersAvailable ? class {
      constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
      observe(el) { this.targets.add(el); }
      unobserve(el) { this.targets.delete(el); }
      disconnect() { this.disconnected = true; }
    } : undefined,
    MutationObserver: class {
      constructor(callback) { this.callback = callback; mutations.push(this); }
      observe() {}
      disconnect() { this.disconnected = true; }
    },
  };
  let cleanup;
  const gsap = {
    matchMedia: () => ({
      add(query, fn) {
        assert.equal(query, '(prefers-reduced-motion: no-preference)');
        if (!reduced) cleanup = fn();
      },
      revert() { cleanup?.(); },
    }),
    context: () => {
      const ctx = { add: fn => fn(), revert() { this.reverted = true; } };
      contexts.push(ctx);
      return ctx;
    },
    fromTo: (...args) => tweens.push(args),
    to: (...args) => tweens.push(args),
  };
  const SplitText = { create(element, options) {
    const split = { element, options, words: [{}, {}, {}], revert() { this.reverted = true; } };
    splits.push(split);
    return split;
  } };
  const detach = attachSiteMotion({ gsap, SplitText, doc, win, introClass: 'intro-active' });
  return { detach, tweens, observers, mutations, contexts, splits, listeners, target, targetListeners, doc,
    reduce: () => cleanup?.(),
    finishIntro: () => { intro = false; mutations[0].callback(); },
  };
}

test('reveals visible content once and restores its inline animation properties', () => {
  const h = harness();
  assert.equal(h.tweens.length, 0);
  h.observers[0].callback([{ target: h.target, isIntersecting: false }]);
  assert.equal(h.tweens.length, 0);
  const enter = () => h.observers[0].callback([{ target: h.target, isIntersecting: true }]);
  enter(); enter();
  assert.equal(h.tweens.length, 1);
  assert.equal(h.tweens[0][1].opacity, 0);
  assert.equal(h.tweens[0][2].clearProps, 'opacity,transform');
  assert.equal(h.observers[0].targets.size, 0);
  h.detach();
});

test('waits for terminal completion before observing or attaching interactions', () => {
  const h = harness({ intro: true });
  assert.equal(h.observers.length, 0);
  assert.equal(h.targetListeners.size, 0);
  h.finishIntro();
  assert.equal(h.observers.length, 1);
  assert.equal(h.mutations[0].disconnected, true);
  h.detach();
});

test('reduced motion leaves content static and installs no interaction handlers', () => {
  const h = harness({ reduced: true });
  assert.equal(h.observers.length, 0);
  assert.equal(h.targetListeners.size, 0);
  assert.equal(h.tweens.length, 0);
  h.detach();
});

test('pointer and keyboard feedback preserve disabled button and focus behavior', () => {
  const h = harness();
  h.targetListeners.get('pointerenter')();
  assert.equal(h.tweens.at(-1)[1].y, -2);
  h.targetListeners.get('pointerleave')();
  assert.equal(h.tweens.at(-1)[1].y, 0);
  h.target.disabled = true;
  const count = h.tweens.length;
  h.targetListeners.get('focus')();
  assert.equal(h.tweens.length, count);
  h.target.disabled = false;
  h.targetListeners.get('focus')();
  assert.equal(h.tweens.at(-1)[1].y, -2);
  h.targetListeners.get('blur')();
  assert.equal(h.tweens.at(-1)[1].y, 0);
  h.detach();
});

test('preference change and page lifecycle revert motion and remove handlers', () => {
  const h = harness();
  h.listeners.get('pagehide')();
  assert.equal(h.contexts[0].reverted, true);
  assert.equal(h.observers[0].disconnected, true);
  assert.equal(h.targetListeners.size, 0);
  h.listeners.get('pageshow')({ persisted: true });
  h.listeners.get('pageshow')({ persisted: true });
  assert.equal(h.observers.length, 2);
  h.reduce();
  assert.equal(h.contexts[1].reverted, true);
  assert.equal(h.targetListeners.size, 0);
  h.detach();
  assert.equal(h.listeners.size, 0);
});

test('missing observer support never hides content', () => {
  const h = harness({ observersAvailable: false });
  assert.equal(h.tweens.length, 0);
  assert.equal(h.observers.length, 0);
  h.detach();
});


test('paragraphs fade as a single block without splitting, staggering or movement', () => {
  const h = harness({ text: true });
  const enter = () => h.observers[0].callback([{ target: h.target, isIntersecting: true }]);
  enter(); enter();
  assert.equal(h.tweens.length, 1);
  assert.equal(h.splits.length, 0);
  assert.equal(h.tweens[0][0], h.target);
  assert.deepEqual(h.tweens[0][1], { opacity: 0 });
  assert.equal(h.tweens[0][2].opacity, 1);
  assert.equal(h.tweens[0][2].y, undefined);
  assert.equal(h.tweens[0][2].stagger, undefined);
  assert.equal(h.tweens[0][2].clearProps, 'opacity');
  h.detach();
});

test('paragraph fades respect intro, reduced motion and cleanup', () => {
  const reduced = harness({ text: true, reduced: true });
  assert.equal(reduced.tweens.length, 0);
  reduced.detach();
  const h = harness({ text: true, intro: true });
  assert.equal(h.observers.length, 0);
  h.finishIntro();
  h.observers[0].callback([{ target: h.target, isIntersecting: true }]);
  h.reduce();
  assert.equal(h.contexts[0].reverted, true);
  h.detach();
});

test('embedding headings have no second fade or translation from the site observer', () => {
  const h = harness({ text: true, embedded: true });
  h.observers[0].callback([{ target: h.target, isIntersecting: true }]);
  assert.equal(h.splits.length, 0);
  assert.equal(h.tweens.length, 0);
  h.detach();
});

test('labels and controls have no text entrance', () => {
  const h = harness({ text: true, stable: true });
  h.observers[0].callback([{ target: h.target, isIntersecting: true }]);
  assert.equal(h.tweens.length, 0);
  h.detach();
});
