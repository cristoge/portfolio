import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const locales = [['', 'ca'], ['es/', 'es'], ['en/', 'en']];
const htmlAt = (path) => readFile(new URL(`../dist/${path}index.html`, import.meta.url), 'utf8');
const plainText = (html) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

test('decorative paper animations remain subdued behind the foreground introduction', async () => {
  const html = await htmlAt('es/');
  const paths = [...new Set([...html.matchAll(/href="(\/_astro\/[^\"]+\.css)"/g)].map((match) => match[1]))];
  const styles = (await Promise.all(paths.map((path) => readFile(new URL(`../dist${path}`, import.meta.url), 'utf8')))).join('\n');
  const backdrop = styles.match(/\.paper-backdrop(?:\[[^\]]+\])?\{([^}]+)\}/)?.[1];
  const intro = styles.match(/\.hero-intro-body(?:\[[^\]]+\])?\{([^}]+)\}/)?.[1];
  assert.ok(backdrop);
  assert.match(backdrop, /position:absolute/);
  assert.match(backdrop, /pointer-events:none/);
  assert.match(backdrop, /opacity:\.12/);
  assert.match(intro, /position:relative/);
  assert.match(intro, /z-index:1/);
});

for (const [prefix, lang] of locales) {
  test(`${lang}: hero contains only the decorative cycle, not the six paper cards`, async () => {
    const html = await htmlAt(prefix);
    const hero = html.match(/<section\b[^>]*class="hero-intro"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(hero);
    assert.equal((hero.match(/data-paper-scene=/g) ?? []).length, 6);
    assert.match(hero, /data-paper-backdrop[^>]*aria-hidden="true"/);
    assert.doesNotMatch(html, /paper-note|research-notes-heading|data-paper="/);
  });

  test(`${lang}: existing introduction, terminal and project content is preserved`, async () => {
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

  test(`${lang}: inner pages do not include the homepage background`, async () => {
    for (const path of ['contact/', 'personal/', 'projects/rag-pdf/', 'projects/safe-reply/', 'projects/bikeshare/']) {
      const html = await htmlAt(`${prefix}${path}`);
      assert.doesNotMatch(html, /data-paper-backdrop|data-paper-scene|paper-note/);
    }
  });
}
