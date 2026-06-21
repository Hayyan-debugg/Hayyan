const designs = [
  { id: 1, title: 'Summer Sale Post', category: 'social', type: 'mock-social', logo: 'SALE', text: 'Up to 50% Off — Shop Now', desc: 'Instagram post for retail brand campaign' },
  { id: 2, title: 'Tech Startup Banner', category: 'banner', type: 'mock-banner', logo: 'INNOVATE', text: 'Building Tomorrow\'s Solutions', desc: 'Web banner for SaaS company homepage' },
  { id: 3, title: 'Nova Brand Logo', category: 'logo', type: 'mock-logo-piece', logo: 'N', text: 'Brand Identity Concept', desc: 'Minimal logo design for tech startup' },
  { id: 4, title: 'Music Festival Poster', category: 'poster', type: 'mock-poster', logo: 'BEATS', text: 'Live Concert — March 2026', desc: 'Event poster with bold typography' },
  { id: 5, title: 'Cafe Brand Kit', category: 'branding', type: 'mock-brand', logo: 'BrewCo', text: 'Brand Style Guide Preview', desc: 'Complete branding with color palette', dots: ['#6f4e37','#d4a574','#2c1810','#f5e6d3'] },
  { id: 6, title: 'Fitness Motivation', category: 'social', type: 'mock-social', logo: 'FIT', text: 'Transform Your Body Today', desc: 'Social media post for gym brand', gradient: 'linear-gradient(135deg, #f12711, #f5af19)' },
  { id: 7, title: 'E-Commerce Banner', category: 'banner', type: 'mock-banner', logo: 'SHOPPK', text: 'Free Shipping Nationwide', desc: 'Hero banner for online store', gradient: 'linear-gradient(90deg, #141e30, #243b55)' },
  { id: 8, title: 'Leaf Organic Logo', category: 'logo', type: 'mock-logo-piece', logo: 'L', text: 'Eco Brand Concept', desc: 'Organic food brand logo design' },
  { id: 9, title: 'Film Night Poster', category: 'poster', type: 'mock-poster', logo: 'CINEMA', text: 'Classic Films Marathon', desc: 'Retro-style movie night poster' },
  { id: 10, title: 'App Launch Post', category: 'social', type: 'mock-social', logo: 'APP', text: 'Download Now on Play Store', desc: 'App launch announcement graphic', gradient: 'linear-gradient(135deg, #11998e, #38ef7d)' },
  { id: 11, title: 'Agency Brand Kit', category: 'branding', type: 'mock-brand', logo: 'PixelPro', text: 'Design Agency Identity', desc: 'Full brand kit with typography & colors', dots: ['#ff4081','#7c4dff','#00bcd4','#ff9100'] },
  { id: 12, title: 'Restaurant Banner', category: 'banner', type: 'mock-banner', logo: 'TASTE', text: 'Authentic Pakistani Cuisine', desc: 'Restaurant website hero banner', gradient: 'linear-gradient(90deg, #200122, #6f0000)' },
  { id: 13, title: 'Charity Event Poster', category: 'poster', type: 'mock-poster', logo: 'HOPE', text: 'Community Fundraiser 2026', desc: 'Non-profit event promotional poster' },
  { id: 14, title: 'Fashion Brand Logo', category: 'logo', type: 'mock-logo-piece', logo: 'V', text: 'Luxury Fashion Label', desc: 'Elegant monogram logo concept' },
  { id: 15, title: 'Product Launch Post', category: 'social', type: 'mock-social', logo: 'NEW', text: 'Introducing Our Latest Product', desc: 'Product reveal social media graphic', gradient: 'linear-gradient(135deg, #ee0979, #ff6a00)' },
  { id: 16, title: 'Studio Brand Kit', category: 'branding', type: 'mock-brand', logo: 'StudioX', text: 'Creative Studio Branding', desc: 'Visual identity for design studio', dots: ['#1a1a2e','#16213e','#0f3460','#e94560'] },
  { id: 17, title: 'Travel Banner', category: 'banner', type: 'mock-banner', logo: 'WANDER', text: 'Explore Northern Pakistan', desc: 'Travel agency promotional banner', gradient: 'linear-gradient(90deg, #0f0c29, #302b63, #24243e)' },
  { id: 18, title: 'Art Exhibition Poster', category: 'poster', type: 'mock-poster', logo: 'GALLERY', text: 'Modern Art Showcase', desc: 'Gallery exhibition promotional design' }
];

const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const filterBtns = document.querySelectorAll('.filter-btn');
let currentIndex = 0;

function renderPreview(d, large) {
  const style = d.gradient ? `background:${d.gradient}` : '';
  let inner = `<div class="mock-logo">${d.logo}</div><div class="mock-text">${d.text}</div>`;
  if (d.type === 'mock-brand' && d.dots) {
    inner = `<div class="color-dots">${d.dots.map(c => `<div class="dot" style="background:${c}"></div>`).join('')}</div>${inner}`;
  }
  return `<div class="piece-preview ${d.type}" style="${style}">${inner}</div>`;
}

function renderGallery(filter = 'all') {
  gallery.innerHTML = designs
    .filter(d => filter === 'all' || d.category === filter)
    .map((d, i) => `
      <article class="design-piece" data-index="${designs.indexOf(d)}" data-category="${d.category}">
        ${renderPreview(d)}
        <div class="piece-info">
          <h3>${d.title}</h3>
          <p>${d.desc}</p>
          <span class="piece-tag">${d.category}</span>
        </div>
      </article>
    `).join('');
}

function openLightbox(index) {
  currentIndex = index;
  const d = designs[index];
  document.getElementById('lightbox-preview').innerHTML = renderPreview(d, true);
  document.getElementById('lightbox-title').textContent = d.title;
  document.getElementById('lightbox-desc').textContent = d.desc;
  lightbox.classList.add('open');
}

function closeLightbox() {
  lightbox.classList.remove('open');
}

gallery.addEventListener('click', e => {
  const piece = e.target.closest('.design-piece');
  if (piece) openLightbox(parseInt(piece.dataset.index, 10));
});

document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.getElementById('prev-btn').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + designs.length) % designs.length;
  openLightbox(currentIndex);
});

document.getElementById('next-btn').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % designs.length;
  openLightbox(currentIndex);
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderGallery(btn.dataset.filter);
  });
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') document.getElementById('prev-btn').click();
  if (e.key === 'ArrowRight') document.getElementById('next-btn').click();
});

renderGallery();
