// Smooth scroll y navegación
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.main-nav');
  let lastScrollY = window.scrollY;

  // Efecto de scroll en la navegación
  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = currentScroll;
  }, { passive: true });

  // Smooth scroll solo para enlaces internos (si existen)
  const navLinks = document.querySelectorAll('.nav-menu a, .btn-primary, .btn-secondary');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      // Solo hacer smooth scroll si es un enlace interno a una sección
      if (href && href.startsWith('#') && document.querySelector(href)) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const navHeight = nav.offsetHeight;
          const targetPosition = target.offsetTop - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
      // Si es un enlace a otra página, dejar que el navegador lo maneje normalmente
    });
  });

  // Animación de elementos al hacer scroll
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

  // Observar elementos que deben animarse
  const animatedElements = document.querySelectorAll('.project-card, .skill-category, .about-text, .contact-content');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Manejo del formulario de contacto
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      // El formulario se enviará a través de Formspree
      // Solo mostramos un mensaje de confirmación
      setTimeout(() => {
        alert('¡Gracias por tu mensaje! Te responderé pronto.');
      }, 100);
    });
  }
});
