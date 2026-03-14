// ============================================
//   BARBERKINGS — barber.js
// ============================================

// ======= DATA =======
const services = [
  { id: 1, name: "Corte Clásico", icon: "✂️", desc: "El corte atemporal que nunca pasa de moda. Perfecto para cualquier ocasión.", price: "$25.000", priceNum: 25000, duration: "30 min", popular: false },
  { id: 2, name: "Fade & Degradado", icon: "💈", desc: "Degradado perfecto desde la piel hasta tu longitud deseada. Máxima precisión.", price: "$35.000", priceNum: 35000, duration: "45 min", popular: true },
  { id: 3, name: "Corte + Barba", icon: "🪒", desc: "El combo completo. Corte impecable más diseño y perfilado de barba.", price: "$45.000", priceNum: 45000, duration: "60 min", popular: true },
  { id: 4, name: "Diseño de Barba", icon: "🧔", desc: "Diseño, perfilado y acondicionamiento de barba con productos premium.", price: "$20.000", priceNum: 20000, duration: "30 min", popular: false },
  { id: 5, name: "Corte Infantil", icon: "👦", desc: "Corte especial para los más pequeños de la casa, con paciencia y cariño.", price: "$18.000", priceNum: 18000, duration: "25 min", popular: false },
  { id: 6, name: "Tinte & Color", icon: "🎨", desc: "Coloración completa o mechones. Dale un giro radical a tu look.", price: "$60.000", priceNum: 60000, duration: "90 min", popular: false },
  { id: 7, name: "Tratamiento Capilar", icon: "💆", desc: "Hidratación profunda y keratina para un cabello saludable y brillante.", price: "$50.000", priceNum: 50000, duration: "60 min", popular: false },
  { id: 8, name: "Afeitado Clásico", icon: "🪤", desc: "Afeitado con navaja y espuma caliente. Una experiencia de lujo antigua.", price: "$28.000", priceNum: 28000, duration: "30 min", popular: false },
];

const barbers = [
  {
    id: 1,
    name: "Jhon Jairo Parra",
    role: "Master Barber & Co-Fundador",
    initials: "JJ",
    rating: 4.9,
    reviews: 312,
    available: true,
    specialties: ["Clásicos", "Degradados", "Barbas", "Diseños"],
    schedule: { open: "8:00 AM", close: "8:00 PM" },
    bookedSlots: { /* filled dynamically */ }
  },
  {
    id: 2,
    name: "Sebastián Banguera",
    role: "Style Director & Co-Fundador",
    initials: "SB",
    rating: 4.8,
    reviews: 287,
    available: true,
    specialties: ["Modernos", "Coloración", "Undercut", "Fade"],
    schedule: { open: "8:00 AM", close: "8:00 PM" },
    bookedSlots: {}
  },
  {
    id: 3,
    name: "Carlos Mejía",
    role: "Senior Barber",
    initials: "CM",
    rating: 4.7,
    reviews: 198,
    available: true,
    specialties: ["Infantiles", "Clásicos", "Afeitado", "Tratamientos"],
    schedule: { open: "10:00 AM", close: "7:00 PM" },
    bookedSlots: {}
  },
  {
    id: 4,
    name: "Andrés Ruiz",
    role: "Junior Barber",
    initials: "AR",
    rating: 4.5,
    reviews: 89,
    available: false,
    specialties: ["Degradados", "Diseños", "Modernos"],
    schedule: { open: "12:00 PM", close: "8:00 PM" },
    bookedSlots: {}
  },
];

// Pre-fill some booked slots for realism
const today = new Date();
const todayStr = formatDate(today);
const tmrw = new Date(today); tmrw.setDate(tmrw.getDate() + 1);
const tmrwStr = formatDate(tmrw);

barbers[0].bookedSlots[todayStr] = ["09:00", "10:00", "14:00", "15:00"];
barbers[0].bookedSlots[tmrwStr] = ["08:00", "11:00", "13:00"];
barbers[1].bookedSlots[todayStr] = ["09:00", "10:30", "16:00"];
barbers[1].bookedSlots[tmrwStr] = ["10:00", "14:00", "15:30"];
barbers[2].bookedSlots[todayStr] = ["11:00", "14:00"];
barbers[3].bookedSlots[tmrwStr] = ["13:00", "14:30"];

// ======= STATE =======
let booking = { barber: null, service: null, date: null, time: null };
let currentStep = 1;

// ======= INIT =======
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavbar();
  initScrollAnimations();
  renderServices();
  renderBarbers();
  initBookingForm();
  initDateInput();
});

// ======= LOADER =======
function initLoader() {
  const loader = document.getElementById('loader');
  setTimeout(() => { loader.classList.add('hidden'); }, 1800);
}

// ======= NAVBAR =======
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  });
  document.getElementById('hamburger').addEventListener('click', () => {
    document.getElementById('mobileMenu').classList.toggle('open');
  });
}
function closeMobile() { document.getElementById('mobileMenu').classList.remove('open'); }
function scrollToCitas() { document.getElementById('citas').scrollIntoView({ behavior: 'smooth' }); }

// ======= SCROLL ANIMATIONS =======
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15 });
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ======= RENDER SERVICES =======
function renderServices() {
  const grid = document.getElementById('servicesGrid');
  grid.innerHTML = services.map((s, i) => `
    <div class="service-card fade-in" style="animation-delay:${i * 0.07}s">
      ${s.popular ? '<div class="service-popular">Popular</div>' : ''}
      <div class="service-icon">${s.icon}</div>
      <h3>${s.name}</h3>
      <p>${s.desc}</p>
      <div class="service-meta">
        <span class="service-price">${s.price}</span>
        <span class="service-dur"><i class="fas fa-clock"></i> ${s.duration}</span>
      </div>
    </div>
  `).join('');
  setTimeout(() => initScrollAnimations(), 100);
}

