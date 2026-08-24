// Hello

const settingsBtn = document.getElementById('settingsBtn');
const dropdownMenu = document.getElementById('dropdownMenu');

settingsBtn.addEventListener('click', (event) => {
  event.stopPropagation();
  dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

document.addEventListener('click', () => {
  dropdownMenu.style.display = 'none';
});
