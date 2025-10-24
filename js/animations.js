// Shared animations for Mehdi's website
// Requires GSAP + ScrollTrigger loaded BEFORE this script
(function () {
  if (typeof gsap === 'undefined') {
    console.warn('GSAP not found — include GSAP and ScrollTrigger before animations.js');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // Page enter animation
  gsap.to('body', { opacity: 1, duration: 0.8, ease: 'power2.out' });

  // Fade/slide reveal for common selector
  function initReveals() {
    gsap.utils.toArray('.fade-in-up').forEach((el, i) => {
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: (el.dataset.delay ? parseFloat(el.dataset.delay) : i * 0.12),
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%'
          }
        }
      );
    });

    // simple stagger for cards container
    gsap.utils.toArray('.stagger-up').forEach(container => {
      gsap.from(container.children, {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 85%'
        }
      });
    });
  }

  initReveals();

  // Mobile nav toggle (works on pages that include elements with these IDs)
  function initMobileMenu() {
    const btn = document.getElementById('menuBtn');
    const panel = document.getElementById('mobilePanel');
    const openIcon = document.getElementById('menuOpen');
    const closeIcon = document.getElementById('menuClose');
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isOpen = !panel.classList.toggle('hidden');
      openIcon.classList.toggle('hidden', isOpen);
      closeIcon.classList.toggle('hidden', !isOpen);
      if (isOpen) {
        gsap.fromTo(panel, { y: -12, opacity: 0 }, { y: 0, opacity: 1, duration: 0.28 });
      }
    });

    // Close mobile nav on link click
    panel.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        panel.classList.add('hidden');
        openIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      });
    });
  }

  initMobileMenu();

  // Page transition: intercept internal link clicks and fade out before navigating
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    const target = a.getAttribute('target');
    // ignore external links and anchors and javascript:void and mailto and tel
    if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || a.hostname && a.hostname !== location.hostname) return;
    if (target === '_blank') return;

    // Only internal page navigation
    e.preventDefault();
    gsap.to('body', {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.inOut',
      onComplete: () => {
        window.location.href = href;
      }
    });
  });

  // Re-init reveals after AJAX/HTMX or dynamic content changes if needed
  window.MehdiAnimations = { initReveals };
})();
// Fade-in body
window.addEventListener('load', () => {
  gsap.to('body', { opacity: 1, duration: 0.8, ease: 'power2.out' });
});

// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const mobilePanel = document.getElementById('mobilePanel');
const menuOpen = document.getElementById('menuOpen');
const menuClose = document.getElementById('menuClose');
if(menuBtn){
  menuBtn.addEventListener('click', () => {
    mobilePanel.classList.toggle('hidden');
    menuOpen.classList.toggle('hidden');
    menuClose.classList.toggle('hidden');
  });
}

// Animate all cards on scroll
gsap.utils.toArray('.glass').forEach((card) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: 'top 80%',
    },
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power2.out'
  });
});

// Hover effects for cards/buttons using GSAP
gsap.utils.toArray('.btn-accent, .glass, .social-icon').forEach((el) => {
  el.addEventListener('mouseenter', () => {
    gsap.to(el, { scale: 1.05, boxShadow: '0 0 20px rgba(124,58,237,0.7)', duration: 0.3 });
  });
  el.addEventListener('mouseleave', () => {
    gsap.to(el, { scale: 1, boxShadow: '0 0 0 rgba(0,0,0,0)', duration: 0.3 });
  });
});
