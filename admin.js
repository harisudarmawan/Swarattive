/* ============================================
   SWARATTIVE Admin Dashboard — JavaScript
   Backend-Ready Data Access Layer
   ============================================ */

// ========== DATA ACCESS LAYER ==========
// Ganti fungsi ini saja untuk migrasi ke backend API

function saveData(key, data) {
  localStorage.setItem('swr_' + key, JSON.stringify(data));
}

function loadData(key) {
  const raw = localStorage.getItem('swr_' + key);
  return raw ? JSON.parse(raw) : null;
}

// ========== DEFAULT DATA ==========

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

// ========== INITIALIZATION ==========

document.addEventListener('DOMContentLoaded', () => {
  initLogin();
  initSidebar();
  initMobileToggle();
  loadAllSections();
  initTheme();
  initImageUpload();
  updatePreviewsAfterLoad();
});

// ========== LOGIN ==========

function initLogin() {
  const overlay = document.getElementById('loginOverlay');
  const layout = document.getElementById('adminLayout');
  const loginBtn = document.getElementById('loginBtn');
  const loginPw = document.getElementById('loginPassword');
  const loginErr = document.getElementById('loginError');

  // Check if already logged in
  if (sessionStorage.getItem('swr_admin_logged') === 'true') {
    overlay.classList.add('hidden');
    layout.classList.add('visible');
    return;
  }

  function attemptLogin() {
    const pw = loginPw.value;
    if (pw === 'admin123') {
      sessionStorage.setItem('swr_admin_logged', 'true');
      overlay.classList.add('hidden');
      setTimeout(() => layout.classList.add('visible'), 300);
      loginErr.classList.remove('show');
    } else {
      loginErr.classList.add('show');
      loginPw.value = '';
      loginPw.focus();
    }
  }

  loginBtn.addEventListener('click', attemptLogin);
  loginPw.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') attemptLogin();
  });
}

// ========== SIDEBAR NAVIGATION ==========

function initSidebar() {
  const navLinks = document.querySelectorAll('.admin-sidebar__nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const section = link.dataset.section;

      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
      const target = document.getElementById('section-' + section);
      if (target) target.classList.add('active');

      // Update header
      const header = target ? target.querySelector('.admin-main__header') : null;

      // Close mobile sidebar
      document.getElementById('adminSidebar').classList.remove('open');
    });
  });
}

function initMobileToggle() {
  const toggle = document.getElementById('mobileToggle');
  const sidebar = document.getElementById('adminSidebar');
  if (toggle) {
    toggle.addEventListener('click', () => sidebar.classList.toggle('open'));
  }
}

// ========== LOAD ALL SECTIONS ==========

function loadAllSections() {
  loadOverviewDashboard();
  loadHome();
  loadPortfolio();
  loadService();
  loadAbout();
  loadBlog();
  loadContact();
  loadBooking();
  loadFooter();
  loadDataBooking();
}

function getData(section) {
  const raw = loadData(section);
  if (!raw) return DEFAULTS[section] || {};
  // Safety merge
  if (Array.isArray(DEFAULTS[section]?.items) && !raw.items) raw.items = DEFAULTS[section].items;
  if (Array.isArray(DEFAULTS[section]?.featuredItems) && !raw.featuredItems) raw.featuredItems = DEFAULTS[section].featuredItems;
  if (section === 'booking') {
    if (!raw.services || raw.services.length === 0) raw.services = DEFAULTS.booking.services;
    if (!raw.payments || raw.payments.length === 0) raw.payments = DEFAULTS.booking.payments;
  }
  return { ...DEFAULTS[section], ...raw };
}

// ========== OVERVIEW DASHBOARD ==========
let overviewChart = null;

