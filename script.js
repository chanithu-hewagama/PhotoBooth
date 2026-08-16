// Import the translation engine directly from the jsDelivr CDN link
import translate from "https://jsdelivr.net";

// FIXED: Using the exact official argosopentech domain matching structure
translate.engine = "libre"; 
translate.url = "https://argosopentech.com";

/**
 * Normalizes custom dropdown values to strict ISO language codes
 */
function getApiLangCode(lang) {
    const languageMap = {
        'sn': 'si' // Maps Sinhala to official ISO code 'si' for the library
    };
    return languageMap[lang] || lang;
}

/**
 * Sweeps through all structural translatable items and updates their content 
 * using asynchronous network promises.
 */
async function applyTranslations(lang) {
    const translatableElements = document.querySelectorAll('.translatable');
    const apiLang = getApiLangCode(lang);
    
    // Process all element changes concurrently using map arrays
    const translationPromises = Array.from(translatableElements).map(async (element) => {
        // Cache the pristine original English value on the first load so we never double-translate
        if (!element.hasAttribute('data-original-text')) {
            element.setAttribute('data-original-text', element.textContent.trim());
        }
        
        const originalText = element.getAttribute('data-original-text');
        
        // If the user chooses English, load the original content directly without network overhead
        if (lang === 'en') {
            element.textContent = originalText;
            return;
        }

        element.textContent = "..."; // Display loading state indicator placeholders
        
        try {
            // Using the library: translate(text, { from: "en", to: targetLanguage })
            const translatedResult = await translate(originalText, { from: "en", to: apiLang });
            element.textContent = translatedResult;
        } catch (error) {
            console.error("Module translation failure:", error);
            element.textContent = originalText; // Fallback to original text on error
        }
    });

    await Promise.all(translationPromises);
    
    // Handle RTL orientation adjustments dynamically for Arabic
    if (lang === 'ar') {
        document.documentElement.dir = "rtl";
    } else {
        document.documentElement.dir = "ltr";
    }
    
    document.documentElement.lang = apiLang;
}

// Initial state execution configuration
try {
    const languageSelector = document.getElementById('nav-lang');

    if (languageSelector) {
        const savedLanguage = localStorage.getItem('photoBoothLang') || 'en';
        languageSelector.value = savedLanguage;
        applyTranslations(savedLanguage);

        languageSelector.addEventListener('change', async (event) => {
            const selectedLang = event.target.value;
            localStorage.setItem('photoBoothLang', selectedLang);
            await applyTranslations(selectedLang);
        });
    } else {
        console.warn("Language selector node (#nav-lang) missing from view structural tree layout.");
    }
} catch (error) {
    console.error("Translation routine encountered initialization anomalies:", error);
}
