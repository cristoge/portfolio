// Project screenshots stay static; only the connecting dashes move.
export function attachProjectMotion({ gsap, ScrollTrigger, doc = document, win = window, introClass }) {
  let media;
  let disposed = false;

  function mount() {
    if (media || disposed || !win.MutationObserver) return;
    media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const context = gsap.context(() => {}, doc.documentElement);
      const triggers = [];
      let terminal;
      let started = false;
      function start() {
        if (started) return;
        started = true;
        terminal?.disconnect();
        for (const flow of doc.querySelectorAll('[data-project-flow]')) {
          const paths = [...flow.querySelectorAll('[data-project-connector]')];
          if (!paths.length) continue;
          context.add(() => {
            const motion = gsap.to(paths, {
              strokeDashoffset: -390, repeat: -1, ease: 'none', duration: 3, paused: true,
            });
            triggers.push(ScrollTrigger.create({
              trigger: flow,
              start: 'top bottom',
              end: 'bottom top',
              onToggle: ({ isActive }) => isActive ? motion.play() : motion.pause(),
            }));
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