// ======= RENDER BARBERS =======
function renderBarbers() {
  const grid = document.getElementById('barbersGrid');
  grid.innerHTML = barbers.map((b, i) => `
    <div class="barber-card fade-in" style="animation-delay:${i * 0.1}s">
      <div class="barber-avatar-wrap">
        <div class="barber-initials">${b.initials}</div>
        <div class="barber-available-badge ${b.available ? 'badge-available' : 'badge-busy'}">
          ${b.available ? '● Disponible' : '● Ocupado'}
        </div>
      </div>
      <div class="barber-info">
        <h3>${b.name}</h3>
        <div class="barber-role">${b.role}</div>
        <div class="barber-stars">
          ${renderStars(b.rating)}
          <span class="star-count">${b.rating} (${b.reviews} reseñas)</span>
        </div>
        <div class="barber-tags">
          ${b.specialties.map(s => `<span class="barber-tag">${s}</span>`).join('')}
        </div>
        <div style="font-size:0.8rem; color:var(--text); margin-bottom:16px;">
          <i class="fas fa-clock" style="color:var(--gold);margin-right:6px;"></i>
          ${b.schedule.open} – ${b.schedule.close}
        </div>
        <button class="barber-cita-btn" onclick="selectBarberAndScroll(${b.id})" ${!b.available ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>
          ${b.available ? 'Pedir Cita' : 'No Disponible'}
        </button>
      </div>
    </div>
  `).join('');
  setTimeout(() => initScrollAnimations(), 100);
}

function renderStars(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) html += '<span class="star filled">★</span>';
    else if (i - 0.5 <= rating) html += '<span class="star half">★</span>';
    else html += '<span class="star">★</span>';
  }
  return html;
}

function selectBarberAndScroll(barberId) {
  selectBarber(barberId);
}

// ======= BOOKING FORM =======
function initBookingForm() {
  // Barber select
  const grid = document.getElementById('barberSelectGrid');
  grid.innerHTML = barbers.map(b => `
    <div class="barber-select-card" id="bselect_${b.id}" onclick="selectBarber(${b.id})" ${!b.available ? 'style="opacity:0.4;pointer-events:none"' : ''}>
      <div class="bs-initials">${b.initials}</div>
      <h4>${b.name}</h4>
      <div class="bs-avail">${b.available ? '● Disponible' : '● Ocupado'}</div>
      <div style="font-size:0.75rem;color:var(--text)">${b.schedule.open} – ${b.schedule.close}</div>
    </div>
  `).join('');

  // Service select
  const sGrid = document.getElementById('serviceSelectGrid');
  sGrid.innerHTML = services.map(s => `
    <div class="service-select-card" id="sselect_${s.id}" onclick="selectService(${s.id})">
      <div>${s.icon}</div>
      <h4>${s.name}</h4>
      <div class="ss-price">${s.price}</div>
      <div style="font-size:0.8rem;color:var(--text);margin-top:4px;">${s.duration}</div>
    </div>
  `).join('');
}

function selectBarber(id) {
  booking.barber = barbers.find(b => b.id === id);
  document.querySelectorAll('.barber-select-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById(`bselect_${id}`);
  if (card) card.classList.add('selected');
  updateSummary();
  goStep(2);
}

function selectService(id) {
  booking.service = services.find(s => s.id === id);
  document.querySelectorAll('.service-select-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById(`sselect_${id}`);
  if (card) card.classList.add('selected');
  updateSummary();
  goStep(3);
}

function initDateInput() {
  const input = document.getElementById('dateInput');
  const today = new Date();
  const min = today.toISOString().split('T')[0];
  input.min = min;
  input.addEventListener('change', () => {
    booking.date = input.value;
    booking.time = null;
    renderTimeSlots(input.value);
    updateSummary();
  });
}

function renderTimeSlots(dateStr) {
  const container = document.getElementById('slotsContainer');
  if (!booking.barber) { container.innerHTML = '<p class="select-date-hint">Primero selecciona un barbero.</p>'; return; }
  const b = booking.barber;
  const selectedDate = new Date(dateStr + 'T12:00:00');
  const dayOfWeek = selectedDate.getDay(); // 0=Sun, 6=Sat

  let openHour = 8, closeHour = 20;
  if (dayOfWeek === 6) closeHour = 18;
  if (dayOfWeek === 0) { openHour = 9; closeHour = 14; }

  // Parse barber open/close
  const barberOpen = parseHour(b.schedule.open);
  const barberClose = parseHour(b.schedule.close);
  const startHour = Math.max(openHour, barberOpen);
  const endHour = Math.min(closeHour, barberClose);

  const bookedList = b.bookedSlots[dateStr] || [];
  const slots = [];
  for (let h = startHour; h < endHour; h++) {
    slots.push(pad(h) + ':00');
    if (h + 0.5 < endHour) slots.push(pad(h) + ':30');
  }

  container.innerHTML = `
    <p style="font-size:0.85rem;color:var(--text);margin-bottom:12px;">
      <i class="fas fa-clock" style="color:var(--gold)"></i>
      ${b.name}: ${b.schedule.open} – ${b.schedule.close}
    </p>
    <div class="slots-grid">
      ${slots.map(s => {
        const taken = bookedList.includes(s.replace(':','').padStart(4,'0').slice(0,2)+':'+s.slice(3)) || bookedList.includes(s);
        return `<button class="slot-btn ${taken ? 'taken' : ''}" onclick="selectSlot('${s}', this)">
          ${s}${taken ? '<br><small>Ocupado</small>' : ''}
        </button>`;
      }).join('')}
    </div>
  `;
}

function selectSlot(time, el) {
  document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
  el.classList.add('selected');
  booking.time = time;
  updateSummary();
  goStep(4);
}

function parseHour(str) {
  const parts = str.split(' ');
  let [h, m] = parts[0].split(':').map(Number);
  if (parts[1] === 'PM' && h !== 12) h += 12;
  if (parts[1] === 'AM' && h === 12) h = 0;
  return h + (m || 0) / 60;
}
function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }

// ======= STEP NAV =======
function goStep(step) {
  document.querySelectorAll('.booking-step').forEach(s => s.classList.remove('active'));
  document.getElementById('step' + step).classList.add('active');
  currentStep = step;
  updateProgressBar();
}

function updateProgressBar() {
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('prog' + i);
    el.classList.remove('active', 'done');
    if (i < currentStep) el.classList.add('done');
    else if (i === currentStep) el.classList.add('active');
  }
}

