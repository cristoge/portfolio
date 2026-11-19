// Shared entrances complement (rather than replace) the illustration owners.
// Nothing is hidden until it enters the viewport: no-JS and failed bundles stay readable.
export function attachSiteMotion({ gsap, SplitText, doc = document, win = window, introClass }) {
  let media;
  let disposed = false;
  const played = new WeakSet();

  function mount() {
    if (media || disposed || !win.IntersectionObserver || !win.MutationObserver) return;
    media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {}, doc.documentElement);
      const removeListeners = [];
      const splits = new Set();
      let viewport;
      let terminal;

      function start() {
        if (viewport) return;
        terminal?.disconnect();
        viewport = new win.IntersectionObserver((entries) => {
          for (const { target, isIntersecting } of entries) {
            if (!isIntersecting || played.has(target)) continue;
            played.add(target);
            viewport.unobserve(target);
            // Never fade out the control a keyboard user is already using.
            if (target.matches(':focus-within')) continue;
            context.add(() => {
              // Preserve the independent scramble layers and any links' accessible names.
              if (SplitText && target.dataset?.textReveal !== undefined && !target.querySelector('[data-scramble-text]')) {
                const split = SplitText.create(target, { type: 'words', tag: 'span', aria: 'none' });
                splits.add(split);
                gsap.fromTo(split.words, { opacity: 0, y: 10 }, {
                  opacity: 1, y: 0, duration: 0.48,
                  stagger: { amount: Math.min(0.8, split.words.length * 0.028) },
                  ease: 'power2.out', clearProps: 'opacity,transform',
                  onComplete: () => { split.revert(); splits.delete(split); },
                });
              } else {
                const targets = target.dataset?.motion === 'stagger' ? [...target.children] : target;
                gsap.fromTo(targets, { opacity: 0, y: 18 }, {
                  opacity: 1, y: 0, duration: 0.65, stagger: 0.07,
                  ease: 'power2.out', clearProps: 'opacity,transform',
                });
              }
            });
          }
        }, { rootMargin: '0px 0px -12% 0px' });
        doc.querySelectorAll('.reveal, [data-motion], [data-text-reveal]').forEach((target) => {
          if (!played.has(target)) viewport.observe(target);
        });

        for (const target of doc.querySelectorAll('[data-motion-interactive]')) {
          let hovered = false;
          let focused = false;
          const update = () => {
            if (target.disabled) return;
            context.add(() => gsap.to(target, {
              y: hovered || focused ? -2 : 0,
              duration: 0.2, ease: 'power2.out', overwrite: 'auto',
              ...(!hovered && !focused ? { clearProps: 'transform' } : {}),
            }));
          };
          const handlers = {
            pointerenter: () => { hovered = win.matchMedia('(hover: hover) and (pointer: fine)').matches; update(); },
            pointerleave: () => { hovered = false; update(); },
            focus: () => { focused = target.matches(':focus-visible'); update(); },
            blur: () => { focused = false; update(); },
          };
          for (const [event, handler] of Object.entries(handlers)) {
            target.addEventListener(event, handler);
            removeListeners.push(() => target.removeEventListener(event, handler));
          }
        }
      }

      if (doc.documentElement.classList.contains(introClass)) {
        terminal = new win.MutationObserver(() => {
          if (!doc.documentElement.classList.contains(introClass)) start();
        });
        terminal.observe(doc.documentElement, { attributes: true, attributeFilter: ['class'] });
      } else start();

      return () => {
        terminal?.disconnect();
        viewport?.disconnect();
        removeListeners.forEach((remove) => remove());
        context.revert();
        splits.forEach((split) => split.revert());
        splits.clear();
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
