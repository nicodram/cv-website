document.addEventListener('DOMContentLoaded', () => {
  // 1. Auto Theme Detection & Toggle
  const html = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const iconSystem = document.querySelector('.icon-system');
  const iconMoon = document.querySelector('.icon-moon');
  const iconSun = document.querySelector('.icon-sun');

  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const updateThemeUI = (theme) => {
    html.setAttribute('data-theme', theme);
    if (theme === 'system') {
      const sys = getSystemTheme();
      iconSystem.style.display = 'block';
      iconMoon.style.display = 'none';
      iconSun.style.display = 'none';
    } else if (theme === 'dark') {
      iconSystem.style.display = 'none';
      iconMoon.style.display = 'block';
      iconSun.style.display = 'none';
    } else {
      iconSystem.style.display = 'none';
      iconMoon.style.display = 'none';
      iconSun.style.display = 'block';
    }
  };

  // Init theme
  let currentTheme = localStorage.getItem('theme') || 'system';
  updateThemeUI(currentTheme);

  themeToggle.addEventListener('click', () => {
    const themes = ['system', 'light', 'dark'];
    const currentIndex = themes.indexOf(currentTheme);
    currentTheme = themes[(currentIndex + 1) % themes.length];
    localStorage.setItem('theme', currentTheme);
    updateThemeUI(currentTheme);
  });

  // Listen to system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (currentTheme === 'system') {
      // CSS @media handles it automatically, but we can force update if needed
    }
  });

  // 2. Mobile Menu
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.textContent = '';
    });
  });

  // 3. Hero Scroll Effects (Parallax Stars + Circuit Glow)
  const hero = document.getElementById('hero');
  const starGroups = document.querySelectorAll('.star-group');
  const circuitPaths = document.querySelectorAll('.circuit-path');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const heroHeight = hero.offsetHeight;
        
        // Parallax stars
        starGroups.forEach(group => {
          const speed = parseFloat(group.getAttribute('data-speed')) || 0.2;
          const yPos = -(scrolled * speed);
          group.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });

        // Circuit line drawing effect
        if (scrolled < heroHeight) {
          const progress = Math.min(scrolled / (heroHeight * 0.6), 1);
          circuitPaths.forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length * (1 - progress);
          });
        }

        // Fade scroll indicator
        if (scrollIndicator) {
          scrollIndicator.style.opacity = scrolled > 50 ? '0' : '1';
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  // 4. Copyright Year
  document.getElementById('year').textContent = new Date().getFullYear();
});