function loadOverviewDashboard() {
  let bookings = JSON.parse(localStorage.getItem('swr_bookings')) || [];

  // 1. Calculate Stats
  let totalRevenue = 0;
  let totalBooking = bookings.length;
  let waitingPayment = 0;
  let waitingVerify = 0;
  let confirmed = 0;
  let completed = 0;
  let rejected = 0;
  let expired = 0;

  bookings.forEach(b => {
    // Tally by status (Mapping custom SWARATTIVE statuses to the screenshot's statuses)
    // Map: 'Booking Diterima' -> Menunggu Verifikasi
    // Map: 'Confirmed', 'Photo Session', 'Editing Process', 'Gallery Ready' -> Terkonfirmasi
    // Map: 'Completed' -> Selesai
    const s = b.status || '';
    if (s === 'Booking Diterima') waitingVerify++;
    else if (s === 'Completed') {
      completed++;
      // Parse price roughly from package (e.g. "The Collection — Rp 7.5jt" -> 7500000)
      if (b.package && b.package.includes('Rp')) {
        let priceStr = b.package.split('Rp')[1].trim();
        if (priceStr.includes('jt')) {
          let num = parseFloat(priceStr.replace('jt', '').replace('+', ''));
          totalRevenue += (num * 1000000);
        } else if (priceStr.includes('.')) {
          let num = parseInt(priceStr.replace(/\./g, ''));
          totalRevenue += num;
        }
      }
    }
    else if (['Confirmed', 'Photo Session', 'Editing Process', 'Gallery Ready'].includes(s)) confirmed++;

    // As per screenshot statuses, we'll keep the others 0 for now unless added
  });

  document.getElementById('ov-revenue').textContent = 'IDR ' + totalRevenue.toLocaleString('id-ID');
  document.getElementById('ov-total').textContent = totalBooking;
  document.getElementById('ov-payment').textContent = waitingPayment;
  document.getElementById('ov-verify').textContent = waitingVerify;
  document.getElementById('ov-confirmed').textContent = confirmed;
  document.getElementById('ov-completed').textContent = completed;
  document.getElementById('ov-rejected').textContent = rejected;
  document.getElementById('ov-expired').textContent = expired;

  // 2. Chart.js (Monthly Bookings)
  const ctx = document.getElementById('bookingChart');
  if (ctx && window.Chart) {
    if (overviewChart) overviewChart.destroy();

    // Generate last 12 months labels
    const months = [];
    const counts = [];
    const today = new Date();

    for (let i = 12; i >= 0; i--) {
      const d = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const label = d.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      months.push(label);
      counts.push(0);
    }

    // Tally bookings by month
    bookings.forEach(b => {
      if (!b.createdAt) return;
      const bDate = new Date(b.createdAt);
      const label = bDate.toLocaleString('en-US', { month: 'short', year: 'numeric' });
      const idx = months.indexOf(label);
      if (idx !== -1) {
        counts[idx]++;
      }
    });

    overviewChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Bookings',
          data: counts,
          borderColor: '#8B6F47',
          backgroundColor: 'rgba(139, 111, 71, 0.1)',
          borderWidth: 2,
          pointBackgroundColor: '#8B6F47',
          tension: 0.1,
          fill: false
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true, position: 'bottom' } },
        scales: {
          y: { beginAtZero: true, ticks: { precision: 0 } }
        }
      }
    });
  }

  // 3. Latest Bookings Table
  const tbody = document.getElementById('latest-bookings-tbody');
  if (tbody) {
    tbody.innerHTML = '';

    // Sort descending by creation date
    let sorted = [...bookings].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    let latest = sorted.slice(0, 10);

    if (latest.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#6b7280;padding:20px;">Belum ada data.</td></tr>';
      return;
    }

    latest.forEach(b => {
      const tr = document.createElement('tr');
      const dateStr = b.date ? new Date(b.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-';

      let priceDisplay = '-';
      if (b.package && b.package.includes('Rp')) {
        priceDisplay = 'Rp ' + b.package.split('Rp')[1].trim();
      }

      tr.innerHTML = `
        <td><strong>${b.id}</strong></td>
        <td>${b.name}</td>
        <td>${b.service}</td>
        <td>${dateStr}</td>
        <td><span class="status-badge">${b.status}</span></td>
        <td>${priceDisplay}</td>
      `;
      tbody.appendChild(tr);
    });
  }
}

// ---- HOME ----
function loadHome() {
  const data = getData('home');
  document.getElementById('home-hero-title1').value = data.heroTitle1 || '';
  document.getElementById('home-hero-title2').value = data.heroTitle2 || '';
  document.getElementById('home-hero-title3').value = data.heroTitle3 || '';
  document.getElementById('home-hero-subtitle').value = data.heroSubtitle || '';
  document.getElementById('home-hero-btn').value = data.heroBtn || '';
  document.getElementById('home-hero-bg').value = data.heroBg || 'images/photo.png';
  document.getElementById('home-blog-img').value = data.blogImage || 'images/photo.png';
  document.getElementById('home-featured-title').value = data.featuredTitle || '';
  document.getElementById('home-featured-subtitle').value = data.featuredSubtitle || '';
  document.getElementById('home-blog-title').value = data.blogTitle || '';
  document.getElementById('home-blog-excerpt').value = data.blogExcerpt || '';

  const container = document.getElementById('home-featured-items');
  container.innerHTML = '';
  (data.featuredItems || []).forEach((item, i) => {
    container.appendChild(createFeaturedItemHTML(i, item));
  });
}

