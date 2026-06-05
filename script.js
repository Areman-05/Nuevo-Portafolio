// Smooth scroll y navegación
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.main-nav');
  const siteHeader = document.getElementById('site-header');
  const headerSpacer = document.querySelector('.site-header-spacer');

  const syncHeaderOffset = () => {
    if (!siteHeader) return;
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

  window.addEventListener('scroll', () => {
    if (nav) {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  }, { passive: true });

  const navLinks = document.querySelectorAll('.nav-menu a, .btn-primary, .btn-secondary');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#') && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target && nav) {
          const targetPosition = target.offsetTop - nav.offsetHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const animatedElements = document.querySelectorAll('.project-card, .work-card, .skill-category, .skills-marquee, .home-intro, .about-exp__item, .contact-content, .contact-split__inner');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
});
