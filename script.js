// Greenfield Public School homepage interactions

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('.nav-link, .nav-contact');
const closeAnnouncement = document.getElementById('closeAnnouncement');
const announcementBar = document.getElementById('announcementBar');
const admissionForm = document.getElementById('admissionForm');
const formMessage = document.getElementById('formMessage');

// Mobile navigation
function closeMenu() {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
}

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  mainNav.classList.toggle('open', !isOpen);
});

navLinks.forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('click', (event) => {
  const clickedInsideNav = mainNav.contains(event.target) || menuToggle.contains(event.target);
  if (!clickedInsideNav) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

// Dismiss the admissions announcement
closeAnnouncement.addEventListener('click', () => {
  announcementBar.hidden = true;
});

// Update footer year automatically
document.getElementById('currentYear').textContent = new Date().getFullYear();

// Highlight the current section in the navigation while scrolling
const sections = document.querySelectorAll('main section[id], main section .container[id]');
if ('IntersectionObserver' in window) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      document.querySelectorAll('.nav-link').forEach((link) => {
        const active = link.getAttribute('href') === `#${id}`;
        link.classList.toggle('active', active);
      });
    });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

// A simple front-end enquiry form. Connect this handler to a backend/API to store submissions.
admissionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formMessage.classList.remove('error');

  if (!admissionForm.checkValidity()) {
    admissionForm.reportValidity();
    formMessage.textContent = 'Please complete all fields with valid information.';
    formMessage.classList.add('error');
    return;
  }

  const parentName = document.getElementById('parentName').value.trim();
  formMessage.textContent = `Thank you, ${parentName}. Your enquiry is ready. Connect this form to your school email or backend to receive submissions.`;
  admissionForm.reset();
});
