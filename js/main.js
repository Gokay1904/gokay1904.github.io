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

// Pinlenen projeleri backend API'dan bir defa çekip, constant olarak JS'e yazmak için örnek:
const pinnedRepos = [
  {
    repo: "PINN-TurbulentFlow-PirateNET",
    link: "https://github.com/Gokay1904/PINN-TurbulentFlow-PirateNET",
    description: "Predicting the pressure and velocity fields of a fluid using the RANS approach with Physics-Informed Neural Networks, specifically Physics Residual Adaptive Networks (PirateNET).",
    tech: ["Python", "PyTorch", "Deep Learning", "Physics-Informed NN"]
  },
  {
    repo: "Financial-Forecasting-with-AI-Transformer-Models",
    link: "https://github.com/Gokay1904/Financial-Forecasting-with-AI-Transformer-Models",
    description: "Analyzing sentiment scores from Twitter texts using transformer models (RoBERTa, BERT) and VADER, then comparing them with actual stock values by treating the problem as both numerical and categorical.",
    tech: ["Python", "Transformers", "NLP", "BERT", "RoBERTa"]
  },
  {
    repo: "ITU-Physics-Data-Analysis",
    link: "https://github.com/Gokay1904/ITU-Physics-Data-Analysis",
    description: "A repository containing projects from my university courses, focusing on solving real-world problems such as cancer detection and particle detection.",
    tech: ["Python", "Jupyter Notebook", "Data Analysis"]
  },
  {
    repo: "ITU-Physics-Computational-Analysis",
    link: "https://github.com/Gokay1904/ITU-Physics-Computational-Analysis",
    description: "A repository containing solutions to some of the questions in the computational analysis methods courses at my university. It includes applications developed in various languages such as Matlab, Python, and C++.",
    tech: ["Python", "Matlab", "C++", "Jupyter Notebook"]
  }
];

// Projeleri HTML'e bastırmak için:
function renderProjects() {
  const container = document.getElementById('pinned-projects');
  if (!container) return;
  container.innerHTML = '';
  pinnedRepos.forEach(repo => {
    const card = document.createElement('div');
    card.className = 'col-md-5 mb-4';
    card.innerHTML = `
      <div class="project-card h-100" tabindex="0">
        <div class="project-card-inner">
          <h4 class="project-title mb-2"><a href="${repo.link}" target="_blank">${repo.repo}</a></h4>
          <p class="project-desc mb-2">${repo.description}</p>
          <div class="project-tech mb-2">
            ${repo.tech.map(t => `<span class="badge badge-pill badge-tech">${t}</span>`).join(' ')}
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
        const offset = 20; // Adjust if you have a fixed header
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({
          top: top,
          behavior: 'smooth'
        });
      }
    }
  });
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
const techBtn = document.getElementById('showTechnicalBtn');
const softBtn = document.getElementById('showSoftSkillsBtn');
const flipContainer = document.getElementById('skillsFlipContainer');

techBtn?.addEventListener('click', function() {
    flipContainer.classList.remove('flipped');
    techBtn.classList.add('active', 'btn-skill-active');
    softBtn.classList.remove('active', 'btn-skill-active');
});
softBtn?.addEventListener('click', function() {
    flipContainer.classList.add('flipped');
    softBtn.classList.add('active', 'btn-skill-active');
    techBtn.classList.remove('active', 'btn-skill-active');
});

document.querySelectorAll('.header-social-icons a.social-icon-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.header-social-icons a.social-icon-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 1500); // Hide after 1.5s
        window.open(this.href, '_blank');
    });
});

document.addEventListener('DOMContentLoaded', function() {
  const emailLink = document.getElementById('email-link');
  if (emailLink) {
    emailLink.addEventListener('click', function(e) {
      e.preventDefault();
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
});

document.getElementById('createBlogBtn').onclick = function() {
    window.location.href = 'blog-edit.html';
};

function renderBlogs() {
    const blogList = document.getElementById('blog-list');
    if (!blogList) return;
    const blogs = JSON.parse(localStorage.getItem('myBlogs') || '[]');
    blogList.innerHTML = '';
    blogs.forEach(blog => {
        blogList.innerHTML += `
            <div class="col-md-6 col-lg-4 mb-4">
                <div class="card h-100 blog-card position-relative" style="cursor:pointer;">
                    <img src="${blog.image}" class="card-img-top" alt="${blog.header}" style="height:180px;object-fit:cover;">
                    <div class="card-body">
                        <h5 class="card-title">${blog.header}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${blog.title}</h6>
                        <p class="card-text">${blog.description}</p>
                        <div class="d-flex justify-content-end" style="gap:0.5rem;">
                            <button class="btn btn-sm btn-warning" onclick="event.stopPropagation(); editBlog(${blog.id})">Edit</button>
                            <button class="btn btn-sm btn-danger" onclick="event.stopPropagation(); confirmDeleteBlog(${blog.id})">Delete</button>
                        </div>
                    </div>
                    <div class="stretched-link" onclick="openBlog(${blog.id})" style="position:absolute;top:0;left:0;width:100%;height:100%;z-index:1;"></div>
                </div>
            </div>
        `;
    });
}
window.renderBlogs = renderBlogs;
renderBlogs();

window.editBlog = function(id) {
    window.location.href = `blog-edit.html?id=${id}`;
};

window.confirmDeleteBlog = function(id) {
    if (confirm('Are you sure you want to delete this blog post?')) {
        let blogs = JSON.parse(localStorage.getItem('myBlogs') || '[]');
        blogs = blogs.filter(b => b.id !== id);
        localStorage.setItem('myBlogs', JSON.stringify(blogs));
        renderBlogs();
    }
};

window.openBlog = function(id) {
    const blogs = JSON.parse(localStorage.getItem('myBlogs') || '[]');
    localStorage.setItem('selectedBlog', JSON.stringify(blogs.find(b => b.id === id)));
    window.location.href = 'blog.html';
};