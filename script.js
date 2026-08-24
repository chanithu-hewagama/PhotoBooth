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
  
  if (event.target.closest('.goog-te-gadget') || event.target.closest('a') || event.target.closest('span')) {
    if (event.target.id !== 'google_translate_element') {
      dropdownMenu.style.display = 'none';
    }
  }
});

document.addEventListener('click', () => {
  dropdownMenu.style.display = 'none';
});
