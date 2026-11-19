// A deterministic visual metaphor, not model-generated embeddings.
export function embeddingVector(text) {
  let seed = 17;
  for (const character of text) seed = (Math.imul(seed, 31) + character.codePointAt(0)) >>> 0;
  const dimensions = Math.min(4, Math.max(1, Math.floor(Array.from(text).length / 8)));
  return `[${Array.from({ length: dimensions }, (_, index) => {
    const value = ((seed >>> (index * 5)) % 179 - 89) / 100;
    return value.toFixed(2);
  }).join(', ')}]`;
}

export function animateEmbeddingText(gsap, target) {
  const source = target.querySelector('.embedding-source');
  const vector = target.querySelector('.embedding-vector');
  if (!source || !vector) return () => {};
  vector.textContent = embeddingVector(target.dataset.scrambleText);

  gsap.timeline()
    .set(source, { opacity: 0 })
    .set(vector, { opacity: 1 })
    .to(vector, {
      duration: 0.6,
      ease: 'none',
      scrambleText: {
        text: target.dataset.scrambleText,
        chars: '0123456789.-[],',
        revealDelay: 0.12,
        speed: 0.35,
        tweenLength: false,
        oldClass: 'embedding-encoded',
        newClass: 'embedding-decoded',
      },
    })
    .set(vector, { opacity: 0 })
    .set(source, { opacity: 1 });

  // Inline opacity belongs to the shared GSAP context; reset only our own text.
  return () => { vector.textContent = ''; };
}