function createFeaturedItemHTML(index, item) {
  const div = document.createElement('div');
  div.className = 'admin-repeatable';
  div.innerHTML = `
    <div class="admin-repeatable__header">
      <h4>Featured Item #${index + 1}</h4>
      <button class="admin-repeatable__remove" onclick="this.closest('.admin-repeatable').remove()">✕ Hapus</button>
    </div>
    <div class="admin-form-row">
      <div class="admin-form-group" style="grid-column: span 2;">
        <label>Image URL</label>
        <div class="admin-image-upload">
          <img class="admin-image-preview" src="${escHtml(item.image || 'images/photo.png')}" alt="Preview">
          <div class="admin-image-dropzone">
            <span>Seret & Jatuhkan berkas atau <strong>Jelajahi</strong></span>
            <input type="file" accept="image/*" class="admin-image-file">
            <input type="hidden" class="featured-img" value="${escHtml(item.image || 'images/photo.png')}">
          </div>
        </div>
      </div>
      <div class="admin-form-group">
        <label>Title</label>
        <input type="text" class="featured-title" value="${escHtml(item.title || '')}">
      </div>
      <div class="admin-form-group">
        <label>Subtitle</label>
        <input type="text" class="featured-subtitle" value="${escHtml(item.subtitle || '')}">
      </div>
    </div>
  `;
  return div;
}

function addFeaturedItem() {
  const container = document.getElementById('home-featured-items');
  const index = container.children.length;
  container.appendChild(createFeaturedItemHTML(index, { title: '', subtitle: '' }));
}

// ---- PORTFOLIO ----
function loadPortfolio() {
  const data = getData('portfolio');
  document.getElementById('portfolio-banner-title').value = data.bannerTitle || '';
  document.getElementById('portfolio-banner-subtitle').value = data.bannerSubtitle || '';
  document.getElementById('portfolio-banner-bg').value = data.bannerBg || 'images/photo.png';

  const container = document.getElementById('portfolio-items');
  container.innerHTML = '';
  (data.items || []).forEach((item, i) => {
    container.appendChild(createPortfolioItemHTML(i, item));
  });
}

function createPortfolioItemHTML(index, item) {
  const div = document.createElement('div');
  div.className = 'admin-repeatable';
  div.innerHTML = `
    <div class="admin-repeatable__header">
      <h4>Portfolio Item #${index + 1}</h4>
      <button class="admin-repeatable__remove" onclick="this.closest('.admin-repeatable').remove()">✕ Hapus</button>
    </div>
    <div class="admin-form-row">
      <div class="admin-form-group" style="grid-column: span 2;">
        <label>Image URL</label>
        <div class="admin-image-upload">
          <img class="admin-image-preview" src="${escHtml(item.image || 'images/photo.png')}" alt="Preview">
          <div class="admin-image-dropzone">
            <span>Seret & Jatuhkan berkas atau <strong>Jelajahi</strong></span>
            <input type="file" accept="image/*" class="admin-image-file">
            <input type="hidden" class="portfolio-img" value="${escHtml(item.image || 'images/photo.png')}">
          </div>
        </div>
      </div>
      <div class="admin-form-group">
        <label>Title</label>
        <input type="text" class="portfolio-title" value="${escHtml(item.title || '')}">
      </div>
      <div class="admin-form-group">
        <label>Category</label>
        <select class="portfolio-category">
          <option value="wedding" ${item.category === 'wedding' ? 'selected' : ''}>Wedding</option>
          <option value="portrait" ${item.category === 'portrait' ? 'selected' : ''}>Portrait</option>
          <option value="commercial" ${item.category === 'commercial' ? 'selected' : ''}>Commercial</option>
          <option value="nature" ${item.category === 'nature' ? 'selected' : ''}>Nature</option>
        </select>
      </div>
    </div>
  `;
  return div;
}

function addPortfolioItem() {
  const container = document.getElementById('portfolio-items');
  const index = container.children.length;
  container.appendChild(createPortfolioItemHTML(index, { title: '', category: 'wedding' }));
}

