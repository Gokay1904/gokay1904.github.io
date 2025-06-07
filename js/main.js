// This file contains custom JavaScript code for the website, which can be used to add interactivity or manipulate the DOM.

// --- Background Color Lerp on Scroll ---
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY || window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const percent = Math.min(scrollY / docHeight, 1);

    function lerp(a, b, t) { return Math.round(a + (b - a) * t); }
    const r = lerp(2, 1, percent);
    const g = lerp(8, 5, percent);
    const b = lerp(23, 16, percent);

    document.body.style.background = `#${r.toString(16).padStart(2,'0')}${g.toString(16).padStart(2,'0')}${b.toString(16).padStart(2,'0')}`;
    document.body.style.transition = 'background 0.7s';
});

// --- Pinned Projects ---
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

// --- Smooth Scroll for Sidebar Links ---
document.querySelectorAll('#sidebarNav a.nav-link').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
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

// --- Project Card Pop Effect ---
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
  margin-right: 0.39em;
  margin-bottom: 0.2em;
  padding: 0.5em 0.9em;
}
`;
document.head.appendChild(style);

// --- Skills Flip Card ---
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

// --- Social Icons Active State ---
document.querySelectorAll('.header-social-icons a.social-icon-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.header-social-icons a.social-icon-link').forEach(l => l.classList.remove('active'));
        this.classList.add('active');
        setTimeout(() => this.classList.remove('active'), 1500);
        window.open(this.href, '_blank');
    });
});

// --- Email Link Scroll ---
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

// --- Admin Auth ---
async function askAdmin() {
    const password = prompt("Enter admin password:");
    if (!password) return;
    const res = await fetch('/.netlify/functions/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
    });
    if (res.ok) {
        localStorage.setItem('isAdmin', 'true');
        location.reload();
    } else {
        alert('Wrong password!');
    }
}

// --- Blog Functions ---
async function fetchBlogs() {
    const res = await fetch('/.netlify/functions/get-blogs');
    return await res.json();
}

function isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
}

async function renderBlogs() {
    const blogCarousel = document.getElementById('blog-carousel');
    if (!blogCarousel) return;
    const blogs = await fetchBlogs();
    if (!Array.isArray(blogs)) {
        blogCarousel.innerHTML = '<div class="text-danger">Failed to load blogs.</div>';
        return;
    }
    blogCarousel.innerHTML = '';
    blogs.forEach(blog => {
        blogCarousel.innerHTML += `
            <div class="col-md-4 mb-4" style="min-width:340px;max-width:340px;">
                <div class="card h-100 blog-post-card position-relative p-0" style="overflow:hidden;">
                    ${isAdmin() ? `
                    <div class="d-flex justify-content-end align-items-start p-2" style="position:absolute;top:0;right:0;z-index:2;gap:0.5rem;">
                        <button class="btn btn-sm btn-warning" onclick="event.stopPropagation(); editBlog(${blog.id})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="event.stopPropagation(); confirmDeleteBlog(${blog.id})">Delete</button>
                    </div>` : ''}
                    <div onclick="openBlog(${blog.id})" style="cursor:pointer;">
                        <img src="${blog.image}" class="card-img-top" alt="${blog.header}" style="height:180px;object-fit:cover;">
                        <div class="card-body">
                            <h5 class="card-title">${blog.header}</h5>
                            <h6 class="card-subtitle mb-2 text-muted">${blog.title}</h6>
                            <p class="card-text">${blog.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    // Show/hide create post button for admin
    const createBtn = document.getElementById('createBlogBtn');
    if (createBtn) {
        createBtn.style.display = isAdmin() ? 'inline-block' : 'none';
    }
}

// Render blogs on page load
document.addEventListener('DOMContentLoaded', renderBlogs);

// --- Create Post Button ---
function updateCreatePostButton() {
    const btn = document.getElementById('createBlogBtn');
    if (btn) btn.style.display = isAdmin() ? 'inline-block' : 'none';
}
document.addEventListener('DOMContentLoaded', updateCreatePostButton);

// --- Only admin can open create post page ---
const createBlogBtn = document.getElementById('createBlogBtn');
if (createBlogBtn) {
    createBlogBtn.onclick = function() {
        if (isAdmin()) {
            window.location.href = 'blog-edit.html';
        } else {
            alert('Only admin can create posts.');
        }
    };
}

