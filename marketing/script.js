const formMessages = {
  en: {
    sending: 'Sending…',
    thanks: "Thanks! I'll get back to you soon.",
    error: 'Something went wrong — please email office@cover24.app directly.',
  },
  de: {
    sending: 'Wird gesendet…',
    thanks: 'Danke! Ich melde mich bald bei Ihnen.',
    error: 'Etwas ist schiefgelaufen — bitte schreiben Sie direkt an office@cover24.app.',
  },
};
const messages = formMessages[document.documentElement.lang] || formMessages.en;

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  formStatus.textContent = messages.sending;
  try {
    const response = await fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    });
    if (response.ok) {
      formStatus.textContent = messages.thanks;
      contactForm.reset();
    } else {
      formStatus.textContent = messages.error;
    }
  } catch (err) {
    formStatus.textContent = messages.error;
  }
});

const menuToggle = document.getElementById('menu-toggle');
const sideNav = document.getElementById('side-nav');
const sideNavBackdrop = document.getElementById('side-nav-backdrop');

function setMenuOpen(open) {
  sideNav.classList.toggle('open', open);
  sideNav.setAttribute('aria-hidden', String(!open));
  sideNavBackdrop.hidden = !open;
  menuToggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
}

menuToggle.addEventListener('click', () => setMenuOpen(true));
document.getElementById('menu-close').addEventListener('click', () => setMenuOpen(false));
sideNavBackdrop.addEventListener('click', () => setMenuOpen(false));
sideNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') setMenuOpen(false);
});
window.matchMedia('(min-width: 641px)').addEventListener('change', (e) => {
  if (e.matches) setMenuOpen(false);
});

const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

const revealTargets = document.querySelectorAll('.feature-card');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('in-view'));
}
