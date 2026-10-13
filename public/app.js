// ==========================================================================
// INTERATIVIDADE DA LANDING PAGE — MENTORIA LB
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // 1. REVEAL AO ROLAR A PÁGINA (INTERSECTION OBSERVER)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. CONTROLE DO MENU MOBILE
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileDrawer = document.querySelector('.mobile-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileMenuBtn.textContent = isOpen ? '✕' : '☰';
      mobileMenuBtn.setAttribute('aria-expanded', isOpen);
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileMenuBtn.textContent = '☰';
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. BARRA STICKY MOBILE (EXIBIR APÓS HERO)
  const stickyBar = document.querySelector('.mobile-sticky-bar');
  const heroSection = document.querySelector('.hero-section');

  if (stickyBar && heroSection) {
    window.addEventListener('scroll', () => {
      const heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 100) {
        stickyBar.style.display = 'flex';
      } else {
        stickyBar.style.display = 'none';
      }
    }, { passive: true });
  }

  // 4. GARANTIR REPRODUÇÃO DO VÍDEO DO CELULAR
  const videoEl = document.getElementById('curralVideo');
  if (videoEl) {
    videoEl.muted = true;
    const playPromise = videoEl.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay bloqueado pelo navegador, aguardar primeiro clique
        document.body.addEventListener('click', () => {
          videoEl.play();
        }, { once: true });
      });
    }
  }

  // 5. NAVEGAÇÃO SUAVE PARA LINKS ÂNCORA
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // 6. FAQ EXCLUSIVO (FECHAR OUTROS QUANDO UM ABRE)
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    item.addEventListener('toggle', () => {
      if (item.open) {
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.open) {
            otherItem.open = false;
          }
        });
      }
    });
  });
});
