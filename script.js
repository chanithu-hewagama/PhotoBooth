// A reliable, open-source LibreTranslate mirror endpoint node to pipe text translation requests
const TRANSLATION_API_URL = "https://argosopenteach.com";

/**
 * Normalizes custom dropdown values to strict API ISO-639-1 language codes
 */
function getApiLangCode(lang) {
    const languageMap = {
        'sn': 'si', // Maps Sinhala to official ISO code 'si'
        'am': 'am', // Amharic
        'ar': 'ar'  // Arabic
    };
    return languageMap[lang] || lang;
}

/**
 * Asynchronously communicates with the translation engine API 
 * to fetch localized string conversions for target components.
 */
async function translateText(text, targetLang) {
    const apiLang = getApiLangCode(targetLang);
    try {
        const response = await fetch(TRANSLATION_API_URL, {
            method: "POST",
            body: JSON.stringify({
                q: text,
                source: "auto", // Automatically analyzes the string context block
                target: apiLang,
                format: "text"
            }),
            headers: { "Content-Type": "application/json" }
        });

        if (!response.ok) throw new Error(`Server returned error status code: ${response.status}`);
        
        const data = await response.json();
        return data.translatedText;
    } catch (error) {
        console.error("API Fetch execution failure:", error);
        return text; // Graceful structural fallback: shows original English string
    }
}

/**
 * Sweeps through all structural translatable items and updates their content 
 * using asynchronous network promises.
 */
async function applyTranslations(lang) {
    const translatableElements = document.querySelectorAll('.translatable');
    
    // Process all element changes concurrently using map arrays
    const translationPromises = Array.from(translatableElements).map(async (element) => {
        // Cache the pristine original English value on the first load so we never double-translate
        if (!element.hasAttribute('data-original-text')) {
            element.setAttribute('data-original-text', element.textContent.trim());
        }
        
        const originalText = element.getAttribute('data-original-text');
        
        // If the user chooses English, load the original content directly without unnecessary API network overhead
        if (lang === 'en') {
            element.textContent = originalText;
            return;
        }

        element.textContent = "..."; // Display loading state indicator placeholders
        const translatedResult = await translateText(originalText, lang);
        element.textContent = translatedResult;
    });

    await Promise.all(translationPromises);
    document.documentElement.lang = getApiLangCode(lang);
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
