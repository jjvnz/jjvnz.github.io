/* ── GSAP + ScrollTrigger — all scroll-driven animations ── */

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reducedMotion) {
  /* ── instantiate NeuralPipeline (Islands: lazy when hero enters viewport) ── */
  var neuralCanvas = document.getElementById('neural-canvas');
  if (neuralCanvas) {
    var initPipeline = function () {
      neuralCanvas.style.opacity = '0.75';
      new NeuralPipeline(neuralCanvas);
    };
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries[0] && entries[0].isIntersecting) {
          initPipeline();
          io.disconnect();
        }
      }, { threshold: 0 });
      io.observe(neuralCanvas.parentElement || neuralCanvas);
    } else {
      initPipeline();
    }
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ── hero ── */
  gsap.to('#hero-tag', { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
  gsap.to('#hero-title', { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' });
  gsap.to('#hero-sub', { opacity: 1, y: 0, duration: 0.8, delay: 0.6, ease: 'power3.out' });
  gsap.to('#hero-cta', { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' });
  gsap.to('#hero-viz-container', { opacity: 1, y: 0, duration: 0.8, delay: 0.9, ease: 'power3.out' });
  gsap.from('.metric-float', {
    opacity: 0, y: 20, duration: 0.6, stagger: 0.15, delay: 1.1, ease: 'power3.out'
  });

  ScrollTrigger.create({
    trigger: '#hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 2,
    onUpdate: self => {
      const progress = self.progress;
      const viz = document.getElementById('hero-viz-container');
      if (viz) {
        viz.style.transform = `translateY(${progress * -20}px)`;
        viz.style.opacity = 1 - progress * 0.6;
      }
    }
  });

  /* ── timeline ── */
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    document.querySelectorAll('.timeline-item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 85%', end: 'top 40%', toggleActions: 'play none none reverse' },
        opacity: 0, x: i % 2 === 0 ? 60 : -60, duration: 0.8, ease: 'power3.out'
      });
    });
  });
  mm.add('(max-width: 1023px)', () => {
    document.querySelectorAll('.timeline-item').forEach(item => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 85%', end: 'top 40%', toggleActions: 'play none none reverse' },
        opacity: 0, x: 30, duration: 0.6, ease: 'power3.out'
      });
    });
  });

  /* ── metrics ── */
  gsap.from('.metric-card', {
    scrollTrigger: { trigger: '#metrics-grid', start: 'top 80%', end: 'top 30%', toggleActions: 'play none none reverse' },
    opacity: 0, y: 40, duration: 0.6, stagger: 0.12, ease: 'power3.out'
  });

  /* ── projects ── */
  gsap.from('.project-card', {
    scrollTrigger: { trigger: '#projects-grid', start: 'top 80%', end: 'top 30%', toggleActions: 'play none none reverse' },
    opacity: 0, y: 50, duration: 0.7, stagger: 0.15, ease: 'power3.out'
  });

  document.querySelectorAll('.project-card').forEach(card => {
    const details = card.querySelector('h3');
    const techs = card.querySelectorAll('.flex-wrap span');
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { borderColor: 'rgba(233, 88, 44, 0.5)', duration: 0.3, ease: 'power2.out' });
      gsap.to(card.querySelector('svg'), { scale: 1.05, duration: 0.3, ease: 'power2.out' });
      if (details) gsap.to(details, { x: 4, duration: 0.3, ease: 'power2.out' });
      techs.forEach(t => gsap.to(t, { borderColor: 'rgba(169, 246, 0, 0.6)', duration: 0.3, ease: 'power2.out' }));
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { borderColor: 'rgba(255, 255, 255, 0.1)', duration: 0.4, ease: 'power2.out' });
      gsap.to(card.querySelector('svg'), { scale: 1, duration: 0.4, ease: 'power2.out' });
      if (details) gsap.to(details, { x: 0, duration: 0.4, ease: 'power2.out' });
      techs.forEach(t => gsap.to(t, { borderColor: 'rgba(169, 246, 0, 0.3)', duration: 0.4, ease: 'power2.out' }));
    });
  });

  /* ── skills ── */
  gsap.from('.skill-layer', {
    scrollTrigger: { trigger: '#skills-grid', start: 'top 80%', end: 'top 30%', toggleActions: 'play none none reverse' },
    opacity: 0, y: 30, duration: 0.5, stagger: 0.1, ease: 'power3.out'
  });

  ScrollTrigger.create({
    trigger: '#skills-grid', start: 'top 75%',
    onEnter: () => {
      document.querySelectorAll('.skill-layer svg circle').forEach((c, i) => {
        gsap.from(c, { scale: 0, opacity: 0, duration: 0.3, delay: i * 0.05, ease: 'back.out(2)' });
      });
    }
  });

  /* ── services ── */
  gsap.from('.service-card', {
    scrollTrigger: { trigger: '#services-grid', start: 'top 80%', end: 'top 30%', toggleActions: 'play none none reverse' },
    opacity: 0, y: 40, duration: 0.6, stagger: 0.15, ease: 'power3.out'
  });

  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, { borderColor: 'rgba(169, 246, 0, 0.4)', y: -4, duration: 0.3, ease: 'power2.out' });
      gsap.to(card.querySelector('.w-12'), { borderColor: 'rgba(169, 246, 0, 0.6)', scale: 1.1, duration: 0.3, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { borderColor: 'rgba(255, 255, 255, 0.1)', y: 0, duration: 0.4, ease: 'power2.out' });
      gsap.to(card.querySelector('.w-12'), { borderColor: 'rgba(169, 246, 0, 0.3)', scale: 1, duration: 0.4, ease: 'power2.out' });
    });
  });

  /* ── contact ── */
  ScrollTrigger.create({
    trigger: '#contact', start: 'top 80%',
    onEnter: () => {
      const tl = gsap.timeline();
      tl.from('#contact .lg\\:col-span-2 > *', { opacity: 0, y: 20, duration: 0.4, stagger: 0.08, ease: 'power3.out' });
      tl.from('#contact .calendly-inline-widget', { opacity: 0, scale: 0.95, duration: 0.4, ease: 'power3.out' }, '-=0.2');
    }
  });
} else {
  /* ── reduced-motion fallback: show everything immediately ── */
  gsap.set(['#hero-tag', '#hero-title', '#hero-sub', '#hero-cta', '#hero-viz-container'], { opacity: 1 });
  document.querySelectorAll('.timeline-item, .metric-card, .project-card, .skill-layer, .service-card').forEach(el => {
    gsap.set(el, { opacity: 1 });
  });
}
