import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const locales = [
  ['', ['Agents i IA', 'Cloud i infraestructura', 'Backend', 'Bases de dades', 'Llenguatges', 'Eines']],
  ['es/', ['Agentes e IA', 'Cloud e infraestructura', 'Backend', 'Bases de datos', 'Lenguajes', 'Herramientas']],
  ['en/', ['Agents &amp; AI', 'Cloud &amp; infrastructure', 'Backend', 'Databases', 'Languages', 'Tools']],
];

for (const [prefix, labels] of locales) {
  test(`${prefix || 'ca/'}: the stack mosaic gives agents and cloud priority and keeps every category accessible`, async () => {
    const html = await readFile(new URL(`../dist/${prefix}index.html`, import.meta.url), 'utf8');
    const section = html.match(/<section\b[^>]*id="stack"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(section);
    const tiles = [...section.matchAll(/<article\b([^>]*)>([\s\S]*?)<\/article>/g)];
    assert.equal(tiles.length, 6);
    assert.deepEqual(tiles.map((tile) => tile[2].match(/<h3\b[^>]*>([^<]+)<\/h3>/)?.[1]), labels);
    assert.match(tiles[0][1], /stack-tile--focus/);
    assert.match(tiles[1][1], /stack-tile--accent/);
    assert.match(tiles[0][2], /href="https:\/\/strandsagents\.com"[^>]*>Strands Agents<\/a>/);
    const primary = (tile) => tile[2].match(/<p\b[^>]*class="stack-primary"[^>]*>([\s\S]*?)<\/p>/)?.[1].trim();
    assert.equal(primary(tiles[1]), 'AWS');
    const services = [...tiles[1][2].matchAll(/<li\b[^>]*>([^<]+)<\/li>/g)].map((match) => match[1].trim());
    assert.deepEqual(services, ['Docker', 'Terraform', 'IAM', 'Lambda', 'S3', 'RDS', 'DynamoDB', 'Cognito', 'Bedrock']);
    assert.deepEqual(tiles.slice(2).map(primary), ['FastAPI', 'PostgreSQL', 'Python', 'Claude Code']);
    assert.match(tiles[5][2], /href="https:\/\/github\.com\/Gentleman-Programming\/gentle-ai"/);
    assert.doesNotMatch(section, /stack-num|class="[^"]*\breveal\b/);
  });
}
