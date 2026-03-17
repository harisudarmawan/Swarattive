/* ============================================
   SWARATTIVE — Site Data Loader
   Reads content from localStorage and applies
   to public pages. Backend-ready architecture.
   ============================================ */

// ========== DATA ACCESS LAYER ==========

const DEFAULTS = {
  home: {
    heroTitle1: 'Welcome to',
    heroTitle2: 'Swarattive',
    heroTitle3: 'Photography',
    heroSubtitle: 'Mengabadikan momen terindah dalam hidup Anda dengan sentuhan seni dan keindahan abadi.',
    heroBg: 'images/photo.png',
    heroBtn: 'Book Session',
    featuredTitle: 'Featured Sessions',
    featuredSubtitle: 'Pilihan sesi foto terbaik dari koleksi kami.',
    featuredItems: [
      { title: 'Prewedding Session', subtitle: 'Romantic & Timeless', image: 'images/photo.png' },
      { title: 'Wedding Ceremony', subtitle: 'Elegant Documentation', image: 'images/photo.png' },
      { title: 'Portrait Photography', subtitle: 'Beauty & Confidence', image: 'images/photo.png' },
      { title: 'Commercial Shoot', subtitle: 'Professional Branding', image: 'images/photo.png' }
    ],
    blogTitle: '5 Tips for Pre-Wedding Shoots',
    blogExcerpt: 'Dapatkan hasil foto pre-wedding yang memukau dengan persiapan yang tepat. Dari pemilihan lokasi hingga outfit yang cocok, semua dibahas lengkap di sini.',
    blogImage: 'images/photo.png'
  },
  portfolio: {
    bannerTitle: 'Portfolio',
    bannerSubtitle: 'Koleksi karya terbaik kami',
    bannerBg: 'images/photo.png',
    items: [
      { title: 'Wedding Day', category: 'wedding', image: 'images/photo.png' },
      { title: 'Portrait Session', category: 'portrait', image: 'images/photo.png' },
      { title: 'Brand Shoot', category: 'commercial', image: 'images/photo.png' },
      { title: 'Nature Beauty', category: 'nature', image: 'images/photo.png' },
      { title: 'Pre-Wedding', category: 'wedding', image: 'images/photo.png' },
      { title: 'Family Portrait', category: 'portrait', image: 'images/photo.png' },
      { title: 'Product Shoot', category: 'commercial', image: 'images/photo.png' },
      { title: 'Landscape', category: 'nature', image: 'images/photo.png' },
      { title: 'Ceremony', category: 'wedding', image: 'images/photo.png' }
    ]
  },
  service: {
    bannerTitle: 'Service',
    bannerSubtitle: 'Paket fotografi profesional untuk setiap kebutuhan',
    bannerBg: 'images/photo.png',
    packages: [
      {
        icon: '📷',
        name: 'The Essentials',
        subtitle: 'Basic Photography & Couple',
        features: ['1 Hour Session', '1 Location', '20 Edited Photos', 'Online Gallery'],
        price: 'Rp 2.5jt',
        priceNote: 'Starting price',
        featured: false
      },
      {
        icon: '🎞️',
        name: 'The Collection',
        subtitle: 'Premium Photography & Video',
        features: ['3 Hours Session', '2 Locations', '50 Edited Photos', 'Highlight Video', 'Photo Album'],
        price: 'Rp 7.5jt',
        priceNote: 'Most popular',
        featured: true
      },
      {
        icon: '✨',
        name: 'The Prestige',
        subtitle: 'Commercial & Custom',
        features: ['Full Day Session', 'Unlimited Locations', 'All Edited Photos', 'Cinematic Video', 'Premium Album', 'Custom Framing'],
        price: 'Rp 15jt+',
        priceNote: 'Fully customizable',
        featured: false
      }
    ],
    addons: ['Printed Photo Album', 'Extra Locations', 'Drone Footage', 'Same-Day Edit', 'Custom Framing']
  },
  about: {
    bannerTitle: 'About Us',
    bannerSubtitle: 'Kisah di balik lensa kami',
    bannerBg: 'images/photo.png',
    storyTitle: 'Our Story',
    storyImage: 'images/photo.png',
    storyP1: 'SWARATTIVE Photography lahir dari hasrat mendalam untuk mengabadikan keindahan dalam setiap momen kehidupan. Dimulai dari sebuah kamera sederhana dan mimpi besar, kami tumbuh menjadi studio fotografi yang dipercaya oleh ratusan pasangan dan brand.',
    storyP2: 'Dengan pengalaman lebih dari 8 tahun di industri fotografi, kami memahami bahwa setiap klien memiliki cerita unik yang layak diabadikan dengan cara yang istimewa. Kami menggabungkan seni visual dengan teknologi terkini untuk menciptakan karya yang timeless.',
    storyP3: 'Filosofi kami sederhana: setiap foto harus mampu membangkitkan emosi dan menceritakan kisah yang tak terlupakan.',
    btsItems: [
      { title: 'Pre-Production', subtitle: 'Concept & Planning', image: 'images/photo.png' },
      { title: 'On Location', subtitle: 'Shooting Day', image: 'images/photo.png' },
      { title: 'Post-Production', subtitle: 'Editing & Delivery', image: 'images/photo.png' }
    ],
    teamMembers: [
      { name: 'Andi Prasetyo', role: 'Lead Photographer', image: 'images/photo.png' },
      { name: 'Dewi Kusuma', role: 'Creative Director', image: 'images/photo.png' },
      { name: 'Rina Wulandari', role: 'Photo Editor', image: 'images/photo.png' },
      { name: 'Budi Hartono', role: 'Videographer', image: 'images/photo.png' }
    ]
  },
  blog: {
    bannerTitle: 'Blog',
    bannerSubtitle: 'Tips, inspirasi, dan cerita di balik lensa',
    bannerBg: 'images/photo.png',
    posts: [
      { image: 'images/photo.png', title: '5 Tips for Pre-Wedding Shoots', meta: 'Photography Tips • 10 Mar 2026', excerpt: 'Dapatkan hasil foto pre-wedding yang memukau dengan persiapan yang tepat. Dari pemilihan lokasi hingga outfit yang cocok.' },
      { image: 'images/photo.png', title: 'The Art of Light in Portraits', meta: 'Technique • 5 Mar 2026', excerpt: 'Pelajari bagaimana pencahayaan alami dan buatan dapat mengubah foto portrait biasa menjadi karya seni yang luar biasa.' },
      { image: 'images/photo.png', title: 'Commercial Photography for Small Businesses', meta: 'Business • 28 Feb 2026', excerpt: 'Kenapa investasi di fotografi komersial profesional penting untuk pertumbuhan bisnis kecil dan menengah.' },
      { image: 'images/photo.png', title: 'Best Wedding Venues in Jakarta', meta: 'Inspiration • 20 Feb 2026', excerpt: 'Rekomendasi venue pernikahan terbaik di Jakarta yang sempurna untuk sesi foto wedding impian Anda.' },
      { image: 'images/photo.png', title: 'A Day in the Life of a Photographer', meta: 'Behind the Scenes • 15 Feb 2026', excerpt: 'Ikuti perjalanan sehari penuh bersama fotografer kami, dari persiapan hingga proses editing yang detail.' },
      { image: 'images/photo.png', title: 'Choosing the Right Photography Package', meta: 'Guide • 10 Feb 2026', excerpt: 'Panduan lengkap memilih paket fotografi yang tepat sesuai kebutuhan dan budget Anda.' }
    ]
  },
  contact: {
    bannerTitle: 'Contact',
    bannerSubtitle: 'Hubungi kami untuk konsultasi',
    bannerBg: 'images/photo.png',
    address: 'Jl. Sudirman No. 123, Jakarta Selatan',
    phone: '+62 812 3456 7890',
    email: 'hello@swarattive.com',
    hours: 'Senin - Sabtu: 09:00 - 18:00'
  },
  booking: {
    bannerTitle: 'Booking',
    bannerSubtitle: 'Pesan sesi fotografi impian Anda',
    bannerBg: 'images/photo.png',
    services: [
      { value: 'wedding', label: 'Wedding Photography', price: 'Rp 15jt+' },
      { value: 'prewedding', label: 'Pre-Wedding', price: 'Rp 7.5jt' },
      { value: 'portrait', label: 'Portrait Session', price: 'Rp 2.5jt' },
      { value: 'commercial', label: 'Commercial Shoot', price: 'Rp 5jt+' },
      { value: 'event', label: 'Event Documentation', price: 'Rp 3.5jt' }
    ],
    locations: [
      { value: 'studio', label: 'Studio' },
      { value: 'outdoor', label: 'Outdoor' },
      { value: 'venue', label: 'Venue' },
      { value: 'custom', label: 'Custom Location' }
    ],
    packages: [
      { value: 'essentials', label: 'The Essentials — Rp 2.5jt' },
      { value: 'collection', label: 'The Collection — Rp 7.5jt' },
      { value: 'prestige', label: 'The Prestige — Rp 15jt+' }
    ],
    payments: [
      { label: 'Bank Mandiri', value: '123-456-789-0' },
      { label: 'BCA', value: '098-765-432-1' },
      { label: 'OVO / DANA', value: '0812-3456-7890' }
    ]
  },
  footer: {
    description: 'Swarattive Photography — Mengabadikan setiap momen berharga dengan sentuhan seni yang tak lekang oleh waktu.',
    copyright: '© 2026 SWARATTIVE Photography. All rights reserved.',
    igUrl: '#',
    fbUrl: '#',
    ytUrl: '#',
    tkUrl: '#',
    email: 'hello@swarattive.com',
    phone: '+62 812 3456 7890',
    location: 'Jakarta, Indonesia'
  }
};

