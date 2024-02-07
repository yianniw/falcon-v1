export default function setInitialTheme() {
  if(!localStorage) return;
  
  function getTheme(): string {
    const themeStr = localStorage.getItem('theme');
    if(!themeStr) return 'dark';
    return JSON.parse(themeStr);
  }

  const currentTheme = getTheme();
  document?.documentElement.setAttribute('data-theme', currentTheme);
}