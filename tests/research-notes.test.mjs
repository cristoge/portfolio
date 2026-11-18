import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

// Run after `npm run build`: assertions inspect the HTML visitors receive.
const papers = [
  ['word2vec', 'word2vec', '2013', 'https://arxiv.org/abs/1301.3781'],
  ['attention', 'Attention Is All You Need', '2017', 'https://arxiv.org/abs/1706.03762'],
  ['gpt2', 'GPT-2', '2019', 'https://openai.com/index/better-language-models/'],
  ['rag', 'RAG', '2020', 'https://arxiv.org/abs/2005.11401'],
  ['instructgpt', 'InstructGPT', '2022', 'https://arxiv.org/abs/2203.02155'],
  ['react', 'ReAct', '2022', 'https://arxiv.org/abs/2210.03629'],
];
const locales = [
  ['', 'ca'],
  ['es/', 'es'],
  ['en/', 'en'],
];
const htmlAt = (path) => readFile(new URL(`../dist/${path}index.html`, import.meta.url), 'utf8');
const plainText = (html) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

test('research notes are subdued behind the main introduction', async () => {
  const html = await htmlAt('es/');
  const paths = [...new Set([...html.matchAll(/href="(\/_astro\/[^\"]+\.css)"/g)].map((match) => match[1]))];
  const styles = (await Promise.all(paths.map((path) => readFile(new URL(`../dist${path}`, import.meta.url), 'utf8')))).join('\n');
  const note = styles.match(/\.paper-note(?:\[[^\]]+\])?\{([^}]+)\}/)?.[1];
  const board = styles.match(/\.research-notes(?:\[[^\]]+\])?\{([^}]+)\}/)?.[1];
  const introduction = styles.match(/\.hero-intro-body(?:\[[^\]]+\])?\{([^}]+)\}/)?.[1];
  assert.ok(note, 'Rendered note styles exist');
  assert.ok(board, 'Rendered background notes exist');
  assert.ok(introduction, 'Rendered foreground introduction exists');
  assert.match(note, /background:var\(--surface\)/, 'Notes share the page surface palette');
  assert.match(note, /color:var\(--ink\)/, 'Note text follows the active theme');
  assert.match(note, /border:1px solid var\(--line\)/, 'Notes use the same fine borders as the page');
  assert.match(board, /position:absolute/);
  assert.match(board, /z-index:0/);
  assert.match(board, /pointer-events:none/, 'The background does not intercept the main actions');
  assert.match(note, /opacity:\.2(?:;|$)/);
  assert.match(introduction, /z-index:1/);
  assert.doesNotMatch(html, /--paper:|--tilt:/, 'No individual pastel colors or rotations');
});

for (const [prefix, lang] of locales) {
  test(`${lang}: the six linked research notes appear only inside the homepage hero`, async () => {
    const html = await htmlAt(prefix);
    const hero = html.match(/<section\b[^>]*class="hero-intro"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(hero, 'Homepage hero exists');
    assert.match(hero, /<aside\b[^>]*aria-labelledby="research-notes-heading"[^>]*lang="en"/);
    assert.match(hero, /id="research-notes-heading"/);
    const notes = [...hero.matchAll(/<a\b([^>]*data-paper="[^"]+"[^>]*)>([\s\S]*?)<\/a>/g)];
    assert.equal(notes.length, 6);
    assert.equal((html.match(/data-paper=/g) ?? []).length, 6, 'No repeated notes below the hero');
    for (const [index, [id, title, year, href]] of papers.entries()) {
      const [, attributes, content] = notes[index];
      assert.ok(attributes.includes(`data-paper="${id}"`));
      assert.ok(attributes.includes(`href="${href}"`));
      assert.match(attributes, /target="_blank"/);
      assert.match(attributes, /rel="noopener noreferrer"/);
      assert.ok(plainText(content).includes(title));
      assert.ok(plainText(content).includes(year));
      assert.match(content, /<svg\b[^>]*aria-hidden="true"/);
    }
  });

  test(`${lang}: existing hero, terminal, and project content is preserved`, async () => {
    const html = await htmlAt(prefix);
    assert.match(html, new RegExp(`<html\\b[^>]*lang="${lang}"`));
    const hero = html.match(/<section\b[^>]*class="hero-intro"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(plainText(hero).includes('Cristo'));
    assert.ok(plainText(hero).includes('AWS'));
    assert.match(hero, /href="\/CV_Cristopher_Gordon.pdf"/);
    assert.match(hero, /href="https:\/\/github.com\/cristoge"/);
    assert.match(html, /class="intro"/);
    for (const slug of ['rag-pdf', 'safe-reply', 'bikeshare']) {
      assert.ok(html.includes(`href="/${prefix}projects/${slug}"`));
    }
  });

  test(`${lang}: inner pages do not include research notes`, async () => {
    for (const path of ['contact/', 'personal/', 'projects/rag-pdf/', 'projects/safe-reply/', 'projects/bikeshare/']) {
      const html = await htmlAt(`${prefix}${path}`);
      assert.doesNotMatch(html, /data-paper=|research-notes-heading/);
    }
  });
}