// ======= SUMMARY =======
function updateSummary() {
  document.getElementById('sumBarber').textContent = booking.barber ? booking.barber.name : '—';
  document.getElementById('sumService').textContent = booking.service ? booking.service.name : '—';
  document.getElementById('sumPrice').textContent = booking.service ? booking.service.price : '—';
  document.getElementById('sumDate').textContent = booking.date ? formatDateDisplay(booking.date) : '—';
  document.getElementById('sumTime').textContent = booking.time || '—';
}

function formatDateDisplay(str) {
  const d = new Date(str + 'T12:00:00');
  return d.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' });
}

function formatDate(d) {
  return d.toISOString().split('T')[0];
}

// ======= CONFIRM BOOKING =======
function confirmBooking() {
  const name = document.getElementById('clientName').value.trim();
  const phone = document.getElementById('clientPhone').value.trim();
  if (!name || !phone) { alert('Por favor completa tu nombre y teléfono.'); return; }
  if (!booking.barber || !booking.service || !booking.date || !booking.time) {
    alert('Por favor completa todos los pasos de la reserva.'); return;
  }

  // Save slot as booked
  if (!booking.barber.bookedSlots[booking.date]) booking.barber.bookedSlots[booking.date] = [];
  booking.barber.bookedSlots[booking.date].push(booking.time);

  document.getElementById('modalText').innerHTML = `
    <strong>${name}</strong>, tu cita ha sido reservada:<br><br>
    ✂️ <strong>Barbero:</strong> ${booking.barber.name}<br>
    💈 <strong>Servicio:</strong> ${booking.service.name}<br>
    📅 <strong>Fecha:</strong> ${formatDateDisplay(booking.date)}<br>
    🕐 <strong>Hora:</strong> ${booking.time}<br>
    💰 <strong>Precio:</strong> ${booking.service.price}<br><br>
    <em>Te contactaremos al ${phone} para confirmar.</em>
  `;
  document.getElementById('confirmModal').classList.add('open');
}

function closeModal() {
  document.getElementById('confirmModal').classList.remove('open');
  // Reset booking
  booking = { barber: null, service: null, date: null, time: null };
  document.getElementById('clientName').value = '';
  document.getElementById('clientPhone').value = '';
  document.getElementById('clientEmail').value = '';
  document.getElementById('clientNote').value = '';
  document.getElementById('dateInput').value = '';
  document.querySelectorAll('.barber-select-card, .service-select-card, .slot-btn').forEach(c => c.classList.remove('selected'));
  updateSummary();
  goStep(1);
}

// ======= GALLERY CAROUSEL =======
const gallerySlides = [
  {
    category: "Instalaciones",
    title: "Nuestro Espacio Principal",
    desc: "Ambiente premium diseñado para tu comodidad y relajación.",
    bg: "barbershop_interior",
    colors: ["#1a1008","#2d1f0e","#3d2a12"],
    accent: "#D4A843",
    icon: "✂",
    elements: "chairs"
  },
  {
    category: "Instalaciones",
    title: "Sillas de Trabajo",
    desc: "Sillas hidráulicas profesionales para la mejor experiencia.",
    bg: "barber_chairs",
    colors: ["#0f0f1a","#1a1a2e","#16213e"],
    accent: "#C8A87A",
    icon: "💈",
    elements: "mirror"
  },
  {
    category: "Área VIP",
    title: "Zona Premium",
    desc: "Área exclusiva con servicio personalizado y ambiente élite.",
    bg: "vip_area",
    colors: ["#120a00","#1e1000","#2a1500"],
    accent: "#F0C865",
    icon: "⭐",
    elements: "vip"
  },
  {
    category: "Productos",
    title: "Línea de Productos",
    desc: "Ceras, pomadas, aceites y tratamientos de marcas premium.",
    bg: "products",
    colors: ["#0a0a12","#12121e","#1a1a2a"],
    accent: "#D4A843",
    icon: "🧴",
    elements: "products"
  },
  {
    category: "Productos",
    title: "Navajas & Herramientas",
    desc: "Herramientas profesionales de alta precisión para el mejor acabado.",
    bg: "tools",
    colors: ["#0d0d0d","#191919","#222"],
    accent: "#C0C0C0",
    icon: "🪒",
    elements: "tools"
  },
  {
    category: "Ambiente",
    title: "Nuestro Bar de Bebidas",
    desc: "Mientras esperas, disfruta de café, agua o tus bebidas favoritas.",
    bg: "bar",
    colors: ["#0a0806","#16100a","#1e1610"],
    accent: "#8B6914",
    icon: "☕",
    elements: "bar"
  },
  {
    category: "Instalaciones",
    title: "Zona de Espera",
    desc: "Sala de espera cómoda con revistas, TV y buen ambiente.",
    bg: "waiting",
    colors: ["#0d1016","#141b24","#1b2432"],
    accent: "#5B9BD5",
    icon: "🛋",
    elements: "waiting"
  },
  {
    category: "Cortes",
    title: "Trabajos Destacados",
    desc: "Muestra de algunos de nuestros mejores trabajos del mes.",
    bg: "haircuts",
    colors: ["#0f0a14","#1a1220","#22182c"],
    accent: "#B56DD4",
    icon: "💇",
    elements: "haircut"
  },
];

let currentSlide = 0;
let carouselInterval = null;

function initCarousel() {
  const track = document.getElementById('carouselTrack');
  const dots = document.getElementById('carouselDots');
  const thumbs = document.getElementById('carouselThumbs');

  // Build slides
  track.innerHTML = gallerySlides.map((s, i) => `
    <div class="carousel-slide">
      <div class="carousel-slide-inner">
        <div class="slide-bg">${buildSlideIllustration(s, i)}</div>
        <div class="slide-overlay"></div>
      </div>
    </div>
  `).join('');

  // Build dots
  dots.innerHTML = gallerySlides.map((_, i) =>
    `<button class="carousel-dot ${i===0?'active':''}" onclick="goToSlide(${i})"></button>`
  ).join('');

  // Build thumbnails
  thumbs.innerHTML = gallerySlides.map((s, i) => `
    <div class="carousel-thumb ${i===0?'active':''}" onclick="goToSlide(${i})">
      <div class="carousel-thumb-inner">${buildThumbSVG(s, i)}</div>
      <div class="thumb-label">${s.category}</div>
    </div>
  `).join('');

  // Controls
  document.getElementById('carouselPrev').addEventListener('click', () => { stopAuto(); prevSlide(); });
  document.getElementById('carouselNext').addEventListener('click', () => { stopAuto(); nextSlide(); });

  // Keyboard
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { stopAuto(); prevSlide(); }
    if (e.key === 'ArrowRight') { stopAuto(); nextSlide(); }
  });

  // Touch swipe
  let touchStart = 0;
  const wrapper = document.querySelector('.carousel-wrapper');
  wrapper.addEventListener('touchstart', e => { touchStart = e.touches[0].clientX; }, {passive:true});
  wrapper.addEventListener('touchend', e => {
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { stopAuto(); diff > 0 ? nextSlide() : prevSlide(); }
  });

  updateCaption();
  startAuto();
}