// ---- SERVICE ----
function loadService() {
  const data = getData('service');
  document.getElementById('service-banner-title').value = data.bannerTitle || '';
  document.getElementById('service-banner-subtitle').value = data.bannerSubtitle || '';
  document.getElementById('service-banner-bg').value = data.bannerBg || 'images/photo.png';

  const pkgContainer = document.getElementById('service-packages');
  pkgContainer.innerHTML = '';
  (data.packages || []).forEach((pkg, i) => {
    pkgContainer.appendChild(createPackageHTML(i, pkg));
  });

  const addonContainer = document.getElementById('service-addons');
  addonContainer.innerHTML = '';
  (data.addons || []).forEach((addon, i) => {
    addonContainer.appendChild(createAddonHTML(i, addon));
  });
}

function createPackageHTML(index, pkg) {
  const div = document.createElement('div');
  div.className = 'admin-repeatable';
  div.innerHTML = `
    <div class="admin-repeatable__header">
      <h4>Package #${index + 1} ${pkg.featured ? '⭐ Featured' : ''}</h4>
    </div>
    <div class="admin-form-row">
      <div class="admin-form-group">
        <label>Icon (emoji)</label>
        <input type="text" class="pkg-icon" value="${escHtml(pkg.icon || '')}">
      </div>
      <div class="admin-form-group">
        <label>Package Name</label>
        <input type="text" class="pkg-name" value="${escHtml(pkg.name || '')}">
      </div>
    </div>
    <div class="admin-form-row">
      <div class="admin-form-group">
        <label>Subtitle</label>
        <input type="text" class="pkg-subtitle" value="${escHtml(pkg.subtitle || '')}">
      </div>
      <div class="admin-form-group">
        <label>Price</label>
        <input type="text" class="pkg-price" value="${escHtml(pkg.price || '')}">
      </div>
    </div>
    <div class="admin-form-group">
      <label>Price Note</label>
      <input type="text" class="pkg-price-note" value="${escHtml(pkg.priceNote || '')}">
    </div>
    <div class="admin-form-group">
      <label>Features (satu per baris)</label>
      <textarea class="pkg-features">${escHtml((pkg.features || []).join('\n'))}</textarea>
    </div>
    <div class="admin-form-group">
      <label><input type="checkbox" class="pkg-featured" ${pkg.featured ? 'checked' : ''}> Featured / Most Popular</label>
    </div>
  `;
  return div;
}

function createAddonHTML(index, addon) {
  const div = document.createElement('div');
  div.className = 'admin-repeatable';
  div.innerHTML = `
    <div class="admin-repeatable__header">
      <h4>Add-On #${index + 1}</h4>
      <button class="admin-repeatable__remove" onclick="this.closest('.admin-repeatable').remove()">✕ Hapus</button>
    </div>
    <div class="admin-form-group">
      <label>Add-On Name</label>
      <input type="text" class="addon-name" value="${escHtml(addon || '')}">
    </div>
  `;
  return div;
}

function addAddon() {
  const container = document.getElementById('service-addons');
  const index = container.children.length;
  container.appendChild(createAddonHTML(index, ''));
}

// ---- ABOUT ----
function loadAbout() {
  const data = getData('about');
  document.getElementById('about-banner-title').value = data.bannerTitle || '';
  document.getElementById('about-banner-subtitle').value = data.bannerSubtitle || '';
  document.getElementById('about-banner-bg').value = data.bannerBg || 'images/photo.png';
  document.getElementById('about-story-img').value = data.storyImage || 'images/photo.png';
  document.getElementById('about-story-title').value = data.storyTitle || '';
  document.getElementById('about-story-p1').value = data.storyP1 || '';
  document.getElementById('about-story-p2').value = data.storyP2 || '';
  document.getElementById('about-story-p3').value = data.storyP3 || '';

  const btsContainer = document.getElementById('about-bts-items');
  btsContainer.innerHTML = '';
  (data.btsItems || []).forEach((item, i) => {
    btsContainer.appendChild(createBtsItemHTML(i, item));
  });

  const teamContainer = document.getElementById('about-team-items');
  teamContainer.innerHTML = '';
  (data.teamMembers || []).forEach((member, i) => {
    teamContainer.appendChild(createTeamMemberHTML(i, member));
  });
}

