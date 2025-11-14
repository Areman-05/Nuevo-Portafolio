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

    const updateActiveItem = (index, force = false) => {
      if (!force && index === activeIndex) return;
      
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
        const viewportCenter = viewportHeight * 0.5;
        const sectionTop = sectionRect.top;
        const sectionBottom = sectionRect.bottom;
        const sectionHeight = sectionRect.height;
        
        // Si la sección no está visible, no hacer nada
        if (sectionBottom < 0 || sectionTop > viewportHeight) {
          scrollTicking = false;
          return;
        }
        
        // Calcular el progreso basándose en la posición del centro del viewport dentro de la sección
        // Dividimos la sección en zonas iguales para cada proyecto
        const zoneHeight = sectionHeight / totalItems;
        const relativePosition = viewportCenter - sectionTop;
        
        // Determinar en qué zona estamos
        let newIndex = Math.floor(relativePosition / zoneHeight);
        newIndex = Math.max(0, Math.min(totalItems - 1, newIndex));
        
        // Si estamos en la primera parte de la sección (primeros 30%), siempre mostrar el primero
        if (sectionTop > viewportHeight * 0.2 && sectionTop < viewportHeight * 0.5) {
          newIndex = 0;
        }
        
        if (newIndex !== activeIndex) {
          updateActiveItem(newIndex);
        }
        
        scrollTicking = false;
      });
    };

    // Función para verificar y actualizar el estado inicial
    const checkInitialState = () => {
      const sectionRect = proyectosSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Si la sección está visible o cerca de ser visible, asegurar que el primer elemento esté activo
      if (sectionRect.top < viewportHeight * 0.8 && sectionRect.bottom > 0) {
        // Si estamos en la parte superior de la sección, mostrar el primer elemento
        if (sectionRect.top > viewportHeight * 0.1) {
          updateActiveItem(0, true);
        } else {
          handleScroll();
        }
      }
    };

    // Intersection Observer para detectar cuando la sección está visible
    const proyectosObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Cuando la sección entra en vista, verificar el estado
          checkInitialState();
          handleScroll();
        }
      });
    }, { 
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
      rootMargin: '0px 0px -10% 0px'
    });

    proyectosObserver.observe(proyectosSection);

    // Inicializar inmediatamente y después de un pequeño delay
    checkInitialState();
    setTimeout(() => {
      checkInitialState();
      handleScroll();
    }, 150);

    // Escuchar scroll global
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // También escuchar resize para recalcular
    window.addEventListener('resize', handleScroll, { passive: true });
  }
});
