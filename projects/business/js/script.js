document.addEventListener('DOMContentLoaded', () => {
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);

    document.querySelectorAll('.nav-link').forEach(link => {
      const section = document.querySelector(link.getAttribute('href'));
      if (section) {
        const top = section.offsetTop - 80;
        const bottom = top + section.offsetHeight;
        if (window.scrollY >= top && window.scrollY < bottom) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        const collapse = document.querySelector('.navbar-collapse');
        if (collapse.classList.contains('show')) {
          bootstrap.Collapse.getInstance(collapse)?.hide();
        }
      }
    });
  });

  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        let current = 0;
        const step = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current + (el.dataset.suffix || '');
        }, 40);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  document.getElementById('contact-form')?.addEventListener('submit', e => {
    e.preventDefault();
    alert('Thank you! Your message has been sent. We\'ll respond within 24 hours.');
    e.target.reset();
  });
});
