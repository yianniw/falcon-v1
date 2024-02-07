export default function toggleTheme() {
  if(!localStorage) return;
  
  function getNewTheme() {
    const themeStr = localStorage.getItem('theme');
    if(!themeStr) return 'light';
    return JSON.parse(themeStr) === 'dark' ? 'light' : 'dark';
  }

  const newTheme = getNewTheme();
  localStorage.setItem("theme", JSON.stringify(newTheme));
  document?.documentElement.setAttribute('data-theme', newTheme);
}