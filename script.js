// Translation Dataset Matrix
// nice job on the translations!
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
    },
    ta: {
        nav_home: "முகப்பு",
        nav_download: "பதிவிறக்கம்",
        nav_settings: "அமைப்புகள்",
        pref_header: "விருப்பத்தேர்வுகள்",
        pref_lang: "மொழி",
        site_progress: "இந்த இணையதளம் உருவாக்கத்தில் உள்ளது.",
        footer_rights: "© 2026, சனித்து மற்றும் நிக்கி182. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவ"
    },
    ja: {
        nav_home: "ホームページ",
        nav_download: "ダウンロード",
        nav_settings: "設定",
        pref_header: "設定",
        pref_lang: "言語",
        site_progress: "このウェブサイトは現在制作中です。",
        footer_rights: "© 2026 Chanithu および Niki182。無断複写・転載を禁じます。"
    }
};

// Core Translation Target Iterator Engine
function applyTranslations(lang) {
    const translatableElements = document.querySelectorAll('.translatable');
    
    translatableElements.forEach(element => {
        const key = element.getAttribute('data-key');
        
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });

    document.documentElement.lang = lang;
}

// Enclosing initial state routines inside a try block isolates contextual execution crashes
try {
    const languageSelector = document.getElementById('nav-lang');

    if (languageSelector) {
        const savedLanguage = localStorage.getItem('photoBoothLang') || 'en';
        languageSelector.value = savedLanguage;
        applyTranslations(savedLanguage);

        languageSelector.addEventListener('change', (event) => {
            const selectedLang = event.target.value;
            localStorage.setItem('photoBoothLang', selectedLang);
            applyTranslations(selectedLang);
        });
    } else {
        console.warn("Language selector element (#nav-lang) missing from this view layout structural tree.");
    }
} catch (error) {
    console.error("Translation routine encountered initialization anomalies:", error);
}