function createBtsItemHTML(index, item) {
  const div = document.createElement('div');
  div.className = 'admin-repeatable';
  div.innerHTML = `
    <div class="admin-repeatable__header">
      <h4>BTS Item #${index + 1}</h4>
    </div>
    <div class="admin-form-row">
      <div class="admin-form-group" style="grid-column: span 2;">
        <label>Image URL</label>
        <div class="admin-image-upload">
          <img class="admin-image-preview" src="${escHtml(item.image || 'images/photo.png')}" alt="Preview">
          <div class="admin-image-dropzone">
            <span>Seret & Jatuhkan berkas atau <strong>Jelajahi</strong></span>
            <input type="file" accept="image/*" class="admin-image-file">
            <input type="hidden" class="bts-img" value="${escHtml(item.image || 'images/photo.png')}">
          </div>
        </div>
      </div>
      <div class="admin-form-group">
        <label>Title</label>
        <input type="text" class="bts-title" value="${escHtml(item.title || '')}">
      </div>
      <div class="admin-form-group">
        <label>Subtitle</label>
        <input type="text" class="bts-subtitle" value="${escHtml(item.subtitle || '')}">
      </div>
    </div>
  `;
  return div;
}

function createTeamMemberHTML(index, member) {
  const div = document.createElement('div');
  div.className = 'admin-repeatable';
  div.innerHTML = `
    <div class="admin-repeatable__header">
      <h4>Team Member #${index + 1}</h4>
      <button class="admin-repeatable__remove" onclick="this.closest('.admin-repeatable').remove()">✕ Hapus</button>
    </div>
    <div class="admin-form-row">
      <div class="admin-form-group" style="grid-column: span 2;">
        <label>Image URL</label>
        <div class="admin-image-upload">
          <img class="admin-image-preview" src="${escHtml(member.image || 'images/photo.png')}" alt="Preview">
          <div class="admin-image-dropzone">
            <span>Seret & Jatuhkan berkas atau <strong>Jelajahi</strong></span>
            <input type="file" accept="image/*" class="admin-image-file">
            <input type="hidden" class="team-img" value="${escHtml(member.image || 'images/photo.png')}">
          </div>
        </div>
      </div>
      <div class="admin-form-group">
        <label>Nama</label>
        <input type="text" class="team-name" value="${escHtml(member.name || '')}">
      </div>
      <div class="admin-form-group">
        <label>Role / Posisi</label>
        <input type="text" class="team-role" value="${escHtml(member.role || '')}">
      </div>
    </div>
  `;
  return div;
}

function addTeamMember() {
  const container = document.getElementById('about-team-items');
  const index = container.children.length;
  container.appendChild(createTeamMemberHTML(index, { name: '', role: '' }));
}

// ---- BLOG ----
function loadBlog() {
  const data = getData('blog');
  document.getElementById('blog-banner-title').value = data.bannerTitle || '';
  document.getElementById('blog-banner-subtitle').value = data.bannerSubtitle || '';
  document.getElementById('blog-banner-bg').value = data.bannerBg || 'images/photo.png';

  const container = document.getElementById('blog-items');
  container.innerHTML = '';
  (data.posts || []).forEach((post, i) => {
    container.appendChild(createBlogPostHTML(i, post));
  });
}

function createBlogPostHTML(index, post) {
  const div = document.createElement('div');
  div.className = 'admin-repeatable';
  div.innerHTML = `
    <div class="admin-repeatable__header">
      <h4>Blog Post #${index + 1}</h4>
      <button class="admin-repeatable__remove" onclick="this.closest('.admin-repeatable').remove()">✕ Hapus</button>
    </div>
    <div class="admin-form-group">
      <label>Image URL</label>
      <div class="admin-image-upload">
          <img class="admin-image-preview" src="${escHtml(post.image || 'images/photo.png')}" alt="Preview">
          <div class="admin-image-dropzone">
            <span>Seret & Jatuhkan berkas atau <strong>Jelajahi</strong></span>
            <input type="file" accept="image/*" class="admin-image-file">
            <input type="hidden" class="blog-post-img" value="${escHtml(post.image || 'images/photo.png')}">
          </div>
        </div>
    </div>
    <div class="admin-form-group">
      <label>Title</label>
      <input type="text" class="blog-post-title" value="${escHtml(post.title || '')}">
    </div>
    <div class="admin-form-group">
      <label>Meta (Kategori • Tanggal)</label>
      <input type="text" class="blog-post-meta" value="${escHtml(post.meta || '')}">
    </div>
    <div class="admin-form-group">
      <label>Excerpt</label>
      <textarea class="blog-post-excerpt">${escHtml(post.excerpt || '')}</textarea>
    </div>
  `;
  return div;
}