function buildSlideIllustration(slide, idx) {
  const c = slide.colors;
  const acc = slide.accent;
  const el = slide.elements;

  const svgMap = {
    chairs: `
      <!-- Barbershop chairs scene -->
      <rect width="1200" height="520" fill="${c[0]}"/>
      <!-- Floor -->
      <rect x="0" y="380" width="1200" height="140" fill="${c[1]}"/>
      <!-- Floor tiles -->
      ${Array.from({length:12}, (_,i) => `<rect x="${i*100}" y="380" width="99" height="70" fill="${i%2===0?c[1]:c[2]}" opacity="0.6"/>`).join('')}
      <!-- Back wall -->
      <rect x="0" y="0" width="1200" height="380" fill="${c[0]}"/>
      <!-- Wall texture lines -->
      ${Array.from({length:8}, (_,i) => `<line x1="${i*150}" y1="0" x2="${i*150}" y2="380" stroke="${acc}" stroke-width="0.5" opacity="0.15"/>`).join('')}
      <!-- Large mirrors -->
      <rect x="80" y="40" width="300" height="280" rx="4" fill="${c[2]}" stroke="${acc}" stroke-width="2" opacity="0.9"/>
      <rect x="90" y="50" width="280" height="260" rx="2" fill="#1a1a2a" opacity="0.7"/>
      <rect x="460" y="40" width="300" height="280" rx="4" fill="${c[2]}" stroke="${acc}" stroke-width="2" opacity="0.9"/>
      <rect x="470" y="50" width="280" height="260" rx="2" fill="#1a1a2a" opacity="0.7"/>
      <rect x="840" y="40" width="300" height="280" rx="4" fill="${c[2]}" stroke="${acc}" stroke-width="2" opacity="0.9"/>
      <rect x="850" y="50" width="280" height="260" rx="2" fill="#1a1a2a" opacity="0.7"/>
      <!-- Barber chairs -->
      ${[120, 500, 880].map(x => `
        <rect x="${x-20}" y="330" width="160" height="60" rx="6" fill="${acc}" opacity="0.9"/>
        <rect x="${x}" y="250" width="120" height="100" rx="8" fill="#2a2a2a"/>
        <rect x="${x+10}" y="260" width="100" height="80" rx="6" fill="#333"/>
        <rect x="${x-5}" y="320" width="130" height="20" rx="4" fill="#222"/>
        <rect x="${x+20}" y="380" width="80" height="10" rx="3" fill="${c[2]}"/>
      `).join('')}
      <!-- Barber poles -->
      <rect x="415" y="100" width="20" height="250" rx="10" fill="#ddd"/>
      <path d="M415 100 Q425 115 435 130 Q425 145 415 160 Q425 175 435 190 Q425 205 415 220 Q425 235 435 250 Q425 265 415 280" stroke="red" stroke-width="5" fill="none"/>
      <path d="M415 100 Q425 125 435 150 Q425 175 415 200 Q425 225 435 250" stroke="blue" stroke-width="3" fill="none"/>
      <!-- Lights -->
      ${[200, 600, 1000].map(x => `
        <ellipse cx="${x}" cy="20" rx="40" ry="10" fill="${acc}" opacity="0.6"/>
        <line x1="${x}" y1="0" x2="${x}" y2="20" stroke="${acc}" stroke-width="3"/>
        <ellipse cx="${x}" cy="80" rx="120" ry="30" fill="${acc}" opacity="0.05"/>
      `).join('')}
    `,
    mirror: `
      <rect width="1200" height="520" fill="${c[0]}"/>
      <rect x="0" y="360" width="1200" height="160" fill="${c[1]}"/>
      <!-- Large central mirror -->
      <rect x="300" y="30" width="600" height="360" rx="6" fill="${c[2]}" stroke="${acc}" stroke-width="3"/>
      <rect x="315" y="45" width="570" height="330" rx="4" fill="#0a0a18" opacity="0.8"/>
      <!-- Mirror frame ornament -->
      <rect x="300" y="30" width="600" height="20" rx="4" fill="${acc}" opacity="0.7"/>
      <rect x="300" y="370" width="600" height="20" rx="4" fill="${acc}" opacity="0.7"/>
      <!-- Counter/shelf -->
      <rect x="250" y="360" width="700" height="30" rx="4" fill="${c[2]}"/>
      <!-- Products on shelf -->
      ${[320,380,440,500,580,640,700,760,820].map((x,i) => `
        <rect x="${x}" y="${310 + (i%3)*15}" width="${18+i%3*6}" height="${50-i%3*10}" rx="${i%2?4:6}" fill="${['#c8943a','#4a7a9b','#8b5e3c','#2d6a4f','#6b4c9a'][i%5]}" opacity="0.85"/>
      `).join('')}
      <!-- Barber chair in front of mirror -->
      <rect x="480" y="270" width="240" height="100" rx="10" fill="#1e1e1e"/>
      <rect x="500" y="280" width="200" height="80" rx="8" fill="#2a2a2a"/>
      <rect x="460" y="355" width="280" height="20" rx="5" fill="${acc}" opacity="0.8"/>
      <rect x="500" y="370" width="200" height="40" rx="6" fill="${c[2]}"/>
      <!-- Lighting strip -->
      <rect x="300" y="28" width="600" height="6" rx="3" fill="${acc}" opacity="0.9" filter="url(#glow)"/>
      <defs><filter id="glow"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    `,
    vip: `
      <rect width="1200" height="520" fill="${c[0]}"/>
      <!-- Luxury dark wall panels -->
      ${Array.from({length:6}, (_,i) => `
        <rect x="${i*200}" y="0" width="198" height="320" fill="${i%2===0?c[1]:c[0]}"/>
        <rect x="${i*200+10}" y="20" width="178" height="280" rx="2" fill="none" stroke="${acc}" stroke-width="1" opacity="0.3"/>
      `).join('')}
      <!-- Gold ceiling trim -->
      <rect x="0" y="0" width="1200" height="8" fill="${acc}" opacity="0.7"/>
      <!-- Floor -->
      <rect x="0" y="380" width="1200" height="140" fill="${c[1]}"/>
      <!-- Luxury sofa -->
      <rect x="150" y="310" width="350" height="90" rx="12" fill="#2c1810"/>
      <rect x="160" y="300" width="330" height="30" rx="8" fill="#3d2215"/>
      <rect x="150" y="310" width="40" height="90" rx="8" fill="#3d2215"/>
      <rect x="460" y="310" width="40" height="90" rx="8" fill="#3d2215"/>
      <!-- Gold trim on sofa -->
      <rect x="150" y="395" width="350" height="6" rx="3" fill="${acc}" opacity="0.6"/>
      <!-- VIP chair -->
      <rect x="680" y="270" width="200" height="120" rx="10" fill="#1a1a1a"/>
      <rect x="700" y="280" width="160" height="90" rx="8" fill="#2a2a2a"/>
      <rect x="660" y="365" width="280" height="20" rx="5" fill="${acc}" opacity="0.9"/>
      <rect x="700" y="383" width="160" height="35" rx="6" fill="#111"/>
      <!-- Chandelier -->
      <line x1="600" y1="0" x2="600" y2="60" stroke="${acc}" stroke-width="3"/>
      <ellipse cx="600" cy="65" rx="80" ry="20" fill="${acc}" opacity="0.6"/>
      ${Array.from({length:8}, (_,i) => {
        const angle = (i/8)*Math.PI*2;
        const x = 600 + Math.cos(angle)*60;
        const y = 65 + Math.sin(angle)*8;
        return `<circle cx="${x}" cy="${y}" r="6" fill="${acc}" opacity="0.9"/>
                <line x1="${x}" y1="${y}" x2="${x}" y2="${y+30}" stroke="${acc}" stroke-width="1.5" opacity="0.6"/>
                <circle cx="${x}" cy="${y+30}" r="4" fill="#fff" opacity="0.8"/>`;
      }).join('')}
      <!-- Stars -->
      ${Array.from({length:12}, (_,i) => `<text x="${100+i*90}" y="${30+i%3*20}" font-size="14" fill="${acc}" opacity="${0.3+i%3*0.2}">★</text>`).join('')}
    `,
    products: `
      <rect width="1200" height="520" fill="${c[0]}"/>
      <!-- Shelf background -->
      <rect x="50" y="40" width="1100" height="440" rx="8" fill="${c[1]}"/>
      <!-- Shelf lines -->
      ${[150,270,390].map(y => `<rect x="70" y="${y}" width="1060" height="10" rx="3" fill="${c[2]}"/>`).join('')}
      <!-- Products Row 1 -->
      ${[
        {x:100,h:90,w:40,col:'#2c3e50',shape:'rect'},
        {x:155,h:100,w:50,col:'#8B4513',shape:'cylinder'},
        {x:220,h:80,w:35,col:'#1a472a',shape:'rect'},
        {x:270,h:110,w:45,col:'#4a235a',shape:'tall'},
        {x:330,h:70,w:60,col:'#c0392b',shape:'wide'},
        {x:405,h:95,w:42,col:'#2980b9',shape:'rect'},
        {x:462,h:85,w:38,col:'#d35400',shape:'rect'},
        {x:515,h:105,w:44,col:'#27ae60',shape:'tall'},
        {x:574,h:78,w:50,col:'#8e44ad',shape:'wide'},
        {x:638,h:92,w:40,col:'#c0392b',shape:'rect'},
        {x:693,h:88,w:46,col:'#16a085',shape:'rect'},
        {x:754,h:102,w:42,col:'#2c3e50',shape:'tall'},
        {x:811,h:75,w:55,col:'#f39c12',shape:'wide'},
        {x:882,h:96,w:40,col:'#8B4513',shape:'rect'},
        {x:937,h:84,w:44,col:'#1a5276',shape:'rect'},
        {x:996,h:108,w:46,col:'#6c3483',shape:'tall'},
        {x:1057,h:80,w:52,col:'#1e8449',shape:'wide'},
      ].map(p => `
        <rect x="${p.x}" y="${150-p.h}" width="${p.w}" height="${p.h}" rx="${p.shape==='cylinder'?p.w/2:5}" fill="${p.col}" opacity="0.9"/>
        <rect x="${p.x+3}" y="${150-p.h+6}" width="${p.w-6}" height="${Math.min(20,p.h-12)}" rx="2" fill="rgba(255,255,255,0.12)"/>
        <ellipse cx="${p.x+p.w/2}" cy="${150-p.h}" rx="${p.w/2}" ry="5" fill="${p.col}" opacity="0.7"/>
      `).join('')}
      <!-- Products Row 2 (smaller) -->
      ${[
        {x:100,col:'#c0392b'},{x:150,col:'#2980b9'},{x:200,col:'#27ae60'},
        {x:250,col:'#8e44ad'},{x:300,col:'#d35400'},{x:360,col:'#16a085'},
        {x:420,col:'#f39c12'},{x:475,col:'#2c3e50'},{x:530,col:'#1a472a'},
        {x:585,col:'#8B4513'},{x:640,col:'#4a235a'},{x:700,col:'#c0392b'},
        {x:755,col:'#2980b9'},{x:810,col:'#27ae60'},{x:870,col:'#8e44ad'},
        {x:925,col:'#d35400'},{x:980,col:'#16a085'},{x:1040,col:'#f39c12'},
        {x:1095,col:'#2c3e50'},
      ].map((p,i) => `
        <rect x="${p.x}" y="${260-50-i%3*10}" width="40" height="${50+i%3*10}" rx="4" fill="${p.col}" opacity="0.85"/>
        <rect x="${p.x+3}" y="${260-44-i%3*10}" width="34" height="12" rx="2" fill="rgba(255,255,255,0.1)"/>
      `).join('')}
      <!-- Labels & gold accents -->
      <text x="600" y="480" text-anchor="middle" font-family="serif" font-size="22" fill="${acc}" opacity="0.8" letter-spacing="8">PRODUCTOS PREMIUM</text>
      <rect x="200" y="470" width="280" height="1.5" fill="${acc}" opacity="0.4"/>
      <rect x="720" y="470" width="280" height="1.5" fill="${acc}" opacity="0.4"/>
    `,
    tools: `
      <rect width="1200" height="520" fill="${c[0]}"/>
      <!-- Dark table surface -->
      <rect x="0" y="280" width="1200" height="240" rx="0" fill="${c[1]}"/>
      <rect x="0" y="278" width="1200" height="6" fill="${acc}" opacity="0.4"/>
      <!-- Scissors set -->
      <g transform="translate(150, 150) rotate(-30)">
        <rect x="-4" y="-120" width="8" height="160" rx="4" fill="#b8b8b8"/>
        <rect x="-4" y="-120" width="8" height="160" rx="4" fill="${acc}" opacity="0.3"/>
        <ellipse cx="0" cy="50" rx="18" ry="18" fill="none" stroke="#c0c0c0" stroke-width="3"/>
        <ellipse cx="0" cy="80" rx="18" ry="18" fill="none" stroke="#c0c0c0" stroke-width="3"/>
      </g>
      <g transform="translate(180, 150) rotate(30)">
        <rect x="-4" y="-120" width="8" height="160" rx="4" fill="#b8b8b8"/>
        <ellipse cx="0" cy="50" rx="18" ry="18" fill="none" stroke="#c0c0c0" stroke-width="3"/>
        <ellipse cx="0" cy="80" rx="18" ry="18" fill="none" stroke="#c0c0c0" stroke-width="3"/>
      </g>
      <!-- Straight razor -->
      <g transform="translate(350, 200) rotate(-15)">
        <rect x="-6" y="-100" width="12" height="130" rx="2" fill="#c8c8c8"/>
        <rect x="-4" y="-95" width="8" height="2" fill="${acc}" opacity="0.5"/>
        <rect x="-3" y="-90" width="6" height="80" rx="1" fill="#e8e8e8"/>
        <rect x="-6" y="30" width="12" height="40" rx="4" fill="#4a4a4a"/>
      </g>
      <!-- Clippers -->
      <g transform="translate(500, 160)">
        <rect x="-25" y="-80" width="50" height="160" rx="12" fill="#1a1a2e"/>
        <rect x="-20" y="-75" width="40" height="20" rx="4" fill="${acc}" opacity="0.7"/>
        <rect x="-22" y="70" width="44" height="16" rx="4" fill="#333"/>
        ${Array.from({length:10}, (_,i) => `<rect x="${-20+i*4}" y="80" width="3" height="10" rx="1" fill="#888"/>`).join('')}
        <rect x="-15" y="-40" width="30" height="5" rx="2" fill="${acc}" opacity="0.4"/>
        <rect x="-15" y="-28" width="30" height="5" rx="2" fill="${acc}" opacity="0.4"/>
      </g>
      <!-- Brush -->
      <g transform="translate(680, 180) rotate(10)">
        <rect x="-8" y="-90" width="16" height="100" rx="8" fill="#8B6914"/>
        <rect x="-12" y="10" width="24" height="50" rx="12" fill="#333"/>
        ${Array.from({length:8}, (_,i) => `<line x1="${-10+i*3}" y1="60" x2="${-11+i*3}" y2="80" stroke="#888" stroke-width="1.5"/>`).join('')}
      </g>
      <!-- Comb -->
      <g transform="translate(820, 200) rotate(-5)">
        <rect x="-10" y="-80" width="20" height="100" rx="3" fill="#c8943a"/>
        ${Array.from({length:14}, (_,i) => `<rect x="${-8+i*1.2}" y="20" width="0.8" height="30" rx="0.4" fill="#8B6914"/>`).join('')}
      </g>
      <!-- Spray bottle -->
      <g transform="translate(960, 150)">
        <rect x="-20" y="-60" width="40" height="100" rx="8" fill="#2980b9" opacity="0.8"/>
        <rect x="-15" y="-55" width="30" height="15" rx="3" fill="rgba(255,255,255,0.2)"/>
        <rect x="15" y="-45" width="30" height="12" rx="4" fill="#1e6ea0"/>
        <circle cx="45" cy="-39" r="5" fill="#1e6ea0"/>
      </g>
      <!-- Towels stacked -->
      ${[0,1,2].map(i => `<rect x="${1060}" y="${200-i*14}" width="100" height="14" rx="4" fill="${['#e8e8e0','#f0f0e8','#d8d8d0'][i]}"/>`).join('')}
      <!-- Table reflection -->
      <rect x="0" y="282" width="1200" height="2" fill="rgba(255,255,255,0.04)"/>
      <!-- Background glow -->
      <ellipse cx="600" cy="200" rx="400" ry="200" fill="${acc}" opacity="0.03"/>
      <text x="600" y="490" text-anchor="middle" font-family="serif" font-size="18" fill="${acc}" opacity="0.6" letter-spacing="12">HERRAMIENTAS PROFESIONALES</text>
    `,
    bar: `
      <rect width="1200" height="520" fill="${c[0]}"/>
      <!-- Bar counter -->
      <rect x="0" y="300" width="1200" height="220" fill="${c[1]}"/>
      <rect x="0" y="295" width="1200" height="12" rx="4" fill="${c[2]}"/>
      <!-- Wood texture on counter -->
      ${Array.from({length:20}, (_,i) => `<line x1="${i*60}" y1="300" x2="${i*60+40}" y2="520" stroke="${acc}" stroke-width="0.5" opacity="0.08"/>`).join('')}
      <!-- Shelves on wall -->
      <rect x="100" y="80" width="1000" height="10" rx="3" fill="${c[2]}"/>
      <rect x="100" y="180" width="1000" height="10" rx="3" fill="${c[2]}"/>
      <!-- Bottles on shelf 1 -->
      ${[120,180,240,300,360,420,480,540,600,660,720,780,840,900,960,1020].map((x,i) => `
        <rect x="${x}" y="${-20+i%3*8}" width="${22+i%3*5}" height="${90-i%3*8}" rx="${3+i%2*3}" fill="${['#c0392b','#2980b9','#27ae60','#8e44ad','#d35400','#f39c12'][i%6]}" opacity="0.85"/>
        <rect x="${x+2}" y="${-14+i%3*8}" width="${18+i%3*5}" height="12" rx="2" fill="rgba(255,255,255,0.15)"/>
      `).join('')}
      <!-- Bottles on shelf 2 -->
      ${[140,210,280,340,410,480,540,610,680,740,810,880,940,1010,1070].map((x,i) => `
        <rect x="${x}" y="${155-i%3*5}" width="${20+i%2*8}" height="${20+i%3*5}" rx="4" fill="${['#6c3483','#1a5276','#1e8449','#7b241c','#154360'][i%5]}" opacity="0.9"/>
      `).join('')}
      <!-- Coffee machine -->
      <rect x="480" y="230" width="80" height="70" rx="6" fill="#1a1a1a"/>
      <rect x="490" y="240" width="60" height="30" rx="4" fill="#2a2a2a"/>
      <circle cx="520" cy="255" r="12" fill="#333"/>
      <circle cx="520" cy="255" r="7" fill="#111"/>
      <!-- Cups -->
      ${[600,640,680].map((x,i) => `
        <rect x="${x}" y="${275-i*3}" width="30" height="${20+i*3}" rx="4" fill="white" opacity="0.9"/>
        <rect x="${x+2}" y="${285-i*3}" width="26" height="${10+i*3}" rx="2" fill="${['#c0392b','#2980b9','#27ae60'][i]}" opacity="0.7"/>
      `).join('')}
      <!-- Neon sign -->
      <text x="600" y="60" text-anchor="middle" font-family="serif" font-size="36" fill="${acc}" opacity="0.9" letter-spacing="4">☕ BAR & LOUNGE</text>
      <rect x="340" y="68" width="520" height="2" fill="${acc}" opacity="0.5"/>
      <!-- Ambiance lights -->
      ${Array.from({length:8}, (_,i) => `
        <circle cx="${150+i*130}" cy="30" r="8" fill="${acc}" opacity="0.7"/>
        <line x1="${150+i*130}" y1="0" x2="${150+i*130}" y2="22" stroke="${acc}" stroke-width="2" opacity="0.5"/>
      `).join('')}
    `,
    waiting: `
      <rect width="1200" height="520" fill="${c[0]}"/>
      <!-- Floor -->
      <rect x="0" y="380" width="1200" height="140" fill="${c[1]}"/>
      <!-- Rug -->
      <ellipse cx="600" cy="430" rx="360" ry="60" fill="${c[2]}" opacity="0.6"/>
      <ellipse cx="600" cy="430" rx="300" ry="48" fill="none" stroke="${acc}" stroke-width="2" opacity="0.4"/>
      <!-- Sofa left -->
      <rect x="60" y="280" width="280" height="110" rx="12" fill="#1e2a38"/>
      <rect x="60" y="270" width="280" height="25" rx="8" fill="#263545"/>
      <rect x="60" y="280" width="35" height="110" rx="8" fill="#263545"/>
      <rect x="305" y="280" width="35" height="110" rx="8" fill="#263545"/>
      <!-- Sofa right -->
      <rect x="860" y="280" width="280" height="110" rx="12" fill="#1e2a38"/>
      <rect x="860" y="270" width="280" height="25" rx="8" fill="#263545"/>
      <rect x="860" y="280" width="35" height="110" rx="8" fill="#263545"/>
      <rect x="1105" y="280" width="35" height="110" rx="8" fill="#263545"/>
      <!-- Coffee table -->
      <rect x="480" y="330" width="240" height="70" rx="6" fill="${c[2]}"/>
      <rect x="490" y="336" width="220" height="58" rx="4" fill="${c[1]}" opacity="0.5"/>
      <!-- Magazines on table -->
      ${[510,565,620,675].map((x,i) => `<rect x="${x}" y="${340+i%2*5}" width="45" height="32" rx="3" fill="${['#c0392b','#2980b9','#27ae60','#8e44ad'][i]}" opacity="0.8"/>`).join('')}
      <!-- TV on wall -->
      <rect x="430" y="60" width="340" height="200" rx="8" fill="#111" stroke="${acc}" stroke-width="2" opacity="0.9"/>
      <rect x="445" y="75" width="310" height="170" rx="4" fill="#0a1a2e"/>
      <!-- TV content -->
      ${Array.from({length:5}, (_,i) => `<rect x="${460}" y="${85+i*28}" width="${220+i%3*30}" height="18" rx="3" fill="${acc}" opacity="${0.1+i*0.05}"/>`).join('')}
      <text x="600" y="180" text-anchor="middle" font-family="serif" font-size="20" fill="${acc}" opacity="0.5">BarberKings TV</text>
      <rect x="580" y="260" width="40" height="30" fill="#0d0d0d"/>
      <!-- Plants -->
      <rect x="120" y="330" width="30" height="50" rx="4" fill="#4a2"/>
      <ellipse cx="135" cy="320" rx="30" ry="30" fill="#2d5a1b"/>
      <ellipse cx="155" cy="310" rx="22" ry="25" fill="#3a7a22"/>
      <rect x="1040" y="330" width="30" height="50" rx="4" fill="#4a2"/>
      <ellipse cx="1055" cy="320" rx="30" ry="30" fill="#2d5a1b"/>
      <ellipse cx="1075" cy="310" rx="22" ry="25" fill="#3a7a22"/>
      <!-- Wall art -->
      <rect x="80" y="80" width="160" height="160" rx="4" fill="${c[2]}" stroke="${acc}" stroke-width="1.5" opacity="0.7"/>
      <text x="160" y="175" text-anchor="middle" font-size="60" fill="${acc}" opacity="0.4">✂</text>
      <rect x="960" y="80" width="160" height="160" rx="4" fill="${c[2]}" stroke="${acc}" stroke-width="1.5" opacity="0.7"/>
      <text x="1040" y="175" text-anchor="middle" font-size="60" fill="${acc}" opacity="0.4">💈</text>
    `,
    haircut: `
      <rect width="1200" height="520" fill="${c[0]}"/>
      <!-- Split panels showing different haircut styles -->
      ${[0,300,600,900].map((x,i) => `
        <rect x="${x}" y="0" width="298" height="520" fill="${i%2===0?c[1]:c[0]}"/>
        <rect x="${x}" y="0" width="2" height="520" fill="${acc}" opacity="0.3"/>
        <!-- Silhouette head -->
        <ellipse cx="${x+149}" cy="160" rx="65" ry="75" fill="${c[2]}" opacity="0.9"/>
        <!-- Hair style per panel -->
        ${i===0 ? `
          <!-- Classic fade -->
          <ellipse cx="${x+149}" cy="120" rx="60" ry="55" fill="#2a1f14"/>
          <rect x="${x+89}" y="120" width="120" height="30" rx="5" fill="#2a1f14"/>
        ` : i===1 ? `
          <!-- Undercut -->
          <ellipse cx="${x+149}" cy="105" rx="55" ry="48" fill="#1a1a2e"/>
          <path d="M${x+94} 130 Q${x+149} 180 ${x+204} 130" fill="#1a1a2e"/>
        ` : i===2 ? `
          <!-- Textured top -->
          ${Array.from({length:8}, (_,j) => `<ellipse cx="${x+100+j*15}" cy="${100+j%3*8}" rx="12" ry="8" fill="#2d1a0e" opacity="0.9"/>`).join('')}
        ` : `
          <!-- Long style -->
          <path d="M${x+90} 110 Q${x+80} 200 ${x+100} 260 Q${x+149} 270 ${x+198} 260 Q${x+218} 200 ${x+208} 110" fill="#1a1008"/>
        `}
        <!-- Face features -->
        <ellipse cx="${x+130}" cy="165" rx="7" ry="8" fill="#3d2b1f" opacity="0.7"/>
        <ellipse cx="${x+168}" cy="165" rx="7" ry="8" fill="#3d2b1f" opacity="0.7"/>
        <path d="M${x+135} 185 Q${x+149} 195 ${x+163} 185" stroke="#5a3a28" stroke-width="2.5" fill="none"/>
        <!-- Style label -->
        <rect x="${x+70}" y="300" width="158" height="32" rx="16" fill="${acc}" opacity="0.85"/>
        <text x="${x+149}" y="320" text-anchor="middle" font-family="sans-serif" font-size="13" font-weight="700" fill="${c[0]}">${['CLASSIC','UNDERCUT','TEXTURED','LONG'][i]}</text>
        <!-- Stars -->
        <text x="${x+149}" y="370" text-anchor="middle" font-size="16" fill="${acc}">★★★★★</text>
        <text x="${x+149}" y="395" text-anchor="middle" font-family="sans-serif" font-size="11" fill="${acc}" opacity="0.6">${['Corte Clásico','Fade Moderno','Texturizado','Corte Largo'][i]}</text>
      `).join('')}
      <!-- Top banner -->
      <rect x="0" y="0" width="1200" height="4" fill="${acc}" opacity="0.8"/>
      <text x="600" y="490" text-anchor="middle" font-family="serif" font-size="20" fill="${acc}" opacity="0.7" letter-spacing="8">NUESTROS ESTILOS MÁS POPULARES</text>
    `,
  };

  return `<svg viewBox="0 0 1200 520" xmlns="http://www.w3.org/2000/svg" 
    style="width:100%;height:100%;object-fit:cover;display:block"
    preserveAspectRatio="xMidYMid slice">
    ${svgMap[el] || svgMap['chairs']}
  </svg>`;
}

