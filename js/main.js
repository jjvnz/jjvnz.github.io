document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    const langButtons = document.querySelectorAll('.language-switch button');
    let currentLang = 'en';

    // Mobile menu toggle
    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navList.classList.toggle('active');
        });
    }

    // Language switch
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.id.split('-')[1];
            if (lang !== currentLang) {
                currentLang = lang;
                updateLanguage(lang);
                updateActiveLanguageButton(lang);
            }
        });
    });

    // Initial language setup
    updateLanguage(currentLang);
    updateActiveLanguageButton(currentLang);

    // Function to update language
    async function updateLanguage(lang) {
        try {
            const response = await fetch(`lang/${lang}.json`);
            const translations = await response.json();
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                element.textContent = translations[key] || element.textContent;
            });
        } catch (error) {
            console.error('Error loading language file:', error);
        }
    }

    // Function to update active language button
    function updateActiveLanguageButton(lang) {
        langButtons.forEach(button => {
            button.classList.toggle('active', button.id === `lang-${lang}`);
        });
    }
});