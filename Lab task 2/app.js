const apiBaseURL = 'https://jsonplaceholder.typicode.com/posts';
let editingPostId = null;

document.addEventListener("DOMContentLoaded", loadPosts);

// Load posts and display them
function loadPosts() {
  fetch(apiBaseURL)
    .then(response => response.json())
    .then(data => {
      const postsContainer = document.getElementById('postsContainer');
      postsContainer.innerHTML = '';
      data.slice(0, 10).forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
        postElement.setAttribute('id', `post-${post.id}`);
        postElement.innerHTML = `
          <div>
            <h5>${post.title}</h5>
            <p>${post.body}</p>
          </div>
          <div>
            <button class="btn btn-sm btn-warning me-2" onclick="startEditing(${post.id})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="removePost(${post.id})">Delete</button>
          </div>
        `;
        postsContainer.appendChild(postElement);
      });
    });
}

// Save new post or update existing post
function savePost() {
  const title = document.getElementById('postTitle').value.trim();
  const body = document.getElementById('postBody').value.trim();

  if (!title || !body) {
    alert("Please fill out both fields!");
    return;
  }

  if (editingPostId) {
    // Update existing post
    fetch(`${apiBaseURL}/${editingPostId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, userId: 1 }),
    })
      .then(response => response.json())
      .then(updatedPost => {
        const postElement = document.getElementById(`post-${updatedPost.id}`);
        postElement.querySelector('h5').textContent = updatedPost.title;
        postElement.querySelector('p').textContent = updatedPost.body;
        resetForm();
      });
  } else {
    // Create a new post
    fetch(apiBaseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, body, userId: 1 }),
    })
      .then(response => response.json())
      .then(newPost => {
        const postsContainer = document.getElementById('postsContainer');
        const postElement = document.createElement('div');
        postElement.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
        postElement.setAttribute('id', `post-${newPost.id}`);
        postElement.innerHTML = `
          <div>
            <h5>${newPost.title}</h5>
            <p>${newPost.body}</p>
          </div>
          <div>
            <button class="btn btn-sm btn-warning me-2" onclick="startEditing(${newPost.id})">Edit</button>
            <button class="btn btn-sm btn-danger" onclick="removePost(${newPost.id})">Delete</button>
          </div>
        `;
        postsContainer.prepend(postElement);  // Newest post at the top
        resetForm();
      });
  }
}

function startEditing(id) {
  fetch(`${apiBaseURL}/${id}`)
    .then(response => response.json())
    .then(post => {
      document.getElementById('postTitle').value = post.title;
      document.getElementById('postBody').value = post.body;
      editingPostId = post.id;
      document.querySelector('#postModalLabel').textContent = "Edit Post";
      new bootstrap.Modal(document.getElementById('postModal')).show();
    });
}

function removePost(id) {
  fetch(`${apiBaseURL}/${id}`, { method: 'DELETE' })
    .then(() => {
      const postElement = document.getElementById(`post-${id}`);
      postElement.remove();
    });
}

function resetForm() {
  document.getElementById('postTitle').value = '';
  document.getElementById('postBody').value = '';
  editingPostId = null;
  document.querySelector('#postModalLabel').textContent = "New Post";
  new bootstrap.Modal(document.getElementById('postModal')).hide();
}
