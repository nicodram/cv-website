document.addEventListener('DOMContentLoaded', () => {
  // Update copyright year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });

  // Close menu when clicking a link
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.textContent = '☰';
    });
  });

  // DARK MODE TOGGLE LOGIC
  const themeToggle = document.getElementById('theme-toggle');
  const iconSystem = document.querySelector('.icon-system');
  const iconMoon = document.querySelector('.icon-moon');
  const iconSun = document.querySelector('.icon-sun');
  const body = document.body;

  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  const updateThemeUI = (theme) => {
    if (theme === 'system') {
      const sys = getSystemTheme();
      iconSystem.style.display = 'block';
      iconMoon.style.display = 'none';
      iconSun.style.display = 'none';
      if (sys === 'dark') {
        body.setAttribute('data-theme', 'dark');
      } else {
        body.removeAttribute('data-theme');
      }
    } else if (theme === 'dark') {
      body.setAttribute('data-theme', 'dark');
      iconSystem.style.display = 'none';
      iconMoon.style.display = 'block';
      iconSun.style.display = 'none';
    } else {
      body.removeAttribute('data-theme');
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
      updateThemeUI('system');
    }
  });

  // Navbar scroll effect - add background when scrolled
  const navbar = document.querySelector('.navbar');
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
});
