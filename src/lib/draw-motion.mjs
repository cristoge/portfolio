import { animateEmbeddingText } from './embedding-text.mjs';

// Decorative strokes and visual-only text layers share one viewport lifecycle.
export function attachDrawMotion({ gsap, doc = document, win = window, introClass }) {
  let media;
  let disposed = false;

  function mount() {
    if (media || disposed || !win.IntersectionObserver || !win.MutationObserver) return;
    media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {}, doc.documentElement);
      let viewport;
      let terminal;
      const restoreText = [];

      function start() {
        if (viewport) return;
        terminal?.disconnect();
        viewport = new win.IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting) continue;
            viewport.unobserve(entry.target);
            if (entry.target.dataset?.scrambleText !== undefined) {
              context.add(() => restoreText.push(animateEmbeddingText(gsap, entry.target)));
              continue;
            }
            const shapes = [...entry.target.querySelectorAll('path, line, polyline, polygon, rect, circle, ellipse')]
              .filter((shape) => !shape.closest('[stroke="none"]') && !shape.hasAttribute('stroke-dasharray'));
            if (!shapes.length) continue;
            // Observer callbacks must explicitly join the GSAP cleanup context.
            context.add(() => gsap.fromTo(shapes, { drawSVG: '0%' }, {
              drawSVG: '100%',
              duration: 1.15,
              stagger: 0.07,
              delay: 0.2,
              ease: 'power2.inOut',
              clearProps: 'strokeDasharray,strokeDashoffset',
            }));
          }
        }, { rootMargin: '0px 0px -8% 0px' });
        doc.querySelectorAll('[data-draw-svg], [data-scramble-text]').forEach((target) => viewport.observe(target));
      }

      if (doc.documentElement.classList.contains(introClass)) {
        terminal = new win.MutationObserver(() => {
          if (!doc.documentElement.classList.contains(introClass)) start();
        });
        terminal.observe(doc.documentElement, { attributes: true, attributeFilter: ['class'] });
      } else {
        start();
      }

      return () => {
        terminal?.disconnect();
        viewport?.disconnect();
        context.revert();
        restoreText.forEach((restore) => restore());
      };
    });
  }

  function suspend() {
    media?.revert();
    media = undefined;
  }

  function resume(event) {
    if (event.persisted) mount();
  }

  mount();
  win.addEventListener('pagehide', suspend);
  win.addEventListener('pageshow', resume);
  return () => {
    disposed = true;
    suspend();
    win.removeEventListener('pagehide', suspend);
    win.removeEventListener('pageshow', resume);
  };
}
