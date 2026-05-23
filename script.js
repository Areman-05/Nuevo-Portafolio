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
