import type { InlineLink } from '../i18n/types';

export type TextPart = string | InlineLink;

// Parte un párrafo en trozos de texto y enlaces, enlazando cada aparición de los textos indicados.
export function linkify(paragraph: string, links: readonly InlineLink[] = []): TextPart[] {
  const parts: TextPart[] = [];
  let rest = paragraph;
  while (rest) {
    let next: { index: number; link: InlineLink } | undefined;
    for (const link of links) {
      const index = rest.indexOf(link.text);
      if (index !== -1 && (!next || index < next.index)) next = { index, link };
    }
    if (!next) {
      parts.push(rest);
      break;
    }
    if (next.index > 0) parts.push(rest.slice(0, next.index));
    parts.push(next.link);
    rest = rest.slice(next.index + next.link.text.length);
  }
  return parts;
}
