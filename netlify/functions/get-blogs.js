import { neon } from '@netlify/neon';

export default async () => {
  try {
    const sql = neon();
    const result = await sql`
      SELECT id, header, title, description, image, text, created_at
      FROM posts
      ORDER BY created_at DESC
    `;
    return Response.json(result); // result should be an array
  } catch (err) {
    console.error('get-blogs error:', err);
    return Response.json([], { status: 500 }); // Return an empty array on error
  }
};

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
        console.error('Error fetching blogs:', blogs);
        blogCarousel.innerHTML = '<div class="text-danger">Failed to load blogs.</div>';
        return;
    }
    blogCarousel.innerHTML = '';
    blogs.forEach(blog => {
        blogCarousel.innerHTML += `
            <div class="col-md-4 mb-4" style="min-width:340px;max-width:340px;">
                <div class="card h-100 blog-card position-relative p-0" style="overflow:hidden;">
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

// Call renderBlogs on page load
document.addEventListener('DOMContentLoaded', renderBlogs);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editBlogForm');
    if (form) {
        form.onsubmit = async function(e) {
            // ...your code...
        };
    }
});