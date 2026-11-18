// Keep the screenshot and flow independent: on mobile they enter at different times.
export function attachProjectMotion({ gsap, ScrollTrigger, doc = document, win = window, introClass }) {
  const seen = new WeakSet();
  let media;
  let disposed = false;

  function mount() {
    if (media || disposed || !win.MutationObserver) return;
    media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {}, doc.documentElement);
      const triggers = [];
      const pendingImages = [];
      let terminal;
      let started = false;
      function watch(target, animate) {
        if (seen.has(target)) return;
        context.add(() => {
          triggers.push(ScrollTrigger.create({
            trigger: target,
            start: 'top 92%',
            once: true,
            onEnter: () => {
              if (seen.has(target)) return;
              seen.add(target);
              // Scroll callbacks must join the context for preference/pagehide cleanup.
              context.add(animate);
            },
          }));
        });
      }

      function start() {
        if (started) return;
        started = true;
        terminal?.disconnect();
        for (const shot of doc.querySelectorAll('[data-project-shot]')) {
          if (seen.has(shot)) continue;
          const image = shot.querySelector('img');
          const line = shot.querySelector('[data-project-sweep]');
          if (!image || !line) continue;
          const ready = () => {
            image.removeEventListener('load', ready);
            if (!image.naturalWidth) return;
            watch(shot, () => {
              gsap.timeline()
                .set(line, { opacity: 1 })
                .fromTo(image, { clipPath: 'inset(0 100% 0 0)' }, {
                  clipPath: 'inset(0 0% 0 0)', duration: 0.4, ease: 'none', clearProps: 'clipPath',
                }, 0)
                .fromTo(line, { left: '0%' }, { left: '100%', duration: 0.4, ease: 'none' }, 0)
                .set(line, { clearProps: 'left,opacity' });
            });
          };
          // Never mask an unloaded lazy image, or hide anything while waiting.
          if (image.complete) ready();
          else {
            image.addEventListener('load', ready);
            pendingImages.push(() => image.removeEventListener('load', ready));
          }
        }
        for (const flow of doc.querySelectorAll('[data-project-flow]')) {
          watch(flow, () => {
            const nodes = [...flow.querySelectorAll('[data-project-node]')];
            const paths = [...flow.querySelectorAll('[data-project-connector]')];
            const timeline = gsap.timeline().set(paths, { drawSVG: '0%' });
            nodes.forEach((node, index) => {
              timeline.to(node, {
                borderColor: 'var(--accent)', boxShadow: 'inset 0 0 0 1px var(--accent)',
                duration: 0.14, ease: 'power1.out',
              }).to(node, { clearProps: 'borderColor,boxShadow', duration: 0.12 }, '+=0.12');
              if (paths[index]) {
                timeline.fromTo(paths[index], { drawSVG: '0%' }, {
                  drawSVG: '100%', duration: 0.28, ease: 'power1.inOut',
                }).set(paths[index], { clearProps: 'strokeDasharray,strokeDashoffset' });
              }
            });
          });
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
        pendingImages.forEach((cancel) => cancel());
        triggers.forEach((trigger) => trigger.kill());
        context.revert();
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