function buildThumbSVG(slide, idx) {
  const c = slide.colors;
  const acc = slide.accent;
  return `<svg viewBox="0 0 110 70" xmlns="http://www.w3.org/2000/svg" 
    style="width:100%;height:100%" preserveAspectRatio="xMidYMid slice">
    <rect width="110" height="70" fill="${c[0]}"/>
    <rect width="110" height="70" fill="${acc}" opacity="0.07"/>
    <text x="55" y="35" text-anchor="middle" dominant-baseline="middle" font-size="24" fill="${acc}" opacity="0.7">${slide.icon}</text>
    <rect x="0" y="54" width="110" height="16" fill="rgba(0,0,0,0.5)"/>
    <text x="55" y="64" text-anchor="middle" font-family="sans-serif" font-size="8" fill="white" opacity="0.85">${slide.title.substring(0,16)}</text>
    <rect x="0" y="0" width="110" height="3" fill="${acc}" opacity="0.7"/>
  </svg>`;
}

function goToSlide(index) {
  currentSlide = (index + gallerySlides.length) % gallerySlides.length;
  const track = document.getElementById('carouselTrack');
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Update dots
  document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
  // Update thumbs
  document.querySelectorAll('.carousel-thumb').forEach((t, i) => t.classList.toggle('active', i === currentSlide));

  // Scroll thumb into view
  const thumb = document.querySelectorAll('.carousel-thumb')[currentSlide];
  if (thumb) thumb.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });

  updateCaption();
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

