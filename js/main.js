// ===================== Third Parent Initiative — interactions =====================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- sticky nav shadow ---------- */
  const nav = document.getElementById('siteNav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const tabs = document.getElementById('tabs');
  navToggle.addEventListener('click', () => {
    const open = tabs.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open);
  });
  tabs.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    tabs.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  }));

  /* ---------- active tab highlight on scroll ---------- */
  const sections = ['story','resources','plan','research','newsletter','involved']
    .map(id => document.getElementById(id)).filter(Boolean);
  const tabLinks = Array.from(document.querySelectorAll('#tabs a'));

  const setActive = (id) => {
    tabLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  };

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) setActive(entry.target.id);
    });
  }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
  sections.forEach(s => navObserver.observe(s));

  /* ---------- reveal-on-scroll ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- chart fill-in animations ---------- */
  const chartTriggers = ['#timeline', '#funnelChart', '.bar-block'];
  const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        chartObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });
  chartTriggers.forEach(sel => document.querySelectorAll(sel).forEach(el => chartObserver.observe(el)));

  /* ---------- pictogram grid (14 of 100 highlighted) ---------- */
  const pictogram = document.getElementById('pictogram');
  if (pictogram) {
    const total = 100, hits = 14;
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('span');
      if (i < hits) dot.classList.add('hit');
      pictogram.appendChild(dot);
    }
  }

  /* ---------- count-up stats ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const animateCount = (el) => {
    const target = parseFloat(el.getAttribute('data-count'));
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = (target * eased);
      el.textContent = value.toFixed(target % 1 !== 0 ? 1 : 0);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  counters.forEach(c => countObserver.observe(c));

  /* ---------- newsletter issue accordion ---------- */
  document.querySelectorAll('.issue-head').forEach(head => {
    head.addEventListener('click', () => {
      const issue = head.closest('.issue');
      const isOpen = issue.getAttribute('data-open') === 'true';
      issue.setAttribute('data-open', String(!isOpen));
    });
  });

  /* ---------- newsletter signup (front-end only placeholder) ---------- */
  const signupForm = document.getElementById('signupForm');
  const signupNote = document.getElementById('signupNote');
  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();
      signupNote.textContent = "Thanks for subscribing — connect this form to your email provider (Mailchimp, ConvertKit, etc.) to start sending.";
      signupForm.reset();
    });
  }

});
