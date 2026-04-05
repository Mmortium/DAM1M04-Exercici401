// Canviar tema i guardar a LocalStorage
const setTheme = (theme) => {
  document.body.className = theme;
  localStorage.setItem('theme', theme);
}

// En carregar la pàgina
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) setTheme(savedTheme);
});