function updateCaption() {
  const s = gallerySlides[currentSlide];
  document.getElementById('carouselCaption').innerHTML = `
    <div class="caption-tag">${s.category}</div>
    <div class="caption-title">${s.title}</div>
    <div class="caption-desc">${s.desc}</div>
  `;
}

function startAuto() { carouselInterval = setInterval(nextSlide, 4500); }
function stopAuto() { clearInterval(carouselInterval); }

// ======= INIT CAROUSEL ON LOAD =======
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initCarousel, 200);
});

// ======= GALLERY CAROUSEL =======
document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  for (let i = 0; i < 18; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 3 + 1;
    p.style.cssText = `
      position:absolute;
      width:${size}px; height:${size}px;
      border-radius:50%;
      background:rgba(212,168,67,${Math.random() * 0.3 + 0.05});
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation: float${i} ${Math.random() * 8 + 6}s ease-in-out infinite;
      pointer-events:none;
      z-index:1;
    `;
    const keyframes = `@keyframes float${i} {
      0%,100% { transform: translateY(0px) translateX(0px); opacity:${Math.random()*0.4+0.1}; }
      33% { transform: translateY(${Math.random()*30-15}px) translateX(${Math.random()*20-10}px); }
      66% { transform: translateY(${Math.random()*30-15}px) translateX(${Math.random()*20-10}px); }
    }`;
    const style = document.createElement('style');
    style.textContent = keyframes;
    document.head.appendChild(style);
    hero.appendChild(p);
  }
});
