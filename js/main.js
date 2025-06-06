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

// Otomatik olarak GitHub pinned projelerini çek ve göster
fetch('https://gh-pinned-repos.egoist.dev/?username=Gokay1904')
  .then(response => response.json())
  .then(repos => {
    const container = document.getElementById('pinned-projects');
    if (!container) return;
    container.innerHTML = '';
    repos.forEach(repo => {
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
  });