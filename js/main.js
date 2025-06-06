// This file contains custom JavaScript code for the website, which can be used to add interactivity or manipulate the DOM.

// Only use #020817 and a slightly darker shade on scroll
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const percent = Math.min(scrollY / docHeight, 1);

    // #020817 (2,8,23), darker: #010510 (1,5,16)
    function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
    const r = lerp(2, 1, percent);
    const g = lerp(8, 5, percent);
    const b = lerp(23, 16, percent);

    document.body.style.background = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
    document.body.style.transition = 'background 0.7s';
});

// Örnek JSON verisi
const pinnedRepos = [
  {
    "owner": "Gokay1904",
    "repo": "PINN-TurbulentFlow-PirateNET",
    "link": "https://github.com/Gokay1904/PINN-TurbulentFlow-PirateNET",
    "description": "Predicting the pressure and velocity fields of a fluid using the RANS approach with Physics-Informed Neural Networks, specifically Physics Residual Adaptive Networks (PirateNET)."
  },
  {
    "owner": "Gokay1904",
    "repo": "Financial-Forecasting-with-AI-Transformer-Models",
    "link": "https://github.com/Gokay1904/Financial-Forecasting-with-AI-Transformer-Models",
    "description": "Analyzing sentiment scores from Twitter texts using transformer models (RoBERTa, BERT) and VADER, then comparing them with actual stock values by treating the problem as both numerical and categori…"
  }
];

// pinned-projects alanına kartları ekle
const container = document.getElementById('pinned-projects');
if (container) {
  container.innerHTML = '';
  pinnedRepos.forEach(repo => {
    container.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card border-0 shadow-sm h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${repo.repo}</h5>
            <p class="card-text flex-grow-1">${repo.description || ''}</p>
            <a href="${repo.link}" class="btn btn-outline-dark mt-2" target="_blank">View on GitHub</a>
          </div>
        </div>
      </div>
    `;
  });
}

// Smooth scroll for sidebar links
document.querySelectorAll('#sidebarNav a.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - 20,
          behavior: 'smooth'
        });
      }
    }
  });
});

// Section-based background color transitions (dark blue palette)
const sectionColors = [
  { id: 'about', color: 'linear-gradient(180deg, #050a30 0%, #020817 100%)' },
  { id: 'education', color: 'linear-gradient(180deg, #020817 0%, #000c66 100%)' },
  { id: 'skills', color: 'linear-gradient(180deg, #000c66 0%, #050a30 100%)' },
  { id: 'experience', color: 'linear-gradient(180deg, #050a30 0%, #020817 100%)' },
  { id: 'certifications', color: 'linear-gradient(180deg, #020817 0%, #000c66 100%)' },
  { id: 'achievements', color: 'linear-gradient(180deg, #000c66 0%, #050a30 100%)' },
  { id: 'contact', color: 'linear-gradient(180deg, #050a30 0%, #020817 100%)' }
];

function getCurrentSection() {
  let current = sectionColors[0];
  for (const section of sectionColors) {
    const el = document.getElementById(section.id);
    if (el && window.scrollY + 100 >= el.offsetTop) {
      current = section;
    }
  }
  return current;
}

window.addEventListener('scroll', () => {
  const section = getCurrentSection();
  document.body.style.background = section.color;
  document.body.style.transition = 'background 0.7s';
});