function addBlogPost() {
  const container = document.getElementById('blog-items');
  const index = container.children.length;
  container.appendChild(createBlogPostHTML(index, { title: '', meta: '', excerpt: '' }));
}

// ---- CONTACT ----
function loadContact() {
  const data = getData('contact');
  document.getElementById('contact-banner-title').value = data.bannerTitle || '';
  document.getElementById('contact-banner-subtitle').value = data.bannerSubtitle || '';
  document.getElementById('contact-banner-bg').value = data.bannerBg || 'images/photo.png';
  document.getElementById('contact-address').value = data.address || '';
  document.getElementById('contact-phone').value = data.phone || '';
  document.getElementById('contact-email').value = data.email || '';
  document.getElementById('contact-hours').value = data.hours || '';
}

// ---- BOOKING ----
function loadBooking() {
  const data = getData('booking');
  document.getElementById('booking-banner-title').value = data.bannerTitle || '';
  document.getElementById('booking-banner-subtitle').value = data.bannerSubtitle || '';
  document.getElementById('booking-banner-bg').value = data.bannerBg || 'images/photo.png';

  renderBookingOptions('booking-services', data.services || [], 'service');
  renderBookingOptions('booking-locations', data.locations || [], 'location');
  renderBookingOptions('booking-packages', data.packages || [], 'package');
  renderBookingOptions('booking-payments', data.payments || [], 'payment');
}

function renderBookingOptions(containerId, items, type) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  items.forEach((item, i) => {
    container.appendChild(createBookingOptionHTML(i, item, type));
  });
}

function createBookingOptionHTML(index, item, type) {
  const div = document.createElement('div');
  div.className = 'admin-repeatable';
  div.innerHTML = `
    <div class="admin-repeatable__header">
      <h4>${capitalize(type)} Option #${index + 1}</h4>
      <button class="admin-repeatable__remove" onclick="this.closest('.admin-repeatable').remove()">✕ Hapus</button>
    </div>
    <div class="admin-form-row">
      <div class="admin-form-group">
        <label>Value (ID)</label>
        <input type="text" class="booking-opt-value" value="${escHtml(item.value || '')}">
      </div>
      <div class="admin-form-group">
        <label>Display Label</label>
        <input type="text" class="booking-opt-label" value="${escHtml(item.label || '')}">
      </div>
      <div class="admin-form-group">
        <label>Price Display</label>
        <input type="text" class="booking-opt-price" value="${escHtml(item.price || '')}" placeholder="Rp 2.5jt">
      </div>
    </div>
  `;
  return div;
}

function addBookingService() {
  const container = document.getElementById('booking-services');
  container.appendChild(createBookingOptionHTML(container.children.length, {}, 'service'));
}
function addBookingLocation() {
  const container = document.getElementById('booking-locations');
  container.appendChild(createBookingOptionHTML(container.children.length, {}, 'location'));
}
function addBookingPackage() {
  const container = document.getElementById('booking-packages');
  container.appendChild(createBookingOptionHTML(container.children.length, {}, 'package'));
}
function addBookingPayment() {
  const container = document.getElementById('booking-payments');
  container.appendChild(createBookingOptionHTML(container.children.length, {}, 'payment'));
}

// ---- FOOTER ----
function loadFooter() {
  const data = getData('footer');
  document.getElementById('footer-description').value = data.description || '';
  document.getElementById('footer-copyright').value = data.copyright || '';
  document.getElementById('footer-ig').value = data.igUrl || '';
  document.getElementById('footer-fb').value = data.fbUrl || '';
  document.getElementById('footer-yt').value = data.ytUrl || '';
  document.getElementById('footer-tk').value = data.tkUrl || '';
  document.getElementById('footer-email').value = data.email || '';
  document.getElementById('footer-phone').value = data.phone || '';
  document.getElementById('footer-location').value = data.location || '';
}

// ========== SAVE SECTIONS ==========

