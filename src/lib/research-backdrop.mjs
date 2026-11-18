export const SCENE_SECONDS = 6;

export function buildResearchCycle(gsap, root, notes) {
  const scenes = [...root.querySelectorAll('[data-paper-scene]')];
  const activate = (id) => notes.forEach((note) => note.toggleAttribute('data-active-paper', note.dataset.paper === id));
  gsap.set(scenes, { autoAlpha: 0 });
  const cycle = gsap.timeline({ paused: true, repeat: -1 });

  scenes.forEach((scene, index) => {
    const start = index * SCENE_SECONDS;
    cycle.call(() => activate(scene.dataset.paperScene), [], start)
      .set(scene.querySelectorAll('[data-scene-signal]'), { drawSVG: '0% 0%' }, start)
      .fromTo(scene, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.55, immediateRender: false }, start)
      .fromTo(scene.querySelectorAll('[data-scene-stroke]'), { drawSVG: '0%' }, {
        drawSVG: '100%', duration: 1.4, stagger: 0.06, ease: 'power2.inOut', immediateRender: false,
      }, start)
      .fromTo(scene.querySelectorAll('[data-scene-node]'), { opacity: 0.15, x: -8, y: 6 }, {
        opacity: 1, x: 0, y: 0, duration: 1, stagger: 0.035, ease: 'power2.out', immediateRender: false,
      }, start)
      .fromTo(scene.querySelectorAll('[data-scene-signal]'), { drawSVG: '0% 8%' }, {
        drawSVG: '92% 100%', duration: 1.1, stagger: 0.12, repeat: 1, repeatDelay: 0.3, ease: 'none', immediateRender: false,
      }, start + 2)
      .to(scene, { autoAlpha: 0, duration: 0.65 }, start + 5.3);
  });
  cycle.call(() => activate(null), [], scenes.length * SCENE_SECONDS);
  return cycle;
}

export function attachResearchBackdrop({ gsap, root, notes, control, introClass, doc = document, win = window }) {
  let media;
  let disposed = false;
  let userPaused = false;

  function mount() {
    if (media || disposed || !win.IntersectionObserver || !win.MutationObserver) return;
    media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      let cycle;
      let inView = false;
      const context = gsap.context(() => { cycle = buildResearchCycle(gsap, root, notes); }, root);
      const update = () => {
        if (inView && !userPaused && !doc.hidden && !doc.documentElement.classList.contains(introClass)) cycle.play();
        else cycle.pause();
      };
      const renderControl = () => {
        if (!control) return;
        control.hidden = false;
        control.textContent = userPaused ? 'Play motion' : 'Pause motion';
        control.setAttribute('aria-pressed', String(userPaused));
      };
      const toggle = () => { userPaused = !userPaused; renderControl(); update(); };
      renderControl();
      control?.addEventListener('click', toggle);
      const viewport = new win.IntersectionObserver((entries) => {
        inView = entries.some((entry) => entry.isIntersecting);
        update();
      });
      viewport.observe(root);
      const terminal = new win.MutationObserver(update);
      terminal.observe(doc.documentElement, { attributes: true, attributeFilter: ['class'] });
      doc.addEventListener('visibilitychange', update);

      return () => {
        cycle.pause();
        viewport.disconnect();
        terminal.disconnect();
        doc.removeEventListener('visibilitychange', update);
        control?.removeEventListener('click', toggle);
        if (control) control.hidden = true;
        context.revert();
        notes.forEach((note) => note.toggleAttribute('data-active-paper', false));
      };
    });
  }

  function suspend() {
    media?.revert();
    media = undefined;
  }
  function resume(event) { if (event.persisted) mount(); }
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
