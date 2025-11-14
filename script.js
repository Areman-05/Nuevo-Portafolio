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

  // Funcionalidad de proyectos con panel fijo y efecto crossfade
  const proyectoListItems = document.querySelectorAll('.proyecto-list-item');
  const proyectoPanelImgs = document.querySelectorAll('.proyecto-panel-img');
  const proyectoPanelTexts = document.querySelectorAll('.proyecto-panel-text-content');
  let currentProject = 0;
  let isTransitioning = false;

  if (proyectoListItems.length > 0 && proyectoPanelImgs.length > 0 && proyectoPanelTexts.length > 0) {
    // Función para cambiar el proyecto activo con efecto crossfade
    const switchProject = (projectIndex) => {
      if (isTransitioning || projectIndex === currentProject) return;
      
      isTransitioning = true;
      const targetIndex = parseInt(projectIndex);

      // Fade out: remover clase active de imagen y texto actuales
      const currentImg = proyectoPanelImgs[currentProject];
      const currentText = proyectoPanelTexts[currentProject];
      const currentItem = proyectoListItems[currentProject];

      if (currentImg) {
        currentImg.classList.remove('active');
      }
      if (currentText) {
        currentText.classList.remove('active');
      }
      if (currentItem) {
        currentItem.classList.remove('active');
      }

      // Esperar a que termine el fade out antes de cambiar
      setTimeout(() => {
        // Fade in: añadir clase active a nueva imagen y texto
        const newImg = proyectoPanelImgs[targetIndex];
        const newText = proyectoPanelTexts[targetIndex];
        const newItem = proyectoListItems[targetIndex];

        if (newImg) {
          newImg.classList.add('active');
        }
        if (newText) {
          newText.classList.add('active');
        }
        if (newItem) {
          newItem.classList.add('active');
        }

        currentProject = targetIndex;
        
        // Permitir nueva transición después de que termine el fade in
        setTimeout(() => {
          isTransitioning = false;
        }, 300);
      }, 300);
    };

    // Event listeners para hover en los items de la lista
    proyectoListItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        if (!isTransitioning) {
          switchProject(index);
        }
      });

      // También permitir click para dispositivos táctiles
      item.addEventListener('click', () => {
        if (!isTransitioning) {
          switchProject(index);
        }
      });
    });

    // Inicializar con el primer proyecto activo
    if (proyectoListItems[0] && proyectoPanelImgs[0] && proyectoPanelTexts[0]) {
      proyectoListItems[0].classList.add('active');
      proyectoPanelImgs[0].classList.add('active');
      proyectoPanelTexts[0].classList.add('active');
    }
  }
});
