import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { attachProjectMotion } from '../src/lib/project-motion.mjs';

function harness({ reduced = false, intro = false } = {}) {
  const listeners = new Map();
  const triggers = [], tweens = [], contexts = [], mutations = [];
  const paths = Array.from({ length: 6 }, () => ({}));
  const flow = { querySelectorAll: () => paths };
  const doc = {
    documentElement: { classList: { contains: () => intro } },
    querySelectorAll(selector) {
      assert.equal(selector, '[data-project-flow]', 'screenshots are never animation targets');
      return [flow];
    },
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
    context() {
      const context = { add: (fn) => fn(), revert() { this.reverted = true; } };
      contexts.push(context);
      return context;
    },
    to(targets, vars) {
      const tween = { targets, vars, playing: !vars.paused,
        play() { this.playing = true; }, pause() { this.playing = false; } };
      tweens.push(tween);
      return tween;
    },
  };
  const ScrollTrigger = { create(vars) {
    const trigger = { ...vars, kill() { this.killed = true; } };
    triggers.push(trigger);
    return trigger;
  } };
  const detach = attachProjectMotion({ gsap, ScrollTrigger, doc, win, introClass: 'intro-active' });
  return { detach, listeners, triggers, tweens, contexts, mutations, flow, paths,
    finishIntro() { intro = false; mutations.at(-1).callback(); },
    reduce() { media.revert(); },
    enable() { cleanup = media.callback(); },
  };
}

test('project connectors use the demo dash loop only while the flow is visible', () => {
  const h = harness();
  assert.equal(h.triggers.length, 1);
  assert.equal(h.tweens.length, 1);
  const tween = h.tweens[0];
  assert.deepEqual(tween.targets, h.paths);
  assert.equal(tween.vars.strokeDashoffset, -390);
  assert.equal(tween.vars.repeat, -1);
  assert.equal(tween.vars.duration, 3);
  assert.equal(tween.vars.ease, 'none');
  assert.equal(tween.playing, false);
  const trigger = h.triggers[0];
  assert.equal(trigger.trigger, h.flow);
  assert.equal(trigger.start, 'top bottom');
  assert.equal(trigger.end, 'bottom top');
  for (const isActive of [true, false, true]) {
    trigger.onToggle({ isActive });
    assert.equal(tween.playing, isActive);
  }
  h.detach();
});

test('intro completion gates the flow and detaches its observer', () => {
  const h = harness({ intro: true });
  assert.equal(h.triggers.length, 0);
  h.finishIntro();
  assert.equal(h.triggers.length, 1);
  assert.equal(h.mutations[0].disconnected, true);
  h.detach();
});

test('reduced motion is static and re-enabling motion restores the continuous flow', () => {
  const reduced = harness({ reduced: true });
  assert.equal(reduced.triggers.length, 0);
  assert.equal(reduced.tweens.length, 0);
  reduced.detach();
  const h = harness();
  h.reduce();
  assert.equal(h.contexts[0].reverted, true);
  assert.ok(h.triggers.every((trigger) => trigger.killed));
  h.enable();
  assert.equal(h.tweens.length, 2);
  h.triggers[1].onToggle({ isActive: true });
  assert.equal(h.tweens[1].playing, true);
  h.detach();
});

test('pagehide cleans up and a persisted pageshow restores one flow', () => {
  const h = harness();
  h.listeners.get('pagehide')();
  assert.ok(h.contexts.every((context) => context.reverted));
  assert.ok(h.triggers.every((trigger) => trigger.killed));
  h.listeners.get('pageshow')({ persisted: true });
  h.listeners.get('pageshow')({ persisted: true });
  assert.equal(h.tweens.length, 2);
  h.detach();
  assert.equal(h.listeners.size, 0);
});

test('cleanup cancels a pending intro', () => {
  const h = harness({ intro: true });
  h.detach();
  assert.equal(h.mutations[0].disconnected, true);
});

test('project markup keeps static screenshots and three layers of moving dashes', async () => {
  const card = await readFile(new URL('../src/components/home/ProjectCard.astro', import.meta.url), 'utf8');
  const section = await readFile(new URL('../src/components/home/ProjectsSection.astro', import.meta.url), 'utf8');
  assert.doesNotMatch(card, /data-draw-svg|data-project-shot|data-project-sweep|data-project-node|case-sweep/);
  assert.match(card, /<img src=\{project.image\} alt="" loading="lazy"/);
  assert.match(card, /data-project-flow/);
  for (const layer of ['base', 'middle', 'upper']) {
    assert.match(card, new RegExp(`class="case-dash case-dash-${layer}"[^>]*data-project-connector`));
  }
  assert.match(card, /stroke-dasharray: 30 100/);
  assert.doesNotMatch(card, /clip-path:|visibility: hidden/);
  assert.match(section, /registerPlugin\(ScrollTrigger\)/);
  assert.match(section, /attachProjectMotion/);
  assert.doesNotMatch(section, /DrawSVGPlugin/);
});