function loadSiteData(key) {
  const raw = localStorage.getItem('swr_' + key);
  if (!raw) return DEFAULTS[key] || null;
  try {
    const parsed = JSON.parse(raw);
    // Deep merge or at least ensure critical arrays exist
    if (key === 'booking') {
      return {
        ...DEFAULTS.booking,
        ...parsed,
        services: (parsed.services && parsed.services.length > 0) ? parsed.services : DEFAULTS.booking.services,
        packages: (parsed.packages && parsed.packages.length > 0) ? parsed.packages : DEFAULTS.booking.packages,
        locations: (parsed.locations && parsed.locations.length > 0) ? parsed.locations : DEFAULTS.booking.locations,
        payments: (parsed.payments && parsed.payments.length > 0) ? parsed.payments : DEFAULTS.booking.payments
      };
    }
    if (key === 'about') {
      return {
        ...DEFAULTS.about,
        ...parsed,
        teamMembers: (parsed.teamMembers && parsed.teamMembers.length > 0) ? parsed.teamMembers : DEFAULTS.about.teamMembers
      };
    }
    return { ...DEFAULTS[key], ...parsed };
  } catch (e) {
    return DEFAULTS[key] || null;
  }
}

// ========== AUTO-APPLY ON PAGE LOAD ==========

