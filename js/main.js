// This file contains custom JavaScript code for the website, which can be used to add interactivity or manipulate the DOM.

// Dynamic background gradient darkness on scroll
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const percent = Math.min(scrollY / docHeight, 1);
    // Use #3832CD as the base color
    const start = [56,50,205,0.7];
    const mid = [41,137,216,0.7];
    const end = [32,124,202,0.9 + percent * 0.5]; // gets darker as you scroll

    function rgba(arr) { return `rgba(${arr[0]},${arr[1]},${arr[2]},${arr[3]})`; }

    document.body.style.background = `linear-gradient(180deg, ${rgba(start)} 0%, ${rgba(mid)} 50%, ${rgba(end)} 100%)`;
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