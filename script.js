// ===== NILKANTH ELECTROMECH - MAIN JAVASCRIPT =====

// --- Header scroll effect ---
const header = document.getElementById('header');
if(header){
  window.addEventListener('scroll', () => {
    header.style.boxShadow = window.scrollY > 40 ? '0 4px 30px rgba(0,0,0,.15)' : '0 2px 20px rgba(0,0,0,.08)';
  });
}

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
if(hamburger && nav){
  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });
  document.addEventListener('click', (e) => {
    if(nav.classList.contains('open') && !nav.contains(e.target) && !hamburger.contains(e.target)){
      nav.classList.remove('open');
      hamburger.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// --- Hero Slider ---
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let heroIndex = 0, heroTimer;

function showSlide(idx){
  slides.forEach(s => s.classList.remove('active'));
  dots.forEach(d => d.classList.remove('active'));
  heroIndex = (idx + slides.length) % slides.length;
  if(slides[heroIndex]) slides[heroIndex].classList.add('active');
  if(dots[heroIndex]) dots[heroIndex].classList.add('active');
}

function startHeroTimer(){
  clearInterval(heroTimer);
  heroTimer = setInterval(() => showSlide(heroIndex + 1), 5000);
}

if(slides.length > 0){
  const prevBtn = document.getElementById('heroPrev');
  const nextBtn = document.getElementById('heroNext');
  if(prevBtn) prevBtn.addEventListener('click', () => { showSlide(heroIndex - 1); startHeroTimer(); });
  if(nextBtn) nextBtn.addEventListener('click', () => { showSlide(heroIndex + 1); startHeroTimer(); });
  dots.forEach(d => d.addEventListener('click', () => { showSlide(+d.dataset.index); startHeroTimer(); }));
  startHeroTimer();
}

// --- Counter animation ---
function animateCount(el){
  const target = +el.dataset.count;
  const suffix = el.querySelector('span') ? el.querySelector('span').textContent : '';
  const textNode = el.firstChild;
  let current = 0;
  const step = Math.ceil(target / 60);
  const interval = setInterval(() => {
    current = Math.min(current + step, target);
    el.firstChild.textContent = current;
    if(current >= target) clearInterval(interval);
  }, 25);
}

const counters = document.querySelectorAll('.stat-number[data-count]');
if(counters.length > 0){
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if(e.isIntersecting){ animateCount(e.target); observer.unobserve(e.target); }});
  }, { threshold: 0.5 });
  counters.forEach(c => observer.observe(c));
}

// --- Testimonial Slider ---
const tCards = document.querySelectorAll('.testimonial-card');
const tDots = document.querySelectorAll('.t-dot');
let tIndex = 0, tTimer;

function showTestimonial(idx){
  tCards.forEach(c => c.classList.remove('active'));
  tDots.forEach(d => d.classList.remove('active'));
  tIndex = (idx + tCards.length) % tCards.length;
  if(tCards[tIndex]) tCards[tIndex].classList.add('active');
  if(tDots[tIndex]) tDots[tIndex].classList.add('active');
}

if(tCards.length > 0){
  const tPrev = document.getElementById('tPrev');
  const tNext = document.getElementById('tNext');
  if(tPrev) tPrev.addEventListener('click', () => { showTestimonial(tIndex - 1); });
  if(tNext) tNext.addEventListener('click', () => { showTestimonial(tIndex + 1); });
  tDots.forEach(d => d.addEventListener('click', () => showTestimonial(+d.dataset.t)));
  tTimer = setInterval(() => showTestimonial(tIndex + 1), 5000);
}

// --- Scroll to top ---
const scrollTopBtn = document.getElementById('scrollTop');
if(scrollTopBtn){
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
  });
  scrollTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Scroll reveal animations ---
const revealEls = document.querySelectorAll('.product-card,.service-card,.why-item,.stat-item,.about-images,.about-text,.service-detail-card,.product-page-card');
if(revealEls.length > 0){
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if(e.isIntersecting){
        setTimeout(() => {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
        }, i * 80);
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity .5s ease, transform .5s ease';
    revealObserver.observe(el);
  });
}

// --- Contact form basic handling ---
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const original = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Message Sent!';
      btn.style.background = '#28a745';
      setTimeout(() => {
        btn.textContent = original;
        btn.style.background = '';
        btn.disabled = false;
        contactForm.reset();
      }, 3000);
    }, 1500);
  });
}
