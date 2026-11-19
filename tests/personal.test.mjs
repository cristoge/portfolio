import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const routes = ['personal/', 'es/personal/', 'en/personal/'];
const images = ['/engram.webp', '/setup.webp', '/music.webp', '/now.webp'];

for (const route of routes) {
  test(`${route}: editorial profile keeps the factual summary above all four illustrated stories`, async () => {
    const html = await readFile(new URL(`../dist/${route}index.html`, import.meta.url), 'utf8');
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert.ok(main);
    const header = main.match(/<header\b[^>]*class="personal-intro"[^>]*>([\s\S]*?)<\/header>/)?.[1];
    assert.ok(header);
    assert.match(header, /<h1\b[^>]*id="personal-heading"/);
    const kicker = header.match(/<p\b[^>]*>([\s\S]*?)<\/p>/)?.[1];
    assert.match(kicker?.replace(/<[^>]*>/g, '') ?? '', /Cristopher Gordon/);
    const facts = header.match(/<dl\b[^>]*>([\s\S]*?)<\/dl>/)?.[1];
    assert.ok(facts);
    assert.equal((facts.match(/<dt\b/g) ?? []).length, 5);
    assert.match(facts, /Esplugues de Llobregat/);

    const articles = [...main.matchAll(/<article\b([^>]*)>([\s\S]*?)<\/article>/g)];
    assert.equal(articles.length, images.length);
    for (const [index, [, attrs, story]] of articles.entries()) {
      assert.doesNotMatch(attrs, /\breveal\b/);
      assert.match(story, /<h2\b[^>]*>[\s\S]*?class="embedding-source"[^>]*>[^<]+<\/span>[\s\S]*?<\/h2>[\s\S]*<figure\b/);
      assert.ok(story.includes(`src="${images[index]}"`));
      assert.match(story, /<img\b[^>]*alt="[^"]+"/);
      assert.match(story, /<figcaption\b/);
    }
    assert.match(articles[0][2], /https:\/\/github\.com\/Gentleman-Programming\/engram/);
    assert.match(articles[1][2], /https:\/\/github\.com\/cristoge\/dotfiles/);
  });
}
