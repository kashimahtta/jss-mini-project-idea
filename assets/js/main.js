document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button[type="submit"]');
      button.textContent = 'Message Sent ✓';
      button.disabled = true;
      form.reset();

      setTimeout(() => {
        button.textContent = 'Send Message';
        button.disabled = false;
      }, 2200);
    });
  }

  const navLinks = document.querySelectorAll('.nav a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });
});
