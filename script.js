
document.addEventListener('DOMContentLoaded', () => {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');
  burger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('open');
  });

  const languageSwitcher = document.getElementById('language-switcher');
  let translations = {};

  fetch('languages.json')
    .then(res => res.json())
    .then(data => {
      translations = data;
      applyTranslations(languageSwitcher.value);
    });

  function applyTranslations(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (translations[lang] && translations[lang][key]) {
        el.innerHTML = translations[lang][key];
      }
    });
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const key = el.dataset.i18nAlt;
      if (translations[lang] && translations[lang][key]) {
        el.alt = translations[lang][key];
      }
    });
  }

  languageSwitcher.addEventListener('change', () => {
    applyTranslations(languageSwitcher.value);
  });
});
