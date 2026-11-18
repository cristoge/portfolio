import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const locales = [
  { path: '', lang: 'ca', current: 'actualitat', status: 'En curs', subjects: ['Cloud', 'IA i Big Data', 'Desenvolupament'] },
  { path: 'es/', lang: 'es', current: 'actualidad', status: 'En curso', subjects: ['Cloud', 'IA y Big Data', 'Desarrollo'] },
  { path: 'en/', lang: 'en', current: 'present', status: 'In progress', subjects: ['Cloud', 'AI and Big Data', 'Development'] },
];

for (const { path, lang, current, status, subjects } of locales) {
  test(`${lang}: education is an accessible timeline, with the current program first and existing information visible`, async () => {
    const html = await readFile(new URL(`../dist/${path}index.html`, import.meta.url), 'utf8');
    const section = html.match(/<section\b[^>]*id="education"[^>]*>([\s\S]*?)<\/section>/)?.[1];
    assert.ok(section);
    const list = section.match(/<ol\b[^>]*>([\s\S]*?)<\/ol>/)?.[1];
    assert.ok(list, 'the chronological order is represented by a list');
    const stages = [...list.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/g)].map((match) => match[1]);
    assert.equal(stages.length, 3);
    const dates = [`2026 — ${current}`, '2025 — 2026', '2023 — 2025'];
    for (const [index, stage] of stages.entries()) {
      assert.ok(stage.includes(dates[index]));
      assert.ok(stage.includes(subjects[index]));
      assert.match(stage, /<h3\b[^>]*>[^<]+<\/h3>/);
      assert.match(stage, /class="education-track"[^>]*aria-hidden="true"/);
      assert.match(stage, index === 2 ? /pratfp\.com/ : /agora\.xtec\.cat\/iticbcn/);
    }
    assert.ok(stages[0].includes(status));
    assert.ok(stages[1].includes('https://github.com/cristoge/ai_projects'));
    assert.match(stages[2], /class="education-coursework"/);
    assert.doesNotMatch(section, /\breveal\b/);
  });
}