document.addEventListener('DOMContentLoaded', () => {
  const page = detectPage();
  applyFooterData();

  switch (page) {
    case 'index': applyHomeData(); break;
    case 'portfolio': applyPortfolioData(); break;
    case 'service': applyServiceData(); break;
    case 'about': applyAboutData(); break;
    case 'blog': applyBlogData(); break;
    case 'contact': applyContactData(); break;
    case 'booking': applyBookingData(); break;
    case 'check-booking': break; // no dynamic content needed
  }
});

function detectPage() {
  const path = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
  return path;
}

// ========== HOME ==========

function applyHomeData() {
  const data = loadSiteData('home');
  if (!data) return;

  const heroH1 = document.querySelector('.hero__content h1');
  if (heroH1 && data.heroTitle1 !== undefined) {
    heroH1.innerHTML = `${esc(data.heroTitle1)}<br>${esc(data.heroTitle2)}<br>${esc(data.heroTitle3)}`;
  }

  setText('.hero__content p', data.heroSubtitle);
  setText('.hero__content .btn', data.heroBtn);
  if (data.heroBg) setImg('.hero__bg', data.heroBg);

  setText('.featured .section-title h2', data.featuredTitle);
  setText('.featured .section-title p', data.featuredSubtitle);

  // Featured items
  if (data.featuredItems) {
    const grid = document.querySelector('.featured__grid');
    if (grid) {
      grid.innerHTML = '';
      data.featuredItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'featured__card animate-in visible';
        card.innerHTML = `
          <img src="${esc(item.image || 'images/photo.png')}" alt="${esc(item.title)}">
          <div class="featured__card__overlay">
            <h4>${esc(item.title)}</h4>
            <p>${esc(item.subtitle)}</p>
          </div>
        `;
        grid.appendChild(card);
      });
    }
  }

  // Latest blog on home
  setText('.latest-blog__text h3', data.blogTitle);
  setText('.latest-blog__text p', data.blogExcerpt);
  if (data.blogImage) setImg('.latest-blog__image', data.blogImage);
}

