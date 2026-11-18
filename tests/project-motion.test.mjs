import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { attachProjectMotion } from '../src/lib/project-motion.mjs';

function harness({ reduced = false, intro = false, loaded = true } = {}) {
  const listeners = new Map();
  const triggers = [];
  const timelines = [];
  const contexts = [];
  const mutations = [];
  const imageListeners = new Map();
  const image = { complete: loaded, naturalWidth: loaded ? 640 : 0,
    addEventListener: (name, fn) => imageListeners.set(name, fn),
    removeEventListener: (name) => imageListeners.delete(name) };
  const line = {};
  const nodes = [{}, {}, {}];
  const paths = [{}, {}];
  const shot = { querySelector: (s) => s === 'img' ? image : line };
  const flow = { querySelectorAll: (s) => s === '[data-project-node]' ? nodes : paths };
  const doc = {
    documentElement: { classList: { contains: () => intro } },
    querySelectorAll: (s) => s === '[data-project-shot]' ? [shot] : [flow],
  };
  const win = {
    addEventListener: (name, fn) => listeners.set(name, fn),
    removeEventListener: (name) => listeners.delete(name),
    MutationObserver: class {
      constructor(fn) { this.callback = fn; mutations.push(this); }
      observe() {}
      disconnect() { this.disconnected = true; }
    },
  };
  let cleanup;
  const media = {
    add(query, fn) {
      assert.equal(query, '(prefers-reduced-motion: no-preference)');
      this.callback = fn;
      if (!reduced) cleanup = fn();
    },
    revert() { cleanup?.(); cleanup = undefined; },
  };
  const gsap = {
    matchMedia: () => media,
    context: () => {
      const context = { add: (fn) => fn(), revert() { this.reverted = true; } };
      contexts.push(context);
      return context;
    },
    timeline: () => {
      const steps = [];
      const timeline = {};
      for (const method of ['set', 'to', 'fromTo']) {
        timeline[method] = (...args) => { steps.push({ method, args }); return timeline; };
      }
      timelines.push(steps);
      return timeline;
    },
  };
  const ScrollTrigger = { create: (vars) => {
    const trigger = { ...vars, kill() { this.killed = true; } };
    triggers.push(trigger);
    return trigger;
  } };
  const detach = attachProjectMotion({ gsap, ScrollTrigger, doc, win, introClass: 'intro-active' });
  const enter = (target) => triggers.filter((t) => t.trigger === target && !t.killed).at(-1)?.onEnter();
  return { detach, listeners, triggers, timelines, contexts, mutations, imageListeners, shot, flow, nodes, paths, image, line, enter,
    finishIntro() { intro = false; mutations.at(-1).callback(); },
    reduce() { media.revert(); },
    enable() { cleanup = media.callback(); },
    load() { image.complete = true; image.naturalWidth = 640; imageListeners.get('load')?.(); },
  };
}

test('flow has its own once-visible trigger: three readable highlights alternate with two connector draws', () => {
  const h = harness();
  assert.equal(h.timelines.length, 0);
  assert.equal(h.triggers.length, 2);
  assert.ok(h.triggers.every((t) => t.once && t.start === 'top 92%'));
  h.enter(h.shot);
  assert.equal(h.timelines.length, 1, 'image visibility does not start the mobile flow');
  h.enter(h.flow);
  const steps = h.timelines[1];
  const highlights = steps.filter((s) => s.method === 'to' && s.args[1].borderColor);
  assert.deepEqual(highlights.map((s) => s.args[0]), h.nodes);
  const draws = steps.filter((s) => s.method === 'fromTo');
  assert.deepEqual(draws.map((s) => s.args[0]), h.paths);
  for (let i = 0; i < 2; i++) {
    assert.ok(steps.indexOf(highlights[i]) < steps.indexOf(draws[i]));
    assert.ok(steps.indexOf(draws[i]) < steps.indexOf(highlights[i + 1]));
    assert.equal(draws[i].args[1].drawSVG, '0%');
    assert.equal(draws[i].args[2].drawSVG, '100%');
    const cleanup = steps.findIndex(({ method, args }) => method === 'set' && args[0] === h.paths[i]
      && args[1].clearProps === 'strokeDasharray,strokeDashoffset');
    assert.ok(cleanup > steps.indexOf(draws[i]) && cleanup < steps.indexOf(highlights[i + 1]));
  }
  assert.equal(steps.filter((s) => s.args[1]?.clearProps === 'borderColor,boxShadow').length, 3);
  for (const { args } of steps) {
    for (const vars of args.slice(1).filter((v) => v && typeof v === 'object')) {
      assert.equal(vars.opacity, undefined, 'labels never fade');
      assert.equal(vars.y, undefined, 'no entry translation');
      assert.equal(vars.repeat, undefined, 'no loop');
    }
  }
  h.enter(h.flow);
  assert.equal(h.timelines.length, 2);
  h.detach();
});

