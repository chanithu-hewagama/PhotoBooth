// Translation Dictionary Matrix Dataset mapping keys to languages
const translations = {
    en: {
        nav_home: "Home",
        nav_download: "Download",
        nav_settings: "Settings",
        pref_header: "Preferences",
        pref_lang: "Language",
        site_progress: "This website is in progress.",
        footer_rights: "© 2026, Chanithu and Niki182. All rights reserved."
    },
    es: {
        nav_home: "Inicio",
        nav_download: "Descargar",
        nav_settings: "Ajustes",
        pref_header: "Preferencias",
        pref_lang: "Idioma",
        site_progress: "Este sitio web está en progreso.",
        footer_rights: "© 2026, Chanithu y Niki182. Todos los derechos reservados."
    },
    fr: {
        nav_home: "Accueil",
        nav_download: "Télécharger",
        nav_settings: "Paramètres",
        pref_header: "Préférences",
        pref_lang: "Langue",
        site_progress: "Ce site web est en cours de développement.",
        footer_rights: "© 2026, Chanithu et Niki182. Tous droits réservés."
    },
    de: {
        nav_home: "Startseite",
        nav_download: "Herunterladen",
        nav_settings: "Einstellungen",
        pref_header: "Präferenzen",
        pref_lang: "Sprache",
        site_progress: "Diese Website befindet sich im Aufbau.",
        footer_rights: "© 2026, Chanithu und Niki182. Alle Rechte vorbehalten."
    }
};

/**
 * Iterates through all translatable class target blocks 
 * and maps the selected text from the translation dictionary matrix.
 */
function applyTranslations(lang) {
    const translatableElements = document.querySelectorAll('.translatable');
    
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-key');
        
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    // Update document root metadata standard tag
    document.documentElement.lang = lang;
}

// Initialization Logic Lifecycle Events
document.addEventListener("DOMContentLoaded", () => {
    const languageSelector = document.getElementById('nav-lang');

    // Load previously saved language preference from localStorage or fallback to English
    const savedLanguage = localStorage.getItem('photoBoothLang') || 'en';
    
    // Set current state on selector UI control
    languageSelector.value = savedLanguage;
    applyTranslations(savedLanguage);

    // Event Listener listening for selector switch modifications
    languageSelector.addEventListener('change', (event) => {
        const selectedLang = event.target.value;
        
        // Cache the option value inside local Storage layer
        localStorage.setItem('photoBoothLang', selectedLang);
        applyTranslations(selectedLang);
    });
});
