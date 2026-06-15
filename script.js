const body = document.body;
const langToggle = document.getElementById('langToggle');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const year = document.getElementById('year');

if (year) year.textContent = new Date().getFullYear();

function setLang(lang) {
  const isEn = lang === 'en';
  body.classList.toggle('lang-en', isEn);
  document.documentElement.lang = isEn ? 'en' : 'zh-CN';
  if (langToggle) langToggle.textContent = isEn ? '简体中文' : 'English';
  document.querySelectorAll('[data-zh][data-en]').forEach(el => {
    el.textContent = isEn ? el.dataset.en : el.dataset.zh;
  });
  localStorage.setItem('siteLang', lang);
}

if (langToggle) {
  langToggle.addEventListener('click', () => {
    setLang(body.classList.contains('lang-en') ? 'zh' : 'en');
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

setLang(localStorage.getItem('siteLang') || 'zh');


document.querySelectorAll('img[data-fallback]').forEach(img => {
  img.addEventListener('error', () => {
    const fallback = img.getAttribute('data-fallback');
    if (fallback && img.src !== fallback) {
      img.src = fallback;
      img.removeAttribute('data-fallback');
    }
  });
});
