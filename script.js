/* ===================================
   BOULADO STUDIO'S — script.js
   =================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- LOADER ----
  const loader     = document.getElementById('loader');
  const loaderFill = document.getElementById('loader-fill');
  let progress = 0;

  const fillInterval = setInterval(() => {
    progress += Math.random() * 18 + 8;
    if (progress >= 100) {
      progress = 100;
      clearInterval(fillInterval);
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        // Trigger first visible reveals
        observeReveal();
      }, 300);
    }
    loaderFill.style.width = progress + '%';
    document.querySelector('.loader-text').textContent =
      progress < 40  ? 'Carregando Assets...'  :
      progress < 70  ? 'Iniciando Engine...'   :
      progress < 90  ? 'Construindo Mundo...'  :
      'Pronto!';
  }, 120);

  document.body.style.overflow = 'hidden';

  // ---- CUSTOM CURSOR ----
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followX = 0, followY = 0;

  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    const animateCursor = () => {
      followX += (mouseX - followX) * 0.12;
      followY += (mouseY - followY) * 0.12;
      follower.style.left = followX + 'px';
      follower.style.top  = followY + 'px';
      requestAnimationFrame(animateCursor);
    };
    animateCursor();
  }

  // ---- NAV SCROLL ----
  const nav = document.getElementById('nav');
  const handleNavScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  };
  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---- MOBILE NAV ----
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // ---- SMOOTH SCROLL for anchor links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
        const top  = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- BACK TO TOP ----
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // ---- REVEAL ON SCROLL ----
  function observeReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => io.observe(el));
  }

  // ---- HERO PARTICLES ----
  const particlesContainer = document.getElementById('hero-particles');
  if (particlesContainer) {
    const count = window.matchMedia('(max-width: 640px)').matches ? 15 : 35;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        top:  ${Math.random() * 100}%;
        width: ${Math.random() > 0.7 ? 2 : 1}px;
        height: ${Math.random() > 0.7 ? 2 : 1}px;
        animation-duration: ${8 + Math.random() * 16}s;
        animation-delay: ${Math.random() * 10}s;
        opacity: ${0.3 + Math.random() * 0.5};
      `;
      particlesContainer.appendChild(p);
    }
  }

  // ---- COUNTER ANIMATION ----
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const start = performance.now();

    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // Hero stats (animate once)
  const heroCounters = document.querySelectorAll('.hero .stat-num[data-target]');
  let heroCountersDone = false;

  const heroIo = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !heroCountersDone) {
      heroCountersDone = true;
      heroCounters.forEach(el => animateCounter(el));
    }
  }, { threshold: 0.5 });
  heroCounters.forEach(el => heroIo.observe(el));

  // About / stats bar counters
  const counters = document.querySelectorAll('.counter[data-target]');
  const counterIo = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterIo.observe(el));

  // ---- PROJECT FILTER ----
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('#projects-grid .project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        const cat = card.dataset.category;
        const show = filter === 'all' || cat === filter;
        card.style.transition = 'opacity 0.3s, transform 0.3s';
        if (show) {
          card.classList.remove('hidden');
          requestAnimationFrame(() => {
            card.style.opacity = '1';
            card.style.transform = '';
          });
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => card.classList.add('hidden'), 300);
        }
      });
    });
  });

  // ---- 3D TILT on team cards ----
  const teamCards = document.querySelectorAll('.team-card-inner');
  teamCards.forEach(card => {
    const parent = card.parentElement;
    parent.addEventListener('mousemove', e => {
      if (window.matchMedia('(pointer: fine)').matches) {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `
          translateY(-6px)
          rotateX(${-y * 8}deg)
          rotateY(${x * 8}deg)
        `;
      }
    });
    parent.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ---- CONTACT FORM ----
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = `
        <span>Mensagem Enviada!</span>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      `;
      btn.style.background = '#4CAF50';
      btn.style.borderColor = '#4CAF50';
      btn.disabled = true;

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });

    // Add glow effect on input focus
    form.querySelectorAll('input, textarea, select').forEach(el => {
      el.addEventListener('focus', () => {
        el.parentElement.style.transform = 'scale(1.01)';
      });
      el.addEventListener('blur', () => {
        el.parentElement.style.transform = '';
      });
    });
  }

  // ---- NAV ACTIVE LINK on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link');

  const sectionIo = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinksAll.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          if (link.classList.contains('active')) {
            link.style.color = 'var(--gold)';
          } else {
            link.style.color = '';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => sectionIo.observe(s));

  // ---- HERO TITLE subtle mouse parallax ----
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 10;
      const y = (e.clientY / window.innerHeight - 0.5) * 6;
      heroTitle.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });
  }

  // ---- GLITCH effect on logo hover ----
  const logoEls = document.querySelectorAll('.nav-logo .logo-text');
  logoEls.forEach(el => {
    el.closest('.nav-logo').addEventListener('mouseenter', () => {
      el.style.animation = 'glitch 0.3s steps(2) forwards';
    });
    el.closest('.nav-logo').addEventListener('mouseleave', () => {
      el.style.animation = '';
    });
  });

  // Inject glitch keyframes
  const glitchStyle = document.createElement('style');
  glitchStyle.textContent = `
    @keyframes glitch {
      0%   { transform: none; }
      20%  { transform: translateX(-2px) skewX(-3deg); clip-path: inset(20% 0 40% 0); }
      40%  { transform: translateX(2px) skewX(3deg);  clip-path: inset(60% 0 10% 0); }
      60%  { transform: translateX(-1px); }
      80%  { transform: translateX(1px);  clip-path: none; }
      100% { transform: none; }
    }
  `;
  document.head.appendChild(glitchStyle);

});