// ========== PORTFOLIO ==========

function applyPortfolioData() {
  const data = loadSiteData('portfolio');
  if (!data) return;

  setText('.page-banner__content h1', data.bannerTitle);
  setText('.page-banner__content p', data.bannerSubtitle);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);

  if (data.items) {
    const gallery = document.getElementById('portfolioGallery');
    if (gallery) {
      gallery.innerHTML = '';
      data.items.forEach((item, i) => {
        const tall = (i === 1 || i === 7) ? ' tall' : '';
        const div = document.createElement('div');
        div.className = `portfolio__item${tall} animate-in visible`;
        div.dataset.category = item.category;
        div.innerHTML = `
          <img src="${esc(item.image || 'images/photo.png')}" alt="${esc(item.title)}">
          <div class="portfolio__item__overlay"><span>${esc(item.title)}</span></div>
        `;
        gallery.appendChild(div);
      });

      // Re-init portfolio filter for new items
      reinitPortfolioFilter();
    }
  }
}

function reinitPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.portfolio__filters button');
  const items = document.querySelectorAll('.portfolio__item');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      items.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// ========== SERVICE ==========

function applyServiceData() {
  const data = loadSiteData('service');
  if (!data) return;

  setText('.page-banner__content h1', data.bannerTitle);
  setText('.page-banner__content p', data.bannerSubtitle);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);

  if (data.packages) {
    const container = document.querySelector('.service__packages');
    if (container) {
      container.innerHTML = '';
      data.packages.forEach(pkg => {
        const card = document.createElement('div');
        card.className = `service__card${pkg.featured ? ' featured' : ''} animate-in visible`;
        card.innerHTML = `
          <div class="service__card__icon">${pkg.icon}</div>
          <h3>${esc(pkg.name)}</h3>
          <p class="subtitle">${esc(pkg.subtitle)}</p>
          <ul class="service__card__features">
            ${(pkg.features || []).map(f => `<li>${esc(f)}</li>`).join('')}
          </ul>
          <div class="price">${esc(pkg.price)}</div>
          <p class="price-note">${esc(pkg.priceNote)}</p>
        `;
        container.appendChild(card);
      });
    }
  }

  if (data.addons) {
    const addonGrid = document.querySelector('.service__extras__grid');
    if (addonGrid) {
      addonGrid.innerHTML = '';
      data.addons.forEach(addon => {
        const li = document.createElement('li');
        li.textContent = addon;
        addonGrid.appendChild(li);
      });
    }
  }
}

// ========== ABOUT ==========