// --- Blog Edit Form Submission ---
document.addEventListener('DOMContentLoaded', function() {
    const editForm = document.getElementById('editBlogForm');
    if (editForm) {
        editForm.onsubmit = async function(e) {
            e.preventDefault();
            if (!isAdmin()) {
                alert('Only admin can create posts.');
                return false;
            }
            const blog = {
                header: document.getElementById('blogHeader').value,
                title: document.getElementById('blogTitle').value,
                description: document.getElementById('blogDesc').value,
                image: document.getElementById('blogImage').value,
                text: document.getElementById('blogText').value
            };

            const res = await fetch('/.netlify/functions/create-blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blog)
            });

            let data;
            try {
                data = await res.json();
            } catch (e) {
                alert('Server error: Could not parse response.');
                return;
            }
            if (data.success) {
                alert('Blog post created!');
                window.location.href = 'index.html#blogs';
            } else {
                alert('Error: ' + (data.error || 'Unknown error'));
            }
        };
    }
});

async function confirmDeleteBlog(id) {
    if (!isAdmin()) {
        alert('Only admin can delete posts.');
        return;
    }
    if (confirm('Are you sure you want to delete this blog post?')) {
        const res = await fetch(`/.netlify/functions/delete-blog?id=${id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        if (data.success) {
            alert('Blog post deleted!');
            renderBlogs(); // Refresh the blog list
        } else {
            alert('Error deleting blog: ' + (data.error || 'Unknown error'));
        }
    }
}

function openBlog(id) {
    window.location.href = `blog-read.html?id=${id}`;
}

function editBlog(id) {
    if (!isAdmin()) {
        alert('Only admin can edit posts.');
        return;
    }
    window.location.href = `blog-edit.html?id=${id}`;
}

document.addEventListener('DOMContentLoaded', async function() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    // If editing, fetch and fill form
    if (id) {
        const res = await fetch(`/.netlify/functions/get-blog?id=${id}`);
        if (res.ok) {
            const blog = await res.json();
            if (blog && blog.id) {
                document.getElementById('blogHeader').value = blog.header || '';
                document.getElementById('blogTitle').value = blog.title || '';
                document.getElementById('blogDesc').value = blog.description || '';
                document.getElementById('blogImage').value = blog.image || '';
                document.getElementById('blogText').value = blog.text || '';
            } else {
                alert('Blog post not found!');
                window.location.href = 'index.html#blogs';
            }
        } else {
            alert('Error fetching blog post!');
            window.location.href = 'index.html#blogs';
        }
    }

    // Form submission (create or update)
    const form = document.getElementById('editBlogForm');
    if (form) {
        form.onsubmit = async function(e) {
            e.preventDefault();
            if (!isAdmin()) {
                alert('Only admin can edit posts.');
                return false;
            }
            const blog = {
                id, // include id for update
                header: document.getElementById('blogHeader').value,
                title: document.getElementById('blogTitle').value,
                description: document.getElementById('blogDesc').value,
                image: document.getElementById('blogImage').value,
                text: document.getElementById('blogText').value
            };
            const res = await fetch('/.netlify/functions/create-blog', {
                method: id ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blog)
            });
            let data;
            try {
                data = await res.json();
            } catch (e) {
                alert('Server error: Could not parse response.');
                return;
            }
            if (data.success) {
                alert('Blog post saved!');
                window.location.href = 'index.html#blogs';
            } else {
                alert('Error: ' + (data.error || 'Unknown error'));
            }
        };
    }
});

document.addEventListener('DOMContentLoaded', function() {
  const sidebarNav = document.getElementById('sidebarNav');
  const navbarToggle = document.getElementById('navbarToggle');

  if (navbarToggle && sidebarNav) {
    navbarToggle.addEventListener('click', function() {
      if (sidebarNav.style.top === '0px' || sidebarNav.style.top === '') {
        sidebarNav.style.top = '-60px';
      } else {
        sidebarNav.style.top = '0px';
      }
    });
    // Menü dışına tıklayınca kapansın isterseniz:
    document.addEventListener('click', function(e) {
      if (window.innerWidth <= 900 && !sidebarNav.contains(e.target) && e.target !== navbarToggle) {
        sidebarNav.style.top = '-60px';
      }
    });
  }
});