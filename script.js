document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // Mobile Menu Logic (Sesuai kode sebelumnya)
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });

  // DARK MODE TOGGLE LOGIC
  const themeToggle = document.getElementById('theme-toggle');
  const iconSun = document.querySelector('.icon-sun');
  const iconMoon = document.querySelector('.icon-moon');
  const body = document.body;

  // Cek preferensi tersimpan
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    iconSun.style.display = 'none';
    iconMoon.style.display = 'block';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    
    // Simpan preferensi
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    
    // Ganti Icon
    iconSun.style.display = isDark ? 'none' : 'block';
    iconMoon.style.display = isDark ? 'block' : 'none';
  });
});
