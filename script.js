// Hello

const settingsBtn = document.getElementById('settings-trigger');
const dropdownMenu = document.getElementById('dropdown-menu');

dropdownMenu.style.display = 'none';

settingsBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

dropdownMenu.addEventListener('click', (event) => {
  event.stopPropagation();
  
  const item = event.target.closest('a, [role="option"], .goog-te-menu2-item');
  if (item && !item.classList.contains('goog-te-menu-value')) {
    dropdownMenu.style.display = 'none';
  }
});

document.addEventListener('click', (event) => {
  const isFrameClick = event.target.closest && event.target.closest('.goog-te-menu-frame');
  if (isFrameClick) {
    dropdownMenu.style.display = 'none';
    return;
  }
  dropdownMenu.style.display = 'none';
});
