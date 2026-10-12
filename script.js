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

// --- Hero Automatic Slider ---
let heroIndex = 0, heroTimer = null;
function setupHeroSlider(){
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot');
  if(!slides.length) return;

  if(heroTimer) {
    clearInterval(heroTimer);
    heroTimer = null;
  }

  function showSlide(idx){
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    heroIndex = (idx + slides.length) % slides.length;
    if(slides[heroIndex]) slides[heroIndex].classList.add('active');
    if(dots[heroIndex]) dots[heroIndex].classList.add('active');
  }

  function startHeroTimer(){
    if(heroTimer) clearInterval(heroTimer);
    if(slides.length > 1){
      heroTimer = setInterval(() => {
        showSlide(heroIndex + 1);
      }, 4000); // Auto-slides smoothly every 4 seconds
    }
  }

  // Dots click handler
  dots.forEach(d => {
    d.onclick = () => {
      showSlide(+d.dataset.index);
      startHeroTimer();
    };
  });

  // Pause on hover, resume on leave
  const heroEl = document.getElementById('hero');
  if(heroEl){
    heroEl.onmouseenter = () => { if(heroTimer) clearInterval(heroTimer); };
    heroEl.onmouseleave = () => { startHeroTimer(); };
  }

  // Ensure active class on slide 0 if none active
  if(!document.querySelector('.hero-slide.active') && slides[0]){
    slides[0].classList.add('active');
    if(dots[0]) dots[0].classList.add('active');
  }

  startHeroTimer();
}
setupHeroSlider();

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
let tIndex = 0, tTimer;
function setupTestimonialSlider(){
  const tCards = document.querySelectorAll('.testimonial-card');
  const tDots = document.querySelectorAll('.t-dot');
  if(!tCards.length) return;
  clearInterval(tTimer);

  function showTestimonial(idx){
    tCards.forEach(c => c.classList.remove('active'));
    tDots.forEach(d => d.classList.remove('active'));
    tIndex = (idx + tCards.length) % tCards.length;
    if(tCards[tIndex]) tCards[tIndex].classList.add('active');
    if(tDots[tIndex]) tDots[tIndex].classList.add('active');
  }

  const tPrev = document.getElementById('tPrev');
  const tNext = document.getElementById('tNext');
  if(tPrev) tPrev.onclick = () => { showTestimonial(tIndex - 1); resetTTimer(); };
  if(tNext) tNext.onclick = () => { showTestimonial(tIndex + 1); resetTTimer(); };
  tDots.forEach(d => {
    d.onclick = () => { showTestimonial(+d.dataset.t); resetTTimer(); };
  });

  function resetTTimer(){
    clearInterval(tTimer);
    tTimer = setInterval(() => showTestimonial(tIndex + 1), 5000);
  }
  resetTTimer();
}
setupTestimonialSlider();

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
      if(data.company.logo || data.company.logoFull) {
        const logoSrc = data.company.logo || data.company.logoFull;
        document.querySelectorAll('.logo img, .footer-logo-wrap img').forEach(img => {
          img.src = logoSrc;
        });
      }
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
      if(!window.siteDataCompanyWhatsapp && data.company && data.company.phone) {
        window.siteDataCompanyWhatsapp = data.company.phone;
      }
    }

    // Update Products Page Grid if on products.html
    const productsPageGrid = document.querySelector('.products-page-grid');
    if(productsPageGrid && Array.isArray(data.products) && data.products.length > 0) {
      productsPageGrid.innerHTML = data.products.map(p => `
        <div class="product-page-card">
          <div class="product-img">
            <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='images/logo-full.png'">
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
            <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.src='images/logo-full.png'">
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

    // Update Hero Slides on index.html if on homepage and data.hero exists
    const heroSlidesWrap = document.querySelector('.hero-slides');
    if(heroSlidesWrap && Array.isArray(data.hero) && data.hero.length > 0) {
      const defaultImages = [
        'images/APFC_NEW_2-1200x675.jpg',
        'images/MCC_1-1200x541.jpg',
        'images/fabrication_work-1200x675.jpg'
      ];
      heroSlidesWrap.innerHTML = data.hero.map((slide, i) => `
        <div class="hero-slide ${i === 0 ? 'active' : ''}" style="background-image:url('${slide.image || defaultImages[i % defaultImages.length]}')">
          <div class="hero-overlay"></div>
          <div class="hero-content container">
            ${slide.badge ? `<span class="hero-tag">${slide.badge}</span>` : ''}
            <h1>${(slide.title || '').replace(/\n/g, '<br>')}</h1>
            <p>${slide.subtitle || ''}</p>
            <div class="hero-btns">
              ${slide.btnText ? `<a href="${slide.btnLink || 'products.html'}" class="btn btn-primary">${slide.btnText}</a>` : ''}
              ${slide.btnSecondaryText ? `<a href="${slide.btnSecondaryLink || 'contact.html'}" class="btn btn-outline-white">${slide.btnSecondaryText}</a>` : ''}
            </div>
            ${i === 0 ? `
            <div class="hero-trust-badges">
              <div class="trust-badge-item"><i class="fas fa-certificate"></i> "CPRI" Certified Switchboard Manufacturer</div>
              <div class="trust-badge-item"><i class="fas fa-stamp"></i> Gov. Approved Licence Electrical Contractor</div>
              <div class="trust-badge-item"><i class="fas fa-shield-alt"></i> 100% Quality &amp; Safety Tested</div>
            </div>` : ''}
          </div>
        </div>
      `).join('');

      const heroDotsWrap = document.getElementById('heroDots');
      if(heroDotsWrap) {
        heroDotsWrap.innerHTML = data.hero.map((_, i) => `
          <span class="dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>
        `).join('');
      }

      setupHeroSlider();
    }

    // Update Testimonials / Trust Our Clients on index.html
    const tWrapper = document.querySelector('.testimonial-wrapper');
    if(tWrapper && Array.isArray(data.testimonials) && data.testimonials.length > 0) {
      tWrapper.innerHTML = `
        ${data.testimonials.map((t, idx) => `
          <div class="testimonial-card ${idx === 0 ? 'active' : ''}" id="tCard${idx}">
            <div class="quote-icon"><i class="fas fa-quote-left"></i></div>
            <p>"${t.quote}"</p>
            <div class="testimonial-author">
              <div class="author-avatar"><i class="fas fa-user"></i></div>
              <div><strong>${t.name}</strong><span>${t.role}</span></div>
            </div>
            <div class="stars">
              ${Array.from({length: t.rating || 5}).map(() => '<i class="fas fa-star"></i>').join('')}
            </div>
          </div>
        `).join('')}
        <div class="t-nav">
          <button id="tPrev" aria-label="Previous Review"><i class="fas fa-chevron-left"></i></button>
          <div class="testimonial-dots">
            ${data.testimonials.map((_, idx) => `<span class="t-dot ${idx === 0 ? 'active' : ''}" data-t="${idx}"></span>`).join('')}
          </div>
          <button id="tNext" aria-label="Next Review"><i class="fas fa-chevron-right"></i></button>
        </div>
      `;
      setupTestimonialSlider();
    }
  }

  // 1. Immediately apply fallback data
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