function saveSection(section) {
  let data = {};

  switch (section) {
    case 'home':
      data = {
        heroTitle1: val('home-hero-title1'),
        heroTitle2: val('home-hero-title2'),
        heroTitle3: val('home-hero-title3'),
        heroSubtitle: val('home-hero-subtitle'),
        heroBtn: val('home-hero-btn'),
        heroBg: val('home-hero-bg'),
        blogImage: val('home-blog-img'),
        featuredTitle: val('home-featured-title'),
        featuredSubtitle: val('home-featured-subtitle'),
        featuredItems: collectRepeatables('#home-featured-items .admin-repeatable', el => ({
          title: el.querySelector('.featured-title').value,
          image: el.querySelector('.featured-img').value,
          subtitle: el.querySelector('.featured-subtitle').value
        })),
        blogTitle: val('home-blog-title'),
        blogExcerpt: val('home-blog-excerpt')
      };
      break;

    case 'portfolio':
      data = {
        bannerTitle: val('portfolio-banner-title'),
        bannerSubtitle: val('portfolio-banner-subtitle'),
        bannerBg: val('portfolio-banner-bg'),
        items: collectRepeatables('#portfolio-items .admin-repeatable', el => ({
          title: el.querySelector('.portfolio-title').value,
          image: el.querySelector('.portfolio-img').value,
          category: el.querySelector('.portfolio-category').value
        }))
      };
      document.getElementById('statPortfolio').textContent = data.items.length;
      break;

    case 'service':
      data = {
        bannerTitle: val('service-banner-title'),
        bannerSubtitle: val('service-banner-subtitle'),
        bannerBg: val('service-banner-bg'),
        packages: collectRepeatables('#service-packages .admin-repeatable', el => ({
          icon: el.querySelector('.pkg-icon').value,
          name: el.querySelector('.pkg-name').value,
          subtitle: el.querySelector('.pkg-subtitle').value,
          price: el.querySelector('.pkg-price').value,
          priceNote: el.querySelector('.pkg-price-note').value,
          features: el.querySelector('.pkg-features').value.split('\n').filter(f => f.trim()),
          featured: el.querySelector('.pkg-featured').checked
        })),
        addons: collectRepeatables('#service-addons .admin-repeatable', el => el.querySelector('.addon-name').value).filter(a => a)
      };
      break;

    case 'about':
      data = {
        bannerTitle: val('about-banner-title'),
        bannerSubtitle: val('about-banner-subtitle'),
        bannerBg: val('about-banner-bg'),
        storyImage: val('about-story-img'),
        storyTitle: val('about-story-title'),
        storyP1: val('about-story-p1'),
        storyP2: val('about-story-p2'),
        storyP3: val('about-story-p3'),
        btsItems: collectRepeatables('#about-bts-items .admin-repeatable', el => ({
          title: el.querySelector('.bts-title').value,
          image: el.querySelector('.bts-img').value,
          subtitle: el.querySelector('.bts-subtitle').value
        })),
        teamMembers: collectRepeatables('#about-team-items .admin-repeatable', el => ({
          name: el.querySelector('.team-name').value,
          image: el.querySelector('.team-img').value,
          role: el.querySelector('.team-role').value
        }))
      };
      document.getElementById('statTeam').textContent = data.teamMembers.length;
      break;

    case 'blog':
      data = {
        bannerTitle: val('blog-banner-title'),
        bannerSubtitle: val('blog-banner-subtitle'),
        bannerBg: val('blog-banner-bg'),
        posts: collectRepeatables('#blog-items .admin-repeatable', el => ({
          title: el.querySelector('.blog-post-title').value,
          image: el.querySelector('.blog-post-img').value,
          meta: el.querySelector('.blog-post-meta').value,
          excerpt: el.querySelector('.blog-post-excerpt').value
        }))
      };
      document.getElementById('statBlog').textContent = data.posts.length;
      break;

    case 'contact':
      data = {
        bannerTitle: val('contact-banner-title'),
        bannerSubtitle: val('contact-banner-subtitle'),
        bannerBg: val('contact-banner-bg'),
        address: val('contact-address'),
        phone: val('contact-phone'),
        email: val('contact-email'),
        hours: val('contact-hours')
      };
      break;

    case 'booking':
      data = {
        bannerTitle: val('booking-banner-title'),
        bannerSubtitle: val('booking-banner-subtitle'),
        bannerBg: val('booking-banner-bg'),
        services: collectBookingOpts('booking-services'),
        locations: collectBookingOpts('booking-locations'),
        packages: collectBookingOpts('booking-packages'),
        payments: collectBookingOpts('booking-payments')
      };
      break;

    case 'footer':
      data = {
        description: val('footer-description'),
        copyright: val('footer-copyright'),
        igUrl: val('footer-ig'),
        fbUrl: val('footer-fb'),
        ytUrl: val('footer-yt'),
        tkUrl: val('footer-tk'),
        email: val('footer-email'),
        phone: val('footer-phone'),
        location: val('footer-location')
      };
      break;
  }

  saveData(section, data);
  showAdminToast(`✅ ${capitalize(section)} berhasil disimpan!`);

  // Animate save button
  const activeSection = document.querySelector('.admin-section.active');
  const saveBtn = activeSection ? activeSection.querySelector('.admin-btn--save') : null;
  if (saveBtn) {
    saveBtn.classList.add('saved');
    saveBtn.innerHTML = '✓ Tersimpan!';
    setTimeout(() => {
      saveBtn.classList.remove('saved');
      saveBtn.innerHTML = '💾 Simpan Perubahan';
    }, 2000);
  }
}

