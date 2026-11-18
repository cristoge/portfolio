import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const routes = [
  ['contact/', 'Correu i xarxes', 'Envia’m un missatge'],
  ['es/contact/', 'Correo y redes', 'Envíame un mensaje'],
  ['en/contact/', 'Email and social links', 'Send me a message'],
];

for (const [route, channelsHeading, formHeading] of routes) {
  test(`${route}: direct contact comes before the optional form and map`, async () => {
    const html = await readFile(new URL(`../dist/${route}index.html`, import.meta.url), 'utf8');
    const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1];
    assert.ok(main);
    const email = main.indexOf('href="mailto:cristo.g@outlook.es"');
    const copy = main.indexOf('data-copy-email="cristo.g@outlook.es"');
    const form = main.indexOf('data-contact-form');
    const map = main.indexOf('<iframe');
    assert.ok(main.includes(channelsHeading));
    assert.ok(main.includes(formHeading));
    assert.ok(email >= 0 && copy > email && form > copy && map > form);
    assert.match(main, /href="https:\/\/www\.linkedin\.com\/in\/cristopher-gordon\/"/);
    assert.match(main, /href="https:\/\/github\.com\/cristoge"/);
    assert.match(main, /<iframe\b[^>]*loading="lazy"[^>]*title="[^"]+"/);
    for (const field of ['name', 'email', 'message']) {
      assert.match(main, new RegExp(`name="${field}"[^>]*required`));
    }
  });
}
