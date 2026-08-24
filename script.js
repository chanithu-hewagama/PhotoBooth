// Hello

const settingsBtn = document.getElementById('settings-trigger');
const dropdownMenu = document.getElementById('dropdown-menu');

settingsBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', () => {
  dropdownMenu.style.display = 'none';
});