test('loaded screenshot retains the once-only 400ms mask and transient accent line', () => {
  const h = harness({ loaded: false });
  assert.equal(h.triggers.some((t) => t.trigger === h.shot), false);
  h.load();
  h.enter(h.shot);
  const steps = h.timelines[0];
  const mask = steps.find((s) => s.method === 'fromTo' && s.args[0] === h.image);
  assert.equal(mask.args[1].clipPath, 'inset(0 100% 0 0)');
  assert.equal(mask.args[2].clipPath, 'inset(0 0% 0 0)');
  assert.equal(mask.args[2].duration, 0.4);
  assert.equal(mask.args[2].clearProps, 'clipPath');
  const sweep = steps.find((s) => s.method === 'fromTo' && s.args[0] === h.line);
  assert.equal(sweep.args[1].left, '0%');
  assert.equal(sweep.args[2].left, '100%');
  assert.equal(sweep.args[2].duration, 0.4);
  assert.equal(mask.args[3], sweep.args[3]);
  assert.ok(steps.some((s) => s.args[0] === h.line && s.args[1].clearProps === 'left,opacity'));
  h.enter(h.shot);
  assert.equal(h.timelines.length, 1);
  h.detach();
});

test('intro completion gates both visuals without consuming their triggers', () => {
  const h = harness({ intro: true });
  assert.equal(h.triggers.length, 0);
  h.finishIntro();
  assert.equal(h.triggers.length, 2);
  assert.equal(h.mutations[0].disconnected, true);
  h.enter(h.flow);
  assert.equal(h.timelines.length, 1);
  h.detach();
});

test('reduced motion stays static; changes and pagehide revert and kill all motion without replaying seen visuals', () => {
  const reduced = harness({ reduced: true });
  assert.equal(reduced.triggers.length, 0);
  assert.equal(reduced.timelines.length, 0);
  reduced.detach();
  const h = harness();
  h.enter(h.shot);
  h.enter(h.flow);
  h.reduce();
  assert.equal(h.contexts[0].reverted, true);
  assert.ok(h.triggers.every((t) => t.killed));
  h.enable();
  h.enter(h.shot);
  h.enter(h.flow);
  assert.equal(h.timelines.length, 2);
  h.listeners.get('pagehide')();
  assert.ok(h.contexts.every((c) => c.reverted));
  h.listeners.get('pageshow')({ persisted: true });
  h.listeners.get('pageshow')({ persisted: true });
  h.enter(h.flow);
  assert.equal(h.timelines.length, 2);
  h.detach();
  assert.equal(h.listeners.size, 0);
});

test('cleanup also cancels a pending intro or image load', () => {
  const intro = harness({ intro: true });
  intro.detach();
  assert.equal(intro.mutations[0].disconnected, true);
  const image = harness({ loaded: false });
  image.detach();
  assert.equal(image.imageListeners.size, 0);
});

test('card hooks isolate connectors from the shared observer and static markup stays visible', async () => {
  const card = await readFile(new URL('../src/components/home/ProjectCard.astro', import.meta.url), 'utf8');
  const section = await readFile(new URL('../src/components/home/ProjectsSection.astro', import.meta.url), 'utf8');
  assert.doesNotMatch(card, /data-draw-svg|data-project-entry/);
  for (const hook of ['shot', 'sweep', 'flow', 'node', 'connector']) assert.ok(card.includes(`data-project-${hook}`));
  assert.doesNotMatch(card, /data-project-static-connector|case-connector-motion/);
  assert.match(card, /background: var\(--accent\)/);
  assert.doesNotMatch(card, /clip-path:|visibility: hidden/);
  assert.match(section, /registerPlugin\(ScrollTrigger, DrawSVGPlugin\)/);
  assert.match(section, /attachProjectMotion/);
  assert.doesNotMatch(section, /data-project-motion-toggle/);
  assert.doesNotMatch(section, /gsap\.from\(|data-project-entry/);
});