function applyAboutData() {
  const data = loadSiteData('about');
  if (!data) return;

  setText('.page-banner__content h1', data.bannerTitle);
  setText('.page-banner__content p', data.bannerSubtitle);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);
  setText('.about__hero-text h2', data.storyTitle);
  if (data.storyImage) setImg('.about__hero-image', data.storyImage);

  const storyPs = document.querySelectorAll('.about__hero-text p');
  if (storyPs.length >= 3) {
    if (data.storyP1) storyPs[0].textContent = data.storyP1;
    if (data.storyP2) storyPs[1].textContent = data.storyP2;
    if (data.storyP3) storyPs[2].textContent = data.storyP3;
  }

  // BTS items
  if (data.btsItems) {
    const btsCards = document.querySelectorAll('.about-page ~ .section .featured__card');
    data.btsItems.forEach((item, i) => {
      if (btsCards[i]) {
        const img = btsCards[i].querySelector('img');
        if (img && item.image) img.src = item.image;
        const h4 = btsCards[i].querySelector('h4');
        const p = btsCards[i].querySelector('p');
        if (h4) h4.textContent = item.title;
        if (p) p.textContent = item.subtitle;
      }
    });
  }

  // Team members
  if (data.teamMembers) {
    const teamGrid = document.querySelector('.team__grid');
    if (teamGrid) {
      teamGrid.innerHTML = '';
      data.teamMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'team__card animate-in visible';
        card.innerHTML = `
          <div class="team__card-image"><img src="${esc(member.image || 'images/photo.png')}" alt="${esc(member.name)}"></div>
          <div class="team__card-info">
            <h4>${esc(member.name)}</h4>
            <p>${esc(member.role)}</p>
          </div>
        `;
        teamGrid.appendChild(card);
      });
    }
  }
}

// ========== BLOG ==========

function applyBlogData() {
  const data = loadSiteData('blog');
  if (!data) return;

  setText('.page-banner__content h1', data.bannerTitle);
  setText('.page-banner__content p', data.bannerSubtitle);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);

  if (data.posts) {
    const grid = document.querySelector('.blog__grid');
    if (grid) {
      grid.innerHTML = '';
      data.posts.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog__card animate-in visible';
        card.innerHTML = `
          <div class="blog__card-image"><img src="${esc(post.image || 'images/photo.png')}" alt="${esc(post.title)}"></div>
          <div class="blog__card-content">
            <div class="blog__card-meta">${esc(post.meta)}</div>
            <h3>${esc(post.title)}</h3>
            <p>${esc(post.excerpt)}</p>
            <a href="#" class="read-more">Read More</a>
          </div>
        `;
        grid.appendChild(card);
      });
    }
  }
}

// ========== CONTACT ==========

function applyContactData() {
  const data = loadSiteData('contact');
  if (!data) return;

  setText('.page-banner__content h1', data.bannerTitle);
  setText('.page-banner__content p', data.bannerSubtitle);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);

  // Contact info items
  const infoItems = document.querySelectorAll('.contact__info-item');
  if (infoItems.length >= 4) {
    const addressP = infoItems[0].querySelector('p');
    const phoneP = infoItems[1].querySelector('p');
    const emailP = infoItems[2].querySelector('p');
    const hoursP = infoItems[3].querySelector('p');
    if (addressP && data.address) addressP.textContent = data.address;
    if (phoneP && data.phone) phoneP.textContent = data.phone;
    if (emailP && data.email) emailP.textContent = data.email;
    if (hoursP && data.hours) hoursP.textContent = data.hours;
  }
}

// ========== BOOKING ==========

