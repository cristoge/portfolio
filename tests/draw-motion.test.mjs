import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import { attachDrawMotion } from '../src/lib/draw-motion.mjs';

function harness({ reduced = false, intro = false, text = false } = {}) {
  const listeners = new Map();
  const tweens = [];
  const observers = [];
  const mutations = [];
  const shape = { closest: () => null, hasAttribute: () => false };
  const skipped = { ...shape, hasAttribute: () => true };
  const source = { textContent: 'Cristo' };
  const vector = { textContent: '' };
  const textTweens = [];
  const svg = text ? {
    dataset: { scrambleText: 'Cristo' },
    querySelector: (selector) => selector === '.embedding-source' ? source : vector,
  } : { querySelectorAll: () => [shape, skipped] };
  const root = { classList: { contains: () => intro } };
  const doc = { documentElement: root, querySelectorAll: () => [svg] };
  const win = {
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: (name) => listeners.delete(name),
    IntersectionObserver: class {
      constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this); }
      observe(target) { this.targets.add(target); }
      unobserve(target) { this.targets.delete(target); }
      disconnect() { this.targets.clear(); this.disconnected = true; }
    },
    MutationObserver: class {
      constructor(callback) { this.callback = callback; mutations.push(this); }
      observe() {}
      disconnect() { this.disconnected = true; }
    },
  };
  let mediaCleanup;
  const contexts = [];
  const gsap = {
    matchMedia: () => ({
      add(query, callback) {
        assert.equal(query, '(prefers-reduced-motion: no-preference)');
        if (!reduced) mediaCleanup = callback();
      },
      revert() { mediaCleanup?.(); },
    }),
    context: () => {
      const ctx = { add: (fn) => fn(), revert() { this.reverted = true; } };
      contexts.push(ctx);
      return ctx;
    },
    fromTo: (...args) => tweens.push(args),
    timeline: () => {
      const timeline = {
        set: () => timeline,
        to: (target, vars) => { textTweens.push({ target, vars }); return timeline; },
      };
      return timeline;
    },
  };
  const detach = attachDrawMotion({ gsap, doc, win, introClass: 'intro-active' });
  return { detach, listeners, observers, mutations, tweens, contexts, shape, svg, source, vector, textTweens,
    finishIntro: () => { intro = false; mutations.at(-1).callback(); },
    reduce: () => mediaCleanup?.(),
  };
}

test('draws only stroked, non-dashed shapes once when visible, without moving content', () => {
  const h = harness();
  assert.equal(h.tweens.length, 0);
  h.observers[0].callback([{ isIntersecting: true, target: h.svg }]);
  assert.equal(h.tweens.length, 1);
  const [targets, from, to] = h.tweens[0];
  assert.deepEqual(targets, [h.shape]);
  assert.equal(from.drawSVG, '0%');
  assert.equal(to.drawSVG, '100%');
  assert.equal(to.clearProps, 'strokeDasharray,strokeDashoffset');
  assert.equal(to.repeat, undefined);
  assert.equal(to.x, undefined);
  assert.equal(h.observers[0].targets.size, 0);
  h.detach();
  assert.equal(h.contexts[0].reverted, true);
  assert.equal(h.listeners.size, 0);
});

test('reduced motion creates no observers or tweens', () => {
  const h = harness({ reduced: true });
  assert.equal(h.observers.length, 0);
  assert.equal(h.tweens.length, 0);
  h.detach();
});

test('scramble targets reuse the terminal-aware drawing lifecycle and reset on reduced motion', () => {
  const h = harness({ intro: true, text: true });
  assert.equal(h.textTweens.length, 0);
  h.finishIntro();
  h.observers[0].callback([{ isIntersecting: true, target: h.svg }]);
  assert.equal(h.textTweens.length, 1);
  assert.equal(h.textTweens[0].vars.scrambleText.text, 'Cristo');
  assert.equal(h.source.textContent, 'Cristo');
  assert.notEqual(h.vector.textContent, '');
  h.reduce();
  assert.equal(h.vector.textContent, '');
  assert.equal(h.contexts[0].reverted, true);
  h.detach();
});

test('waits for terminal completion and disconnects the intro observer', () => {
  const h = harness({ intro: true });
  assert.equal(h.observers.length, 0);
  h.finishIntro();
  assert.equal(h.observers.length, 1);
  assert.equal(h.mutations[0].disconnected, true);
  h.detach();
});

test('motion preference cleanup disconnects viewport and terminal observers', () => {
  for (const intro of [false, true]) {
    const h = harness({ intro });
    h.reduce();
    assert.equal((intro ? h.mutations : h.observers)[0].disconnected, true);
    assert.equal(h.contexts[0].reverted, true);
    h.detach();
  }
});

test('pagehide restores strokes; persisted pageshow restarts with no duplicate observers', () => {
  const h = harness();
  h.listeners.get('pagehide')();
  assert.equal(h.contexts[0].reverted, true);
  h.listeners.get('pageshow')({ persisted: true });
  assert.equal(h.observers.length, 2);
  h.listeners.get('pageshow')({ persisted: true });
  assert.equal(h.observers.length, 2);
  h.detach();
});

test('all 18 localized pages have static visible draw targets and a shared motion bundle', async () => {
  const files = await readdir(new URL('../dist/', import.meta.url), { recursive: true });
  const pages = files.filter((path) => path.endsWith('index.html'));
  assert.equal(pages.length, 18);
  for (const page of pages) {
    const html = await readFile(new URL(`../dist/${page}`, import.meta.url), 'utf8');
    assert.match(html, /<svg[^>]*data-draw-svg/, page);
    assert.match(html, /<script type="module" src="\/_astro\/BaseLayout\.[^"]+\.js"/, page);
    assert.doesNotMatch(html, /data-parallax-depth|--note-x|--note-y/);
    assert.doesNotMatch(html, /<svg[^>]*data-draw-svg[^>]*style="[^"]*(?:visibility:hidden|opacity:0)/);
  }
});


test('embedding titles decode once across repeated viewport entries and page restoration', () => {
  const h = harness({ text: true });
  const enter = () => h.observers.at(-1).callback([{ isIntersecting: true, target: h.svg }]);
  enter(); enter();
  assert.equal(h.textTweens.length, 1);
  h.listeners.get('pagehide')();
  h.listeners.get('pageshow')({ persisted: true });
  enter();
  assert.equal(h.textTweens.length, 1);
  h.detach();
});
