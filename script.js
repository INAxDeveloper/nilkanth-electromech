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

// --- Contact form WhatsApp direct submission ---
let activeCompanyWhatsapp = '918469385282';

const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    const original = btn ? btn.innerHTML : 'Send Message';
    
    // Extract input values
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const serviceInput = document.getElementById('service');
    const messageInput = document.getElementById('message');

    const name = nameInput ? nameInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';
    const phone = phoneInput && phoneInput.value.trim() ? phoneInput.value.trim() : 'Not provided';
    const subject = subjectInput ? subjectInput.value.trim() : '';
    const service = serviceInput && serviceInput.value ? serviceInput.value : 'General Enquiry';
    const message = messageInput ? messageInput.value.trim() : '';

    // Clean destination WhatsApp phone number
    const targetDigits = (window.siteDataCompanyWhatsapp || activeCompanyWhatsapp).replace(/[^0-9]/g, '');
    const cleanPhone = targetDigits || '918469385282';

    // Build structured WhatsApp message
    const waText = 
`*New Enquiry - Nilkanth Electromech*
━━━━━━━━━━━━━━━━━━━━
👤 *Name:* ${name}
📧 *Email:* ${email}
📞 *Phone:* ${phone}
📌 *Subject:* ${subject}
⚙️ *Service Required:* ${service}

💬 *Message:*
${message}
━━━━━━━━━━━━━━━━━━━━
_Sent via website contact form_`;

    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(waText)}`;

    if(btn){
      btn.innerHTML = 'Connecting to WhatsApp... <i class="fab fa-whatsapp"></i>';
      btn.style.background = '#25d366';
      btn.disabled = true;
    }

    // Open WhatsApp in new tab / app
    setTimeout(() => {
      window.open(waUrl, '_blank');
      if(btn){
        btn.innerHTML = 'Opened in WhatsApp! <i class="fas fa-check"></i>';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.style.background = '';
          btn.disabled = false;
          contactForm.reset();
        }, 3000);
      }
    }, 400);
  });
}

// --- Dynamic Site Data Sync (Synchronizes with Admin Panel updates) ---
(function loadDynamicSiteData() {
  const fallbackData = {
    company: {
      email: "nilkanthelectromech@gmail.com",
      phone: "+91 84693 85282",
      address: "Plot No. 12, GIDC Industrial Estate, Surat, Gujarat 395006, India",
      social: {
        whatsapp: "https://wa.me/918469385282",
        facebook: "",
        instagram: "",
        linkedin: "",
        show_whatsapp: true,
        show_facebook: false,
        show_instagram: false,
        show_linkedin: false
      }
    }
  };

  function applyData(data) {
    if(!data) return;

    // Update Company info in Header / Footer / Contact
    if(data.company) {
      if(data.company.email) {
        document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
          el.href = 'mailto:' + data.company.email;
          if(el.textContent.includes('@')) el.childNodes.forEach(n => {
            if(n.nodeType === 3 && n.textContent.includes('@')) n.textContent = ' ' + data.company.email;
          });
        });
      }
      if(data.company.phone) {
        document.querySelectorAll('a[href^="tel:"]').forEach(el => {
          el.href = 'tel:' + data.company.phone.replace(/[^0-9+]/g, '');
        });
      }
      if(data.company.address) {
        document.querySelectorAll('.footer-contact span, .contact-detail p').forEach(el => {
          if(el.textContent.includes('Gujarat') || el.textContent.includes('Surat')) {
            el.textContent = data.company.address;
          }
        });
      }
      if(data.company.social) {
        const s = data.company.social;
        const platforms = ['facebook', 'instagram', 'linkedin', 'whatsapp'];

        platforms.forEach(p => {
          const url = s[p];
          const isShown = Boolean(s['show_' + p] === true && url && url !== '#' && url !== '');
          const cap = p.charAt(0).toUpperCase() + p.slice(1);
          const selector = `[data-social="${p}"], a[aria-label="${cap}"], a[href*="${p}"]`;

          document.querySelectorAll(selector).forEach(el => {
            if(el.classList.contains('floating-whatsapp')) return;
            if(isShown) {
              el.style.display = 'inline-flex';
              el.href = url;
            } else {
              el.style.display = 'none';
            }
          });
        });

        // Toggle parent social wrapper if all icons hidden
        document.querySelectorAll('.footer-social, .topbar-right').forEach(box => {
          const visible = Array.from(box.querySelectorAll('a')).filter(a => a.style.display !== 'none');
          box.style.display = visible.length > 0 ? '' : 'none';
        });

        if(s.whatsapp) {
          window.siteDataCompanyWhatsapp = s.whatsapp;
        }
      }
      if(!window.siteDataCompanyWhatsapp && data.company.phone) {
        window.siteDataCompanyWhatsapp = data.company.phone;
      }
    }
  }

  // 1. Immediately apply fallback data so icons hide even without server
  applyData(fallbackData);

  // 2. Check localStorage (updates made in Admin panel are instant in same browser)
  try {
    const cached = localStorage.getItem('nilkanth_site_data');
    if(cached) {
      const parsed = JSON.parse(cached);
      applyData(parsed);
    }
  } catch(e) {}

  // 3. Fetch remote / current site-data.json
  fetch('data/site-data.json?t=' + Date.now())
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if(data) applyData(data);
    })
    .catch(() => {});
})();

      // Update Products Page Grid if on products.html
      const productsPageGrid = document.querySelector('.products-page-grid');
      if(productsPageGrid && Array.isArray(data.products) && data.products.length > 0) {
        productsPageGrid.innerHTML = data.products.map(p => `
          <div class="product-page-card">
            <div class="product-img">
              <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='images/NE@2x.png'">
              <div class="product-overlay"></div>
            </div>
            <div class="product-info">
              <span class="product-category" style="display:inline-block;font-size:0.75rem;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--primary,#0056b3);margin-bottom:6px;">${p.category || 'Electrical Panel'}</span>
              <h3>${p.title}</h3>
              <p>${p.description}</p>
              <a href="contact.html?product=${encodeURIComponent(p.title)}" class="btn btn-primary btn-small">Enquire Now</a>
            </div>
          </div>
        `).join('');
      }

      // Update Products Home Grid if on index.html
      const homeProductsGrid = document.querySelector('.products-grid');
      if(homeProductsGrid && Array.isArray(data.products) && data.products.length > 0) {
        homeProductsGrid.innerHTML = data.products.slice(0, 6).map(p => `
          <div class="product-card">
            <div class="product-img">
              <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='images/NE@2x.png'">
              <div class="product-overlay">
                <a href="products.html" class="btn btn-small">View Details</a>
              </div>
            </div>
            <div class="product-info">
              <h3>${p.title}</h3>
              <p>${p.description}</p>
            </div>
          </div>
        `).join('');
      }
    })
    .catch(() => {
      // Fallback: static HTML already in place
    });
})();

