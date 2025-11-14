document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('js-enabled');
  const nav = document.querySelector('nav');
  let lastScrollY = window.scrollY;

  const handleSectionReveal = () => {
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    sections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top < viewportHeight * 0.72 && rect.bottom > viewportHeight * 0.28;
      if (isVisible) {
        section.classList.add('in-view');
      } else {
        section.classList.remove('in-view');
      }
    });
  };

  const sections = document.querySelectorAll('section:not(#inicio)');
  handleSectionReveal();

  let revealTicking = false;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    const scrollingDown = currentScroll > lastScrollY;

    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    if (!nav.classList.contains('active')) {
      if (scrollingDown && currentScroll > 120) {
        nav.classList.add('hidden');
      } else {
        nav.classList.remove('hidden');
      }
    }

    if (!revealTicking) {
      revealTicking = true;
      requestAnimationFrame(() => {
        handleSectionReveal();
        revealTicking = false;
      });
    }

    lastScrollY = currentScroll;
  }, { passive: true });

  const toggleMenu = document.querySelector('.toggle-menu');
  const navUl = document.querySelector('nav ul');

  toggleMenu.addEventListener('click', () => {
    navUl.classList.toggle('active');
    nav.classList.toggle('active');
    if (nav.classList.contains('active')) {
      nav.classList.remove('hidden');
    }
  });

  const menuLinks = document.querySelectorAll('nav ul li a');
  menuLinks.forEach(link => {
    link.addEventListener('click', event => {
      event.preventDefault();
      navUl.classList.remove('active');
      nav.classList.remove('active');
      const targetSection = document.querySelector(link.getAttribute('href'));
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const animatedItems = document.querySelectorAll('.timeline-item, .estudio-item, .proyecto-item');

  const itemObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        itemObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  animatedItems.forEach(item => {
    itemObserver.observe(item);
  });

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      alert('Gracias por contactarme. Te respondere pronto.');
      form.reset();
    });
  }

  // Funcionalidad de proyectos con scroll vertical y barra de progreso
  const proyectosMainImage = document.getElementById('proyectos-main-image');
  const proyectoTextItems = document.querySelectorAll('.proyecto-text-item');
  const proyectosProgressFill = document.getElementById('proyectos-progress');
  const proyectosSection = document.getElementById('proyectos');

  if (proyectosMainImage && proyectoTextItems.length > 0 && proyectosProgressFill && proyectosSection) {
    let activeIndex = 0;
    let scrollTicking = false;
    const totalItems = proyectoTextItems.length;

    const updateImage = (index) => {
      const item = proyectoTextItems[index];
      if (item && item.dataset.image) {
        const newImageSrc = item.dataset.image;
        const currentSrc = new URL(proyectosMainImage.src, window.location.href).href;
        const newSrc = new URL(newImageSrc, window.location.href).href;
        
        if (currentSrc !== newSrc) {
          proyectosMainImage.style.opacity = '0';
          setTimeout(() => {
            proyectosMainImage.src = newImageSrc;
            proyectosMainImage.style.opacity = '1';
          }, 200);
        }
      }
    };

    const updateActiveItem = (index) => {
      if (index === activeIndex) return;
      
      proyectoTextItems.forEach((item, i) => {
        if (i === index) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
      
      activeIndex = index;
      updateImage(index);
      
      // Actualizar barra de progreso
      const progressHeight = 100 / totalItems;
      const progressTop = (index * progressHeight);
      proyectosProgressFill.style.height = `${progressHeight}%`;
      proyectosProgressFill.style.top = `${progressTop}%`;
    };

    const handleScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      
      requestAnimationFrame(() => {
        const sectionRect = proyectosSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        
        // Calcular qué sección debería estar activa basándose en el scroll
        // Cuando la sección está en el centro del viewport, empezamos a cambiar
        const scrollStart = viewportHeight * 0.3;
        const scrollEnd = viewportHeight * 0.7;
        const scrollRange = scrollEnd - scrollStart;
        
        let scrollProgress = 0;
        if (sectionTop < scrollStart && sectionTop + sectionHeight > scrollStart) {
          // La sección está siendo scrolleada
          const scrolled = scrollStart - sectionTop;
          scrollProgress = Math.max(0, Math.min(1, scrolled / (sectionHeight * 0.7)));
        } else if (sectionTop <= scrollStart) {
          scrollProgress = 1;
        }
        
        const newIndex = Math.min(
          totalItems - 1,
          Math.max(0, Math.floor(scrollProgress * totalItems))
        );
        
        if (newIndex !== activeIndex) {
          updateActiveItem(newIndex);
        }
        
        scrollTicking = false;
      });
    };

    // Intersection Observer para detectar cuando la sección está visible
    const proyectosObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          handleScroll();
          window.addEventListener('scroll', handleScroll, { passive: true });
        } else {
          window.removeEventListener('scroll', handleScroll);
        }
      });
    }, { threshold: 0.1 });

    proyectosObserver.observe(proyectosSection);

    // Inicializar con el primer item
    updateActiveItem(0);

    // También escuchar scroll global para mejor detección
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
});