// ========== HELPERS ==========

function val(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}

function collectRepeatables(selector, mapper) {
  return Array.from(document.querySelectorAll(selector)).map(mapper);
}

function collectBookingOpts(containerId) {
  return collectRepeatables(`#${containerId} .admin-repeatable`, el => ({
    value: el.querySelector('.booking-opt-value').value,
    label: el.querySelector('.booking-opt-label').value,
    price: el.querySelector('.booking-opt-price')?.value || ''
  }));
}

function escHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function showAdminToast(message) {
  const toast = document.getElementById('adminToast');
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
}

// ========== THEME TOGGLE ==========
function initTheme() {
  const themeBtns = document.querySelectorAll('.theme-btn');
  const savedTheme = localStorage.getItem('swr_admin_theme') || 'system';

  function applyTheme(theme) {
    if (theme === 'system') {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = theme;
    }

    themeBtns.forEach(btn => {
      if (btn.dataset.themeValue === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.dataset.themeValue;
      localStorage.setItem('swr_admin_theme', theme);
      applyTheme(theme);
    });
  });

  applyTheme(savedTheme);
}

// ---- DATA BOOKING ----
function loadDataBooking() {
  const tbody = document.getElementById('data-booking-tbody');
  if (!tbody) return;

  let bookings = JSON.parse(localStorage.getItem('swr_bookings')) || [];
  tbody.innerHTML = '';

  if (bookings.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:var(--admin-text-muted);padding:20px;">Belum ada pesanan masuk.</td></tr>';
    return;
  }

  // Sort descending by created date
  bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const statuses = ['Booking Diterima', 'Confirmed', 'Photo Session', 'Editing Process', 'Gallery Ready', 'Completed'];

  bookings.forEach((b, index) => {
    const tr = document.createElement('tr');

    let statusOptions = statuses.map(s => `<option value="${s}" ${b.status === s ? 'selected' : ''}>${s}</option>`).join('');

    tr.innerHTML = `
      <td><strong>${b.id}</strong></td>
      <td>${b.name}<br><small style="color:var(--admin-text-muted)">${b.email}</small></td>
      <td>${b.service}<br><small style="color:var(--admin-text-muted)">${b.package}</small></td>
      <td>${b.date}</td>
      <td><input type="text" class="admin-table-input b-est" data-idx="${index}" value="${b.estimate || 'TBD'}"></td>
      <td>
        <select class="admin-table-select b-status" data-idx="${index}">
          ${statusOptions}
        </select>
      </td>
      <td>
        <button class="admin-btn admin-btn--save" style="padding: 6px 12px; font-size:0.8rem;" onclick="saveSingleBooking(${index})">💾 Save</button>
        <button class="admin-btn admin-btn--danger" style="padding: 6px 12px; font-size:0.8rem; border:none; border-radius:8px; cursor:pointer;" onclick="deleteSingleBooking(${index})">✕</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

window.saveSingleBooking = function (idx) {
  let bookings = JSON.parse(localStorage.getItem('swr_bookings')) || [];
  bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const tr = document.getElementById('data-booking-tbody').children[idx];
  const newEst = tr.querySelector('.b-est').value;
  const newStatus = tr.querySelector('.b-status').value;

  bookings[idx].estimate = newEst;
  bookings[idx].status = newStatus;

  localStorage.setItem('swr_bookings', JSON.stringify(bookings));
  showToast('Booking ' + bookings[idx].id + ' berhasil diupdate.', 'success');
};

window.deleteSingleBooking = function (idx) {
  if (!confirm('Yakin ingin menghapus data booking ini?')) return;
  let bookings = JSON.parse(localStorage.getItem('swr_bookings')) || [];
  bookings.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  bookings.splice(idx, 1);
  localStorage.setItem('swr_bookings', JSON.stringify(bookings));
  showToast('Booking berhasil dihapus.', 'success');
  loadDataBooking();
};
