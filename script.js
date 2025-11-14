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

  // Funcionalidad de proyectos con scroll invisible tipo JetBrains
  const proyectoListItems = document.querySelectorAll('.proyecto-list-item');
  const proyectoPanelImgs = document.querySelectorAll('.proyecto-panel-img');
  const proyectosWrapper = document.querySelector('.proyectos-wrapper');
  const proyectosSection = document.getElementById('proyectos');
  let currentProject = 0;
  let isTransitioning = false;
  let scrollTicking = false;

  if (proyectoListItems.length > 0 && proyectoPanelImgs.length > 0 && proyectosWrapper && proyectosSection) {
    const totalProjects = proyectoListItems.length;
    
    // Ajustar altura del wrapper según número de proyectos (más espacio para mejor carga)
    proyectosWrapper.style.height = `${totalProjects * 120}vh`;

    // Función para cambiar el proyecto activo con efecto crossfade suave
    const switchProject = (projectIndex, fromScroll = false) => {
      if (isTransitioning || projectIndex === currentProject) return;
      
      isTransitioning = true;
      const targetIndex = parseInt(projectIndex);

      // Fade out: remover clase active de imagen y item actuales
      const currentImg = proyectoPanelImgs[currentProject];
      const currentItem = proyectoListItems[currentProject];

      if (currentImg) {
        currentImg.classList.remove('active');
      }
      if (currentItem) {
        currentItem.classList.remove('active');
      }

      // Esperar a que termine el fade out antes de cambiar (crossfade)
      setTimeout(() => {
        // Fade in: añadir clase active a nueva imagen y item
        const newImg = proyectoPanelImgs[targetIndex];
        const newItem = proyectoListItems[targetIndex];

        if (newImg) {
          newImg.classList.add('active');
        }
        if (newItem) {
          newItem.classList.add('active');
        }

        currentProject = targetIndex;
        
        // Permitir nueva transición después de que termine el fade in
        setTimeout(() => {
          isTransitioning = false;
        }, 400);
      }, 400);
    };

    // Función para manejar el scroll invisible con mejor flujo
    const handleScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      
      requestAnimationFrame(() => {
        const wrapperRect = proyectosWrapper.getBoundingClientRect();
        const sectionRect = proyectosSection.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Verificar si estamos dentro de la sección sticky
        if (sectionRect.top <= 0 && sectionRect.bottom > viewportHeight) {
          // Calcular el progreso del scroll dentro del wrapper de forma más precisa
          const wrapperTop = wrapperRect.top;
          const wrapperHeight = wrapperRect.height;
          const scrollableHeight = wrapperHeight - viewportHeight;
          
          if (scrollableHeight > 0) {
            const scrollProgress = Math.max(0, Math.min(1, -wrapperTop / scrollableHeight));
            
            // Dividir el scroll en zonas más precisas para cada proyecto
            // Cada proyecto ocupa una porción igual del scroll
            const zoneSize = 1 / totalProjects;
            let targetIndex = 0;
            
            // Determinar en qué zona estamos
            for (let i = 0; i < totalProjects; i++) {
              const zoneStart = i * zoneSize;
              const zoneEnd = (i + 1) * zoneSize;
              
              // Si estamos en la última zona, incluir el borde superior
              if (i === totalProjects - 1) {
                if (scrollProgress >= zoneStart) {
                  targetIndex = i;
                  break;
                }
              } else {
                if (scrollProgress >= zoneStart && scrollProgress < zoneEnd) {
                  targetIndex = i;
                  break;
                }
              }
            }
            
            // Asegurar que el índice esté en rango
            const clampedIndex = Math.max(0, Math.min(totalProjects - 1, targetIndex));
            
            if (clampedIndex !== currentProject && !isTransitioning) {
              switchProject(clampedIndex, true);
            }
          }
        }
        
        scrollTicking = false;
      });
    };

    // Event listeners para hover en los items de la lista (mantener funcionalidad manual)
    proyectoListItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        if (!isTransitioning) {
          switchProject(index, false);
        }
      });

      // También permitir click para dispositivos táctiles
      item.addEventListener('click', () => {
        if (!isTransitioning) {
          switchProject(index, false);
        }
      });
    });

    // Scroll vertical que controla el cambio de proyectos
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Inicializar con el primer proyecto activo
    if (proyectoListItems[0] && proyectoPanelImgs[0]) {
      proyectoListItems[0].classList.add('active');
      proyectoPanelImgs[0].classList.add('active');
    }

    // Verificar estado inicial
    handleScroll();
  }
});
