export default function toggleTheme() {
  if(!localStorage) return;
  
  // function getNewTheme() {
  //   const themeStr = localStorage.getItem('theme');
  //   if(!themeStr) return 'light';
  //   return JSON.parse(themeStr) === 'dark' ? 'light' : 'dark';
  // }

  function getNextTheme() {
    const numThemes = 3;
    const themeStr = localStorage.getItem('theme');
    if(!themeStr) return '1';
    const currentTheme = JSON.parse(themeStr)
    return currentTheme === numThemes.toString() ? '0' : (Number(currentTheme) + 1).toString();
  }

  const newTheme = getNextTheme();
  localStorage.setItem("theme", JSON.stringify(newTheme));
  document?.documentElement.setAttribute('data-theme', newTheme);
}