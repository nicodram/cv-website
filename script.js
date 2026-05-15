document.addEventListener('DOMContentLoaded', () => {
  // Copyright Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // --- MOBILE MENU ---
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navbar = document.getElementById('navbar');

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.textContent = '☰';
      });
    });
  }

  // --- NAVBAR SCROLL EFFECT ---
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // --- THEME TOGGLE ---
  const themeToggle = document.getElementById('theme-toggle');
  const iconMoon = document.querySelector('.icon-moon');
  const iconSun = document.querySelector('.icon-sun');
  const html = document.documentElement;

  const savedTheme = localStorage.getItem('theme') || 'dark';
  setTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
    });
  }

  function setTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      iconMoon.style.display = 'block';
      iconSun.style.display = 'none';
    } else {
      iconMoon.style.display = 'none';
      iconSun.style.display = 'block';
    }
  }

  // --- COUNTER ANIMATION ---
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();
    
    const update = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out cubic
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (target - start) * easeOut);
      
      el.textContent = current + '+';
      
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };
    
    requestAnimationFrame(update);
  };

  // --- INTERSECTION OBSERVER FOR ANIMATIONS ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger counter animation for stats
        if (entry.target.querySelector('.stat-number')) {
          entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
        }
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('.section, .hero-content').forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // --- SMOOTH SCROLL FOR ANCHOR LINKS ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // --- PARALLAX EFFECT ON SCROLL (Subtle) ---
  const heroContent = document.querySelector('.hero-content');
  
  window.addEventListener('scroll', () => {
    if (heroContent) {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.3;
      heroContent.style.transform = `translateY(${rate}px)`;
      heroContent.style.opacity = 1 - (scrolled / 800);
    }
  });
});
/* ========================================
   SOUND TOGGLE BUTTON STYLES
   ======================================== */
.sound-toggle {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 999;
  transition: all var(--transition-base);
  box-shadow: var(--shadow-md);
  overflow: visible;
}

.sound-toggle:hover {
  background: var(--bg-card-hover);
  border-color: var(--accent);
  transform: scale(1.1);
  box-shadow: var(--shadow-glow), var(--shadow-md);
}

.sound-toggle.active {
  border-color: var(--accent);
  box-shadow: var(--shadow-glow), var(--shadow-md);
}

.sound-toggle .sound-icon {
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  position: relative;
  z-index: 2;
}

.sound-toggle.active .sound-icon {
  color: var(--accent);
}

.sound-toggle .sound-icon svg {
  width: 24px;
  height: 24px;
}

/* Pulsing Effect */
.pulsing-ui {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0;
  z-index: 1;
  pointer-events: none;
}

.sound-toggle.active .pulsing-ui {
  animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
}

@keyframes pulse-ring {
  0% {
    transform: scale(0.8);
    opacity: 0.8;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* Tooltip */
.sound-toggle::after {
  content: 'Ambient Sound';
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 0.5rem;
  padding: 0.4rem 0.8rem;
  background: var(--bg-secondary);
  border: 1px solid var(--border);
  border-radius: 6px;
  font-size: 0.75rem;
  color: var(--text-primary);
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-fast);
  pointer-events: none;
  font-family: var(--font-primary);
}

.sound-toggle:hover::after {
  opacity: 1;
  visibility: visible;
  bottom: calc(100% + 0.5rem);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .sound-toggle {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 50px;
    height: 50px;
  }
  
  .sound-toggle .sound-icon svg {
    width: 20px;
    height: 20px;
  }
  
  .sound-toggle::after {
    display: none;
  }
}

/* Accessibility */
.sound-toggle:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 3px;
}

/* Visually Hidden Utility */
.u-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
