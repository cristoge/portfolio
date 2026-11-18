import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import { attachResearchBackdrop, buildResearchCycle, SCENE_SECONDS } from '../src/lib/research-backdrop.mjs';

const ids = ['word2vec', 'attention', 'gpt2', 'rag', 'instructgpt', 'react'];

function fixture({ reduced = false, intro = false } = {}) {
  const calls = [];
  const scenes = ids.map((id) => ({
    dataset: { paperScene: id },
    querySelectorAll: (selector) => [{ scene: id, selector }],
  }));
  const root = { querySelectorAll: () => scenes };
  const notes = ids.map((id) => ({
    dataset: { paper: id },
    active: false,
    toggleAttribute(name, active) { assert.equal(name, 'data-active-paper'); this.active = active; },
  }));
  const cycle = {
    set: (...args) => { calls.push({ method: 'set', args }); return cycle; },
    fromTo: (...args) => { calls.push({ method: 'fromTo', args }); return cycle; },
    to: (...args) => { calls.push({ method: 'to', args }); return cycle; },
    call: (...args) => { calls.push({ method: 'call', args }); return cycle; },
    pause: () => { cycle.playing = false; return cycle; },
    play: () => { cycle.playing = true; return cycle; },
  };
  let cleanup;
  const gsap = {
    set: () => {},
    timeline: (options) => { cycle.options = options; return cycle; },
    context: (callback) => { callback(); return { revert: () => { cycle.reverted = true; } }; },
    matchMedia: () => ({
      add: (query, callback) => { if (!reduced) cleanup = callback(); },
      revert: () => cleanup?.(),
    }),
  };
  const listeners = new Map();
  const control = {
    hidden: true,
    setAttribute: () => {},
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: (event) => listeners.delete(event),
  };
  const observers = [];
  const mutations = [];
  const doc = {
    hidden: false,
    documentElement: { classList: { contains: () => intro } },
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: (event) => listeners.delete(event),
  };
  const win = {
    addEventListener: (event, callback) => listeners.set(event, callback),
    removeEventListener: (event) => listeners.delete(event),
    IntersectionObserver: class {
      constructor(callback) { this.callback = callback; observers.push(this); }
      observe() {}
      disconnect() { this.disconnected = true; }
    },
    MutationObserver: class {
      constructor(callback) { this.callback = callback; mutations.push(this); }
      observe() {}
      disconnect() { this.disconnected = true; }
    },
  };
  return { gsap, root, notes, control, cycle, calls, doc, win, listeners, observers, mutations,
    finishIntro: () => { intro = false; mutations[0].callback(); },
    reduce: () => cleanup?.(),
  };
}

test('cycles six paper concepts in order, one scene at a time, then repeats', () => {
  const h = fixture();
  buildResearchCycle(h.gsap, h.root, h.notes);
  assert.equal(h.cycle.options.repeat, -1);
  assert.equal(h.cycle.options.paused, true);
  const reveals = h.calls.filter(({ method, args }) => method === 'fromTo' && args[2].autoAlpha === 1);
  assert.deepEqual(reveals.map(({ args }) => args[0].dataset.paperScene), ids);
  assert.deepEqual(reveals.map(({ args }) => args[3]), ids.map((_, i) => i * SCENE_SECONDS));
  const fades = h.calls.filter(({ method, args }) => method === 'to' && args[1].autoAlpha === 0);
  for (let i = 0; i < fades.length; i++) {
    const [, vars, position] = fades[i].args;
    assert.ok(position + vars.duration <= (i + 1) * SCENE_SECONDS);
  }
  const activations = h.calls.filter(({ method }) => method === 'call');
  for (let i = 0; i < ids.length; i++) {
    activations[i].args[0]();
    assert.deepEqual(h.notes.filter((note) => note.active).map((note) => note.dataset.paper), [ids[i]]);
  }
});

test('loop pauses outside the hero, in hidden tabs, and during terminal intro', () => {
  const h = fixture({ intro: true });
  const detach = attachResearchBackdrop({ ...h, introClass: 'intro-active' });
  h.observers[0].callback([{ isIntersecting: true }]);
  assert.equal(h.cycle.playing, false);
  h.finishIntro();
  assert.equal(h.cycle.playing, true);
  h.doc.hidden = true;
  h.listeners.get('visibilitychange')();
  assert.equal(h.cycle.playing, false);
  h.doc.hidden = false;
  h.listeners.get('visibilitychange')();
  assert.equal(h.cycle.playing, true);
  h.observers[0].callback([{ isIntersecting: false }]);
  assert.equal(h.cycle.playing, false);
  detach();
  assert.equal(h.cycle.reverted, true);
  assert.equal(h.listeners.size, 0);
});

test('reduced motion stays static; preference changes and pagehide restore and clean up', () => {
  const reduced = fixture({ reduced: true });
  const detach = attachResearchBackdrop({ ...reduced, introClass: 'intro-active' });
  assert.equal(reduced.calls.length, 0);
  assert.equal(reduced.observers.length, 0);
  assert.equal(reduced.control.hidden, true);
  detach();
  const h = fixture();
  const stop = attachResearchBackdrop({ ...h, introClass: 'intro-active' });
  h.calls.find(({ method }) => method === 'call').args[0]();
  h.listeners.get('pagehide')();
  assert.equal(h.cycle.reverted, true);
  assert.ok(h.notes.every((note) => !note.active));
  assert.equal(h.observers[0].disconnected, true);
  h.listeners.get('pageshow')({ persisted: true });
  assert.equal(h.observers.length, 2);
  h.reduce();
  assert.equal(h.observers[1].disconnected, true);
  stop();
});

test('the accessible pause control stops the loop and preserves the choice across page restoration', () => {
  const h = fixture();
  const stop = attachResearchBackdrop({ ...h, introClass: 'intro-active' });
  h.observers[0].callback([{ isIntersecting: true }]);
  assert.equal(h.control.hidden, false);
  h.listeners.get('click')();
  assert.equal(h.cycle.playing, false);
  assert.equal(h.control.textContent, 'Play motion');
  h.listeners.get('pagehide')();
  h.listeners.get('pageshow')({ persisted: true });
  h.observers[1].callback([{ isIntersecting: true }]);
  assert.equal(h.cycle.playing, false);
  h.listeners.get('click')();
  assert.equal(h.cycle.playing, true);
  assert.equal(h.control.textContent, 'Pause motion');
  stop();
});

test('only localized homepages contain the decorative cycle, without paper cards', async () => {
  for (const prefix of ['', 'es/', 'en/']) {
    const html = await readFile(new URL(`../dist/${prefix}index.html`, import.meta.url), 'utf8');
    assert.match(html, /data-paper-backdrop[^>]*aria-hidden="true"/);
    assert.deepEqual([...html.matchAll(/data-paper-scene="([^"]+)"/g)].map((match) => match[1]), ids);
    assert.doesNotMatch(html, /data-paper="|paper-note|research-notes-heading/, 'The six paper cards are removed');
    assert.match(html, /href="\/CV_Cristopher_Gordon.pdf"/);
    assert.match(html, /href="https:\/\/github.com\/cristoge"/);
    for (const page of ['personal', 'contact', 'projects/rag-pdf']) {
      const inner = await readFile(new URL(`../dist/${prefix}${page}/index.html`, import.meta.url), 'utf8');
      assert.doesNotMatch(inner, /data-paper-backdrop|data-paper-scene/);
    }
  }
});
