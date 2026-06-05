// Smooth scroll, menú y navegación single-page
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.main-nav');
  const siteHeader = document.getElementById('site-header');
  const headerSpacer = document.querySelector('.site-header-spacer');
  const isSinglePage = document.body.classList.contains('page--single');

  const getScrollOffset = () => (siteHeader ? siteHeader.offsetHeight : nav?.offsetHeight || 0);

  const syncHeaderOffset = () => {
    if (!siteHeader || isSinglePage) return;
    const h = `${siteHeader.offsetHeight}px`;
    if (headerSpacer) headerSpacer.style.height = h;
  };

  syncHeaderOffset();
  window.addEventListener('resize', syncHeaderOffset, { passive: true });

  const navMenuToggle = document.getElementById('nav-menu-toggle');
  const navMenuPanel = document.getElementById('nav-menu-panel');
  const navMenuBackdrop = document.getElementById('nav-menu-backdrop');

  const setNavMenuOpen = (open) => {
    if (!navMenuToggle || !navMenuPanel || !navMenuBackdrop) return;
    navMenuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navMenuPanel.setAttribute('aria-hidden', open ? 'false' : 'true');
    navMenuPanel.classList.toggle('is-open', open);
    navMenuBackdrop.hidden = !open;
    navMenuBackdrop.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-open', open);
  };

  navMenuToggle?.addEventListener('click', () => {
    const isOpen = navMenuToggle.getAttribute('aria-expanded') === 'true';
    setNavMenuOpen(!isOpen);
  });

  navMenuBackdrop?.addEventListener('click', () => setNavMenuOpen(false));

  navMenuPanel?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setNavMenuOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setNavMenuOpen(false);
  });

  const scrollToHash = (hash, behavior = 'smooth') => {
    if (!hash || !hash.startsWith('#')) return;
    const target = document.querySelector(hash);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - getScrollOffset() + 1;
    window.scrollTo({ top, behavior });
  };

  const anchorLinks = document.querySelectorAll(
    'a[href^="#"], .nav-minimal__brand[href^="#"], .contact-mid__nav a[href^="#"]'
  );

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#') || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      setNavMenuOpen(false);
      history.pushState(null, '', href);
      scrollToHash(href);
    });
  });

  if (window.location.hash) {
    requestAnimationFrame(() => scrollToHash(window.location.hash, 'auto'));
  }

  const navSectionLinks = document.querySelectorAll(
    '.nav-minimal__links a[href^="#"], .nav-menu a[href^="#"]'
  );

  const sectionIds = ['inicio', 'sobre-mi', 'proyectos', 'contacto'];
  const sections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  const setActiveNav = (id) => {
    navSectionLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('nav-link-active', href === `#${id}`);
    });
  };

  if (isSinglePage && sections.length) {
    const spy = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveNav(visible[0].target.id);
      },
      {
        rootMargin: `-${getScrollOffset() + 8}px 0px -55% 0px`,
        threshold: [0, 0.15, 0.35, 0.55],
      }
    );

    sections.forEach((section) => spy.observe(section));
    setActiveNav(sectionIds[0]);
  }

  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  }, { passive: true });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll(
    '.project-card, .work-card, .skill-category, .skills-layout, .skill-card, .home-intro, .about-exp__item, .contact-split__inner, .about-head, .work-header'
  );

  animatedElements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
