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

  // Funcionalidad de proyectos con scroll horizontal controlado por scroll vertical
  const proyectoHeroImg = document.getElementById('proyecto-hero-img');
  const proyectoCards = document.querySelectorAll('.proyecto-card');
  const proyectosScroll = document.getElementById('proyectos-scroll');
  const proyectosScrollWrapper = proyectosScroll?.parentElement;
  const proyectosWrapper = document.querySelector('.proyectos-wrapper');
  const proyectosSection = document.getElementById('proyectos');

  if (proyectoHeroImg && proyectoCards.length > 0 && proyectosScrollWrapper && proyectosWrapper && proyectosSection) {
    let activeIndex = 0;
    let scrollTicking = false;
    let isScrolling = false;
    const totalCards = proyectoCards.length;
    
    // Ajustar la altura del wrapper según el número de proyectos
    proyectosWrapper.style.height = `${totalCards * 100}vh`;

    const updateHeroImage = (index) => {
      const card = proyectoCards[index];
      if (card && card.dataset.image) {
        const newImageSrc = card.dataset.image;
        if (proyectoHeroImg.src !== new URL(newImageSrc, window.location.href).href) {
          proyectoHeroImg.style.opacity = '0';
          setTimeout(() => {
            proyectoHeroImg.src = newImageSrc;
            proyectoHeroImg.style.opacity = '1';
          }, 150);
        }
      }
    };

    const updateActiveCard = (index) => {
      proyectoCards.forEach((card, i) => {
        if (i === index) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });
      activeIndex = index;
      updateHeroImage(index);
    };

    const handleHorizontalScroll = () => {
      if (scrollTicking || isScrolling) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        const scrollWidth = proyectosScrollWrapper.offsetWidth;
        
        // Encontrar qué tarjeta está más centrada en el viewport
        let closestIndex = 0;
        let closestDistance = Infinity;
        
        proyectoCards.forEach((card, index) => {
          const cardRect = card.getBoundingClientRect();
          const scrollRect = proyectosScrollWrapper.getBoundingClientRect();
          const cardCenter = cardRect.left + cardRect.width / 2 - scrollRect.left;
          const scrollCenter = scrollWidth / 2;
          const distance = Math.abs(cardCenter - scrollCenter);
          
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });
        
        if (closestIndex !== activeIndex) {
          updateActiveCard(closestIndex);
        }
        scrollTicking = false;
      });
    };

    // Convertir scroll vertical en scroll horizontal cuando estás en la sección
    const handleVerticalScroll = () => {
      if (scrollTicking || isScrolling) return;
      scrollTicking = true;
      
      requestAnimationFrame(() => {
        const wrapperRect = proyectosWrapper.getBoundingClientRect();
        const sectionRect = proyectosSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Verificar si estamos dentro de la sección sticky
        if (sectionRect.top <= 0 && sectionRect.bottom > viewportHeight) {
          // Calcular el progreso del scroll dentro del wrapper
          const wrapperTop = wrapperRect.top;
          const wrapperHeight = wrapperRect.height;
          const scrollProgress = Math.max(0, Math.min(1, -wrapperTop / (wrapperHeight - viewportHeight)));
          
          // Calcular el scroll horizontal basado en el progreso
          const maxScrollLeft = proyectosScroll.scrollWidth - proyectosScrollWrapper.offsetWidth;
          const targetScrollLeft = scrollProgress * maxScrollLeft;
          
          // Aplicar el scroll horizontal
          isScrolling = true;
          proyectosScrollWrapper.scrollLeft = targetScrollLeft;
          
          // Actualizar la tarjeta activa
          const cardIndex = Math.round(scrollProgress * (totalCards - 1));
          const clampedIndex = Math.max(0, Math.min(totalCards - 1, cardIndex));
          
          if (clampedIndex !== activeIndex) {
            updateActiveCard(clampedIndex);
          }
          
          setTimeout(() => {
            isScrolling = false;
          }, 100);
        }
        
        scrollTicking = false;
      });
    };

    // Click en tarjetas
    proyectoCards.forEach((card, index) => {
      card.addEventListener('click', (e) => {
        // No cambiar imagen si se hace click en el botón
        if (e.target.closest('.proyecto-btn')) return;
        
        updateActiveCard(index);
        // Scroll suave a la tarjeta
        const cardLeft = card.offsetLeft;
        isScrolling = true;
        proyectosScrollWrapper.scrollTo({
          left: cardLeft - (proyectosScrollWrapper.offsetWidth - card.offsetWidth) / 2,
          behavior: 'smooth'
        });
        setTimeout(() => {
          isScrolling = false;
        }, 500);
      });
    });

    // Scroll horizontal manual (cuando el usuario hace scroll horizontal directamente)
    proyectosScrollWrapper.addEventListener('scroll', handleHorizontalScroll, { passive: true });

    // Scroll vertical (convierte a horizontal)
    window.addEventListener('scroll', handleVerticalScroll, { passive: true });

    // Inicializar con la primera tarjeta
    updateActiveCard(0);

    // Intersection Observer para resetear cuando salgas de la sección
    const proyectosObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
          // Si salimos por abajo, mantener la última tarjeta
          // Si salimos por arriba, resetear a la primera
          if (entry.boundingClientRect.bottom < 0) {
            updateActiveCard(0);
          }
        }
      });
    }, { threshold: [0, 1] });

    proyectosObserver.observe(proyectosWrapper);
  }
});
