import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile, readdir } from 'node:fs/promises';
import { animateEmbeddingText, embeddingVector } from '../src/lib/embedding-text.mjs';

test('embedding-style numbers decode to the exact localized text, then restore its original layer', () => {
  const text = 'Educación';
  const source = { textContent: text };
  const vector = { textContent: '' };
  const target = {
    dataset: { scrambleText: text },
    querySelector: (selector) => selector === '.embedding-source' ? source : vector,
  };
  const steps = [];
  let timing;
  const timeline = {
    set: (target, vars) => { steps.push({ target, vars }); return timeline; },
    to: (target, vars) => { steps.push({ target, vars }); return timeline; },
  };
  const cleanup = animateEmbeddingText({ timeline: (vars = {}) => { timing = vars; return timeline; } }, target);
  assert.match(vector.textContent, /^\[-?0\.\d{2}(?:, -?0\.\d{2})*\]$/);
  assert.equal(source.textContent, text, 'Accessible source is never scrambled');
  const tween = steps.find(({ vars }) => vars.scrambleText);
  assert.equal(tween.target, vector);
  assert.equal(tween.vars.duration, 0.6);
  assert.equal(timing.delay ?? 0, 0);
  assert.ok(tween.vars.scrambleText.revealDelay <= 0.15);
  assert.equal(tween.vars.scrambleText.text, text);
  assert.equal(tween.vars.scrambleText.chars, '0123456789.-[],');
  assert.equal(tween.vars.scrambleText.newClass, 'embedding-decoded');
  assert.ok(tween.vars.scrambleText.revealDelay > 0);
  assert.equal(tween.vars.repeat, undefined);
  assert.deepEqual(steps.at(-2), { target: vector, vars: { opacity: 0 } });
  assert.deepEqual(steps.at(-1), { target: source, vars: { opacity: 1 } });
  cleanup();
  assert.equal(vector.textContent, '');
});

test('numeric embedding metaphor is deterministic and bounded, including Unicode text', () => {
  for (const text of ['Cristo', 'Hola, soy', 'Educació', 'Designing agents', '🤖 AI']) {
    assert.equal(embeddingVector(text), embeddingVector(text));
    const values = JSON.parse(embeddingVector(text));
    assert.ok(values.length >= 1 && values.length <= 4);
    assert.ok(values.every((value) => Number.isFinite(value) && Math.abs(value) < 1));
  }
});

test('all localized pages retain accessible static headings and hidden visual-only vector layers', async () => {
  const files = await readdir(new URL('../dist/', import.meta.url), { recursive: true });
  const pages = files.filter((path) => path.endsWith('index.html'));
  assert.equal(pages.length, 18);
  for (const page of pages) {
    const html = await readFile(new URL(`../dist/${page}`, import.meta.url), 'utf8');
    assert.match(html, /<h1[^>]*>[\s\S]*?data-scramble-text=/, page);
    assert.match(html, /class="embedding-source"[^>]*>[^<]+<\/span>/, page);
    assert.match(html, /class="embedding-vector"[^>]*aria-hidden="true"[^>]*><\/span>/, page);
    for (const layer of html.matchAll(/<span[^>]*class="embedding-(?:source|vector)"[^>]*>/g)) {
      assert.doesNotMatch(layer[0], /aria-live=/, 'Scrambling never creates live announcements');
    }
    for (const link of html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/g)) {
      assert.doesNotMatch(link[0], /data-scramble-text=/, 'Navigation and actions never scramble');
    }
  }
});


test('section headings use embeddings while labels and interactive names stay static', async () => {
  for (const locale of ['', 'es/', 'en/']) {
    const html = await readFile(new URL(`../dist/${locale}index.html`, import.meta.url), 'utf8');
    for (const id of ['projects-heading', 'education-heading', 'stack-heading']) {
      assert.match(html, new RegExp(`<h2[^>]*id="${id}"[^>]*>[\\s\\S]*?data-scramble-text=[\\s\\S]*?</h2>`));
    }
    for (const label of html.matchAll(/<(?:p|h3)[^>]*class="[^"]*(?:eyebrow|stack-label)[^"]*"[^>]*>([\s\S]*?)<\/(?:p|h3)>/g)) {
      assert.doesNotMatch(label[1], /data-scramble-text=/);
    }
  }
});
