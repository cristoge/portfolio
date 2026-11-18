import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const cases = [
  ['rag-pdf', '/rag2.webp', 'https://github.com/cristoge/TIC_project'],
  ['safe-reply', '/docs.webp', 'https://github.com/cristoge/rag_revision'],
  ['bikeshare', '/bike2.webp', 'https://github.com/cristoge/bikeshare'],
];
const locales = [
  ['', 'ca', 'Índex de projectes', ['PDF', 'Recuperació', 'Resposta citada']],
  ['es/', 'es', 'Índice de proyectos', ['PDF', 'Recuperación', 'Respuesta citada']],
  ['en/', 'en', 'Project index', ['PDF', 'Retrieval', 'Cited answer']],
];
const markup = (prefix) => readFile(new URL(`../dist/${prefix}index.html`, import.meta.url), 'utf8');

for (const [prefix, lang, label, ragSteps] of locales) {
  test(`${lang}: the archive index targets the three equally structured cases`, async () => {
    const html = await markup(prefix);
    const index = html.match(new RegExp(`<nav\\b[^>]*aria-label="${label}"[^>]*>([\\s\\S]*?)<\\/nav>`))?.[1];
    assert.ok(index, 'the project index has a localized accessible name');
    assert.deepEqual([...index.matchAll(/href="#project-([a-z-]+)"/g)].map((match) => match[1]), cases.map(([slug]) => slug));
    for (const [slug, image, repo] of cases) {
      const article = html.match(new RegExp(`<article\\b[^>]*id="project-${slug}"[^>]*>([\\s\\S]*?)<\\/article>`))?.[1];
      assert.ok(article);
      assert.ok(article.includes(`href="/${prefix}projects/${slug}"`));
      assert.ok(article.includes(`href="${repo}"`));
      assert.ok(article.includes(`src="${image}"`));
      assert.match(article, /<figcaption\b/);
      const flow = article.match(/<ol\b[^>]*aria-label="[^"]+"[^>]*>([\s\S]*?)<\/ol>/)?.[1];
      assert.ok(flow, 'the project flow is an accessible ordered list');
      assert.equal((flow.match(/<li\b/g) ?? []).length, 3);
      if (slug === 'rag-pdf') {
        assert.deepEqual([...flow.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((match) => match[1].replace(/<[^>]*>/g, '').trim()), ragSteps);
        assert.ok(article.includes('href="https://youtu.be/20UHkDUTeqA"'));
      }
    }
  });
}
