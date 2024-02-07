export default function setInitialTheme() {
  if(!localStorage) return;
  
  function getPreviousTheme(): string {
    const themeStr = localStorage.getItem('theme');
    if(!themeStr) return '0';
    return JSON.parse(themeStr);
  }

  const currentTheme = getPreviousTheme();
  document?.documentElement.setAttribute('data-theme', currentTheme);
}