// Smooth scroll, menú y navegación single-page
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.main-nav');
  const siteHeader = document.getElementById('site-header');
  const headerSpacer = document.querySelector('.site-header-spacer');
  const isSinglePage = document.body.classList.contains('page--single');
  const isProjectPage = document.body.classList.contains('page--project');

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

  if (isSinglePage && !isProjectPage && sections.length) {
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

  const updateNavTheme = () => {
    if (!isSinglePage || isProjectPage || !siteHeader) return;
    const heroSection = document.getElementById('inicio');
    if (!heroSection) return;
    const pastHero = heroSection.getBoundingClientRect().bottom <= siteHeader.offsetHeight + 20;
    siteHeader.classList.toggle('nav--past-hero', pastHero);
  };

  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
    updateNavTheme();
  }, { passive: true });

  updateNavTheme();
  window.addEventListener('resize', updateNavTheme, { passive: true });

  const initSkillMarquees = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    document.querySelectorAll('.skill-marquee').forEach((marquee) => {
      const track = marquee.querySelector('.skill-marquee__track');
      const list = track?.querySelector('.skill-marquee__list:not([data-marquee-clone])');
      if (!track || !list) return;

      track.querySelectorAll('[data-marquee-clone]').forEach((clone) => clone.remove());

      if (reducedMotion) {
        track.style.removeProperty('--marquee-shift');
        return;
      }

      const clone = list.cloneNode(true);
      clone.setAttribute('data-marquee-clone', '');
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('.skill-marquee__card').forEach((card) => {
        card.setAttribute('aria-hidden', 'true');
      });
      track.appendChild(clone);

      const syncShift = () => {
        const trackGap = parseFloat(getComputedStyle(track).gap) || 0;
        const shift = list.offsetHeight + trackGap;
        if (shift > 0) {
          track.style.setProperty('--marquee-shift', `${shift}px`);
        }
      };

      syncShift();
      track.querySelectorAll('img').forEach((img) => {
        if (!img.complete) {
          img.addEventListener('load', syncShift, { once: true });
          img.addEventListener('error', syncShift, { once: true });
        }
      });
    });
  };

  initSkillMarquees();

  const initProjectGallery = () => {
    const section = document.querySelector('.project-detail__gallery-section');
    const gallery = section?.querySelector('.project-gallery');
    if (!gallery || !section) return;

    const items = [...gallery.querySelectorAll('.project-gallery__item')];
    let pending = items.length;

    const syncVisibility = () => {
      const visible = items.some((item) => !item.hidden);
      section.hidden = !visible;
    };

    if (!pending) {
      section.hidden = true;
      return;
    }

    items.forEach((item) => {
      const img = item.querySelector('img');
      const finish = () => {
        pending -= 1;
        if (pending <= 0) syncVisibility();
      };

      if (!img) {
        item.hidden = true;
        finish();
        return;
      }

      const onError = () => {
        item.hidden = true;
        finish();
      };

      img.addEventListener('error', onError, { once: true });

      if (img.complete) {
        if (!img.naturalWidth) onError();
        else finish();
      } else {
        img.addEventListener('load', finish, { once: true });
      }
    });
  };

  initProjectGallery();

  const initAppProjectReveals = () => {
    const isProjectCase =
      document.body.classList.contains('page--project-app') ||
      document.body.classList.contains('page--project-web');
    if (!isProjectCase) return;

    const nodes = [...document.querySelectorAll('[data-reveal]')];
    if (!nodes.length) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      nodes.forEach((node) => node.classList.add('is-revealed'));
      return;
    }

    const hero = document.querySelector('.app-hero[data-reveal], .web-hero[data-reveal]');
    if (hero) {
      requestAnimationFrame(() => hero.classList.add('is-revealed'));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: '0px 0px -40px 0px',
        threshold: 0.08,
      }
    );

    nodes.forEach((node) => {
      if (node === hero) return;
      observer.observe(node);
    });
  };

  initAppProjectReveals();

  const initAppShowcases = () => {
    document.querySelectorAll('[data-app-showcase]').forEach((root) => {
      const slides = [...root.querySelectorAll('[data-showcase-slide]')];
      if (slides.length < 2) return;

      const titleEl = root.querySelector('[data-showcase-title]');
      const textEl = root.querySelector('[data-showcase-text]');
      const counterEl = root.querySelector('[data-showcase-counter]');
      const dotsEl = root.querySelector('[data-showcase-dots]');
      const prevBtn = root.querySelector('[data-showcase-prev]');
      const nextBtn = root.querySelector('[data-showcase-next]');
      let index = Math.max(
        0,
        slides.findIndex((slide) => slide.classList.contains('is-active'))
      );

      const resolveSlideCopy = (slide) => {
        const titleKey = slide.getAttribute('data-i18n-title');
        const textKey = slide.getAttribute('data-i18n-text');
        const lang = localStorage.getItem('portfolio-lang') || 'esp';
        const dict = window.AZIMUT_I18N_PATCH?.[lang] || null;
        return {
          title: (titleKey && dict?.[titleKey]) || slide.dataset.title || '',
          text: (textKey && dict?.[textKey]) || slide.dataset.text || '',
        };
      };

      const setSlide = (nextIndex) => {
        index = (nextIndex + slides.length) % slides.length;

        slides.forEach((slide, i) => {
          const active = i === index;
          slide.classList.toggle('is-active', active);
          slide.setAttribute('aria-hidden', active ? 'false' : 'true');
        });

        const active = slides[index];
        const copy = resolveSlideCopy(active);
        if (titleEl) {
          titleEl.textContent = copy.title;
          const titleKey = active.getAttribute('data-i18n-title');
          if (titleKey) titleEl.setAttribute('data-i18n', titleKey);
        }
        if (textEl) {
          textEl.textContent = copy.text;
          const textKey = active.getAttribute('data-i18n-text');
          if (textKey) textEl.setAttribute('data-i18n', textKey);
        }
        if (counterEl) counterEl.textContent = `${index + 1} / ${slides.length}`;

        if (dotsEl) {
          [...dotsEl.querySelectorAll('.app-showcase__dot')].forEach((dot, i) => {
            const label = resolveSlideCopy(slides[i]).title || `Vista ${i + 1}`;
            dot.setAttribute('aria-label', label);
            dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
          });
        }
      };

      if (dotsEl) {
        dotsEl.replaceChildren();
        slides.forEach((slide, i) => {
          const dot = document.createElement('button');
          dot.type = 'button';
          dot.className = 'app-showcase__dot';
          dot.setAttribute('role', 'tab');
          dot.setAttribute('aria-label', slide.dataset.title || `Vista ${i + 1}`);
          dot.setAttribute('aria-selected', i === index ? 'true' : 'false');
          dot.addEventListener('click', () => setSlide(i));
          dotsEl.appendChild(dot);
        });
      }

      prevBtn?.addEventListener('click', () => setSlide(index - 1));
      nextBtn?.addEventListener('click', () => setSlide(index + 1));

      document.addEventListener('portfolio:langchange', () => setSlide(index));

      root.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setSlide(index - 1);
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setSlide(index + 1);
        }
      });

      if (!root.hasAttribute('tabindex')) {
        root.setAttribute('tabindex', '0');
      }

      setSlide(index);
    });
  };

  initAppShowcases();

  let marqueeResizeTick = false;
  window.addEventListener(
    'resize',
    () => {
      if (marqueeResizeTick) return;
      marqueeResizeTick = true;
      requestAnimationFrame(() => {
        initSkillMarquees();
        marqueeResizeTick = false;
      });
    },
    { passive: true }
  );
});