function applyBookingData() {
  const data = loadSiteData('booking');
  const aboutData = loadSiteData('about'); // for team/barber
  if (!data) return;

  setText('.page-banner__content h1', data.bannerTitle);
  setText('.page-banner__content p', data.bannerSubtitle);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);
  if (data.bannerBg) setImg('.page-banner__bg', data.bannerBg);

  // 1. Services Grid
  const servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid && data.services) {
    servicesGrid.innerHTML = '';
    data.services.forEach(s => {
      if (!s || !s.label) return;
      // Find price info from service section if available
      const serviceData = loadSiteData('service');
      const pkgInfo = (serviceData?.packages || []).find(pkg => {
        if (!pkg.name) return false;
        return pkg.name.toLowerCase().includes(s.label.toLowerCase());
      }) || {};

      const card = document.createElement('div');
      card.className = 'selection-card';
      card.dataset.value = s.value;
      card.dataset.label = s.label;
      card.dataset.price = s.price || pkgInfo.price || 'Rp 0';

      card.innerHTML = `
        <div class="selection-card__info">
          <div class="selection-card__content">
            <h4>${esc(s.label)}</h4>
            <p>${esc(pkgInfo.subtitle || 'Paket fotografi profesional')}</p>
          </div>
        </div>
        <div class="selection-card__footer">
          <div class="selection-card__time"><i class="far fa-clock"></i> 60-120 menit</div>
          <div class="selection-card__price">${esc(s.price || pkgInfo.price || 'Rp 0')}</div>
        </div>
      `;
      card.addEventListener('click', () => {
        document.querySelectorAll('#servicesGrid .selection-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        if (typeof updateBookingSummary === 'function') updateBookingSummary();
      });
      servicesGrid.appendChild(card);
    });
  }

  // 2. Team/Barber Grid (from About section)
  const teamGrid = document.getElementById('teamGrid');
  if (teamGrid && aboutData?.teamMembers) {
    teamGrid.innerHTML = '';
    aboutData.teamMembers.forEach(m => {
      const card = document.createElement('div');
      card.className = 'selection-card';
      card.dataset.label = m.name;
      card.innerHTML = `
        <div class="selection-card__info">
          <img src="${esc(m.image || 'images/photo.png')}" class="selection-card__img" alt="${esc(m.name)}">
          <div class="selection-card__content">
            <h4>${esc(m.name)}</h4>
            <p>${esc(m.role)}</p>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        document.querySelectorAll('#teamGrid .selection-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        if (typeof updateBookingSummary === 'function') updateBookingSummary();
      });
      teamGrid.appendChild(card);
    });
  }

  // 3. Payment Methods Grid
  const paymentsGrid = document.getElementById('paymentsGrid');
  if (paymentsGrid && data.payments) {
    paymentsGrid.innerHTML = '';
    data.payments.forEach(p => {
      const card = document.createElement('div');
      card.className = 'payment-card';
      card.dataset.value = p.value;
      card.dataset.label = p.label;
      card.innerHTML = `
        <h5>${esc(p.label)}</h5>
        <p>Transfer ke nomor rekening:</p>
        <span class="acc-num">${esc(p.value)}</span>
      `;
      card.addEventListener('click', () => {
        document.querySelectorAll('#paymentsGrid .payment-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        if (typeof updateBookingSummary === 'function') updateBookingSummary();
      });
      paymentsGrid.appendChild(card);
    });
  }
}

// ========== FOOTER (applies on all pages) ==========

function applyFooterData() {
  const data = loadSiteData('footer');
  if (!data) return;

  // Footer description
  const footerDesc = document.querySelector('.footer__desc');
  if (footerDesc && data.description) footerDesc.textContent = data.description;

  // Copyright
  const footerBottom = document.querySelector('.footer__bottom p');
  if (footerBottom && data.copyright) footerBottom.textContent = data.copyright;

  // Social links
  const socialLinks = document.querySelectorAll('.footer__social a');
  if (socialLinks.length >= 3) {
    if (data.igUrl) socialLinks[0].href = data.igUrl;
    if (data.fbUrl) socialLinks[1].href = data.fbUrl;
    if (data.ytUrl) socialLinks[2].href = data.ytUrl;
    if (socialLinks[3] && data.tkUrl) socialLinks[3].href = data.tkUrl;
  }

  // Footer contact
  const footerContact = document.querySelectorAll('.footer__contact li span:last-child');
  if (footerContact.length >= 3) {
    if (data.email) footerContact[0].textContent = data.email;
    if (data.phone) footerContact[1].textContent = data.phone;
    if (data.location) footerContact[2].textContent = data.location;
  }
}

// ========== UTILITY ==========

function setImg(selector, src) {
  if (!src) return;
  const el = document.querySelector(selector);
  if (el) {
    if (el.tagName === 'IMG') el.src = src;
    else {
      const img = el.querySelector('img');
      if (img) img.src = src;
    }
  }
}

function setText(selector, text) {
  if (!text) return;
  const el = document.querySelector(selector);
  if (el) el.textContent = text;
}

function esc(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
