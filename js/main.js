// This file contains custom JavaScript code for the website, which can be used to add interactivity or manipulate the DOM.

// Only use #020817 and lerp to #010510 as you scroll to the bottom (no section loop)
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const percent = Math.min(scrollY / docHeight, 1);

    // #020817 (2,8,23), #010510 (1,5,16)
    function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
    const r = lerp(2, 1, percent);
    const g = lerp(8, 5, percent);
    const b = lerp(23, 16, percent);

    document.body.style.background = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
    document.body.style.transition = 'background 0.7s';
});

// Örnek JSON verisi
// Example pinned repos (add "tech" field for manual tech stack)
const pinnedRepos = [
  {
    "owner": "Gokay1904",
    "repo": "PINN-TurbulentFlow-PirateNET",
    "link": "https://github.com/Gokay1904/PINN-TurbulentFlow-PirateNET",
    "description": "Predicting the pressure and velocity fields of a fluid using the RANS approach with Physics-Informed Neural Networks, specifically Physics Residual Adaptive Networks (PirateNET).",
    "tech": ["Python", "PyTorch", "Deep Learning", "Physics-Informed NN"]
  },
  {
    "owner": "Gokay1904",
    "repo": "Financial-Forecasting-with-AI-Transformer-Models",
    "link": "https://github.com/Gokay1904/Financial-Forecasting-with-AI-Transformer-Models",
    "description": "Analyzing sentiment scores from Twitter texts using transformer models (RoBERTa, BERT) and VADER, then comparing them with actual stock values by treating the problem as both numerical and categorical.",
    "tech": ["Python", "Transformers", "NLP", "BERT", "RoBERTa"]
  }
];

// Fetch pinned repositories from GitHub using the alternative gh-pinned-repos API
async function fetchPinnedRepos(username) {
  // Uses https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/ as a public proxy for pinned repos
  const response = await fetch(`https://gh-pinned-repos-tsj7ta5xfhep.deno.dev/?username=${username}`);
  if (!response.ok) return [];
  const repos = await response.json();
  // Each repo has: repo, link, description, language, languageColor, stars, forks
  return repos.map(repo => ({
    repo: repo.repo,
    link: repo.link,
    description: repo.description || '',
    tech: repo.language ? [repo.language] : []
  }));
}

async function renderProjects() {
  const container = document.getElementById('pinned-projects');
  if (!container) return;
  container.innerHTML = '<div class="text-center w-100 my-4">Loading projects...</div>';
  const repos = await fetchPinnedRepos('Gokay1904');
  container.innerHTML = '';
  repos.forEach(repo => {
    const card = document.createElement('div');
    card.className = 'col-md-5 mb-4';
    card.innerHTML = `
      <div class="project-card h-100" tabindex="0">
        <div class="project-card-inner">
          <h4 class="project-title mb-2"><a href="${repo.link}" target="_blank">${repo.repo}</a></h4>
          <p class="project-desc mb-2">${repo.description}</p>
          <div class="project-tech mb-2">
            ${repo.tech.length ? repo.tech.map(t => `<span class="badge badge-pill badge-tech">${t}</span>`).join(' ') : ''}
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}
renderProjects();

// Smooth scroll for sidebar links
document.querySelectorAll('#sidebarNav a.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        // Adjust this offset if you want more/less space above the header
        const offset = 20;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: top,
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

// Project card pop effect on hover/focus
const style = document.createElement('style');
style.innerHTML = `
.project-card {
  background: #071022;
  border-radius: 1rem;
  box-shadow: 0 2px 16px rgba(2,8,23,0.18);
  padding: 2rem 1.5rem;
  transition: transform 0.18s cubic-bezier(.4,2,.6,1), box-shadow 0.18s;
  color: #f6f6f6;
  cursor: pointer;
  outline: none;
}
.project-card:hover, .project-card:focus {
  transform: scale(1.045) translateY(-8px);
  box-shadow: 0 8px 32px rgba(2,8,23,0.32);
  z-index: 2;
}
.project-title a {
  color: #b6e0fe;
  font-size: 1.25rem;
  font-weight: 700;
  text-decoration: none;
}
.project-title a:hover {
  color: #fff;
  text-decoration: underline;
}
.project-desc {
  color: #e3e3e3;
  font-size: 1.05rem;
}
.badge-tech {
  background: #020817;
  color: #b6e0fe;
  border: 1px solid #22345a;
  font-size: 0.95rem;
  margin-right: 0.4em;
  margin-bottom: 0.2em;
  padding: 0.5em 0.9em;
}
`;
document.head.appendChild(style);
document.getElementById('showTechnicalBtn')?.addEventListener('click', function() {
    document.getElementById('skillsFlipContainer').classList.remove('flipped');
});
document.getElementById('showSoftSkillsBtn')?.addEventListener('click', function() {
    document.getElementById('skillsFlipContainer').classList.add('flipped');
});