/* ============================================
   SWARATTIVE Photography — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar scroll effect & hamburger ----
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const spans = hamburger.querySelectorAll('span');
      if (navLinks.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // Close menu on link click (mobile)
  document.querySelectorAll('.navbar__links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  // ---- Scroll animations ----
  const animateElements = document.querySelectorAll('.animate-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  animateElements.forEach(el => observer.observe(el));

  // ---- Portfolio filter ----
  const filterBtns = document.querySelectorAll('.portfolio__filters button');
  const portfolioItems = document.querySelectorAll('.portfolio__item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;

      portfolioItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = '';
          item.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ---- Check Booking ----
  const checkBookingBtn = document.getElementById('checkBookingBtn');
  const statusTracker = document.getElementById('statusTracker');
  const bookingSearchInput = document.getElementById('bookingSearchInput');

  if (checkBookingBtn) {
    checkBookingBtn.addEventListener('click', () => {
      const query = bookingSearchInput.value.trim().toLowerCase();
      if (!query) {
        showToast('Masukkan Booking ID atau Email');
        return;
      }

      let bookings = JSON.parse(localStorage.getItem('swr_bookings')) || [];
      const found = bookings.find(b => b.id.toLowerCase() === query || b.email.toLowerCase() === query);

      if (!found) {
        showToast('Booking tidak ditemukan.');
        statusTracker.classList.remove('visible');
        return;
      }

      document.getElementById('bookingIdDisplay').textContent = found.id;
      document.getElementById('detailName').textContent = found.name;
      document.getElementById('detailPackage').textContent = found.package || '-';
      document.getElementById('detailDate').textContent = found.date;
      document.getElementById('detailLocation').textContent = found.location || '-';
      document.getElementById('detailEstimate').textContent = found.estimate || 'TBD';

      const statuses = ['Booking Diterima', 'Confirmed', 'Photo Session', 'Editing Process', 'Gallery Ready', 'Completed'];
      const activeStep = statuses.indexOf(found.status) !== -1 ? statuses.indexOf(found.status) : 0;

      const steps = document.querySelectorAll('.status-step');
      const progressBar = document.getElementById('progressBar');
      const totalSteps = steps.length;

      steps.forEach((step, index) => {
        step.classList.remove('completed', 'active');
        if (index < activeStep) {
          step.classList.add('completed');
          step.querySelector('.status-step__circle').textContent = '✓';
        } else if (index === activeStep) {
          step.classList.add('active');
          step.querySelector('.status-step__circle').textContent = index + 1;
        } else {
          step.querySelector('.status-step__circle').textContent = index + 1;
        }
      });

      const progressPercent = ((activeStep) / (totalSteps - 1)) * 100;
      progressBar.style.width = `calc(${progressPercent}% - 80px)`;
      document.getElementById('detailStatus').textContent = found.status;

      statusTracker.classList.add('visible');
      statusTracker.scrollIntoView({ behavior: 'smooth', block: 'start' });
      showToast('Data booking ditemukan.');
    });
  }

  // ---- Form submissions ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Pesan berhasil dikirim! Kami akan segera menghubungi Anda.');
      contactForm.reset();
    });
  }

  // ---- Multi-Step Booking Wizard ----
  let currentStep = 1;
  const totalSteps = 6;
  const bookingData = {
    service: null,
    team: null,
    date: null,
    time: null,
    name: '',
    phone: '',
    email: '',
    message: '',
    paymentMethod: null,
    paymentProof: null,
    price: 0,
    dp: 0
  };

  // --- Wizard Functions (Hoisted) ---

  window.updateBookingSummary = function () {
    const sService = document.getElementById('sumService');
    const sTeam = document.getElementById('sumTeam');
    const sDateTime = document.getElementById('sumDateTime');
    const sTotal = document.getElementById('sumTotal');
    const sDP = document.getElementById('sumDP');

    const activeService = document.querySelector('#servicesGrid .selection-card.active');
    const activeTeam = document.querySelector('#teamGrid .selection-card.active');

    if (sService) sService.textContent = activeService ? activeService.dataset.label : 'Belum dipilih';
    if (sTeam) sTeam.textContent = activeTeam ? activeTeam.dataset.label : 'Belum dipilih';

    let dateStr = bookingData.date || '';
    let timeStr = bookingData.time || '';
    if (sDateTime) sDateTime.textContent = (dateStr || timeStr) ? `${dateStr} ${timeStr}`.trim() : 'Belum dipilih';

    if (activeService) {
      const priceVal = parseInt(activeService.dataset.price?.replace(/[^0-9]/g, '') || '0');
      if (sTotal) sTotal.textContent = 'Rp ' + priceVal.toLocaleString('id-ID');
      if (sDP) sDP.textContent = 'Rp ' + (priceVal * 0.5).toLocaleString('id-ID');
    } else {
      if (sTotal) sTotal.textContent = 'Rp 0';
      if (sDP) sDP.textContent = 'Rp 0';
    }
  };

  window.changeStep = function (n) {
    if (n === 1 && !validateStep(currentStep)) return;

    const steps = document.querySelectorAll('.wizard-step-content');
    if (!steps[currentStep - 1]) return;

    steps[currentStep - 1].classList.remove('active');
    currentStep += n;

    if (currentStep > totalSteps) {
      submitBooking();
      return;
    }

    if (steps[currentStep - 1]) {
      steps[currentStep - 1].classList.add('active');
      updateStepper();
      updateNavButtons();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  function validateStep(step) {
    if (step === 1) {
      const active = document.querySelector('#servicesGrid .selection-card.active');
      if (!active) { showToast('Silakan pilih layanan terlebih dahulu.'); return false; }
      bookingData.service = active.dataset.label;
      const rawPrice = active.dataset.price || '0';
      bookingData.price = parseInt(rawPrice.replace(/[^0-9]/g, '')) || 0;
      bookingData.dp = bookingData.price * 0.5;
    }
    if (step === 2) {
      const active = document.querySelector('#teamGrid .selection-card.active');
      if (!active) { showToast('Silakan pilih photographer/tim.'); return false; }
      bookingData.team = active.dataset.label;
    }
    if (step === 3) {
      if (!bookingData.date || !bookingData.time) { showToast('Silakan pilih tanggal dan jam sesi.'); return false; }
    }
    if (step === 4) {
      bookingData.name = document.getElementById('bookName')?.value;
      bookingData.phone = document.getElementById('bookPhone')?.value;
      bookingData.email = document.getElementById('bookEmail')?.value;
      bookingData.message = document.getElementById('bookMessage')?.value;
      if (!bookingData.name || !bookingData.phone) { showToast('Nama dan Nomor Telepon wajib diisi.'); return false; }
    }
    if (step === 5) {
      const active = document.querySelector('#paymentsGrid .payment-card.active');
      if (!active) { showToast('Silakan pilih metode pembayaran.'); return false; }
      if (!bookingData.paymentProof) { showToast('Silakan upload bukti transfer.'); return false; }
      bookingData.paymentMethod = active.dataset.label;
    }
    return true;
  }

  function updateStepper() {
    const items = document.querySelectorAll('.step-item');
    const progress = document.getElementById('wizProgress');
    items.forEach((item, idx) => {
      item.classList.remove('active', 'completed');
      if (idx + 1 < currentStep) item.classList.add('completed');
      if (idx + 1 === currentStep) item.classList.add('active');
    });
    if (progress) {
      const percent = ((currentStep - 1) / (totalSteps - 1)) * 100;
      progress.style.width = percent + '%';
    }
  }

  function updateNavButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    if (prevBtn) prevBtn.style.display = (currentStep > 1 && currentStep < 6) ? 'block' : 'none';
    if (nextBtn) {
      if (currentStep === 5) nextBtn.textContent = 'Konfirmasi & Booking';
      else if (currentStep >= 6) nextBtn.style.display = 'none';
      else nextBtn.textContent = 'Lanjut →';
    }
  }

  function submitBooking() {
    const bookingId = 'SWR-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 9000) + 1000);
    const data = {
      id: bookingId,
      ...bookingData,
      status: 'Menunggu Verifikasi',
      estimate: 'TBD',
      createdAt: new Date().toISOString()
    };

    let bookings = JSON.parse(localStorage.getItem('swr_bookings')) || [];
    bookings.push(data);
    localStorage.setItem('swr_bookings', JSON.stringify(bookings));

    updateStepper(); // Final step active
    showToast('Booking berhasil dikirim! ID: ' + bookingId);
  }

  // --- Wizard Event Listeners ---

  const bookingFormWiz = document.getElementById('bookingForm');
  if (bookingFormWiz) {
    updateBookingSummary();

    // Time Slot selection
    document.querySelectorAll('.time-slot').forEach(slot => {
      slot.addEventListener('click', () => {
        document.querySelectorAll('.time-slot').forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
        bookingData.time = slot.dataset.time;
        updateBookingSummary();
      });
    });

    // Date change
    const bookDateInput = document.getElementById('bookDate');
    if (bookDateInput) {
      bookDateInput.addEventListener('change', () => {
        bookingData.date = bookDateInput.value;
        updateBookingSummary();
      });
    }

    // Proof Upload
    const proofInput = document.getElementById('bookProof');
    const proofPreview = document.getElementById('proofPreview');
    const proofPreviewContainer = document.getElementById('proofPreviewContainer');
    const removeProof = document.getElementById('removeProof');

    if (proofInput) {
      proofInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            bookingData.paymentProof = event.target.result;
            if (proofPreview) proofPreview.src = event.target.result;
            if (proofPreviewContainer) proofPreviewContainer.style.display = 'block';
          };
          reader.readAsDataURL(file);
        }
      });
    }

    if (removeProof) {
      removeProof.addEventListener('click', () => {
        bookingData.paymentProof = null;
        if (proofInput) proofInput.value = '';
        if (proofPreviewContainer) proofPreviewContainer.style.display = 'none';
      });
    }
  }

  // ---- Toast notification ----
  function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

});
