function showSignup() {
  document.getElementById("loginPage").classList.add("hidden");
  document.getElementById("signupPage").classList.remove("hidden");
}

function showLogin() {
  document.getElementById("signupPage").classList.add("hidden");
  document.getElementById("loginPage").classList.remove("hidden");
}

// ===== SIGNUP =====
function signup() {
  let email = document.getElementById("signupEmail").value;
  let password = document.getElementById("signupPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({ email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Signup successful!");
  showLogin();
}

// ===== LOGIN =====
function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem("currentUser", email);

    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");

    showPosts();
  } else {
    alert("Invalid email or password");
  }
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

// ===== ADD POST =====
function addPost() {
  let text = document.getElementById("postInput").value;

  if (text === "") return alert("Write something!");

  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.push({
    id: Date.now(),
    text: text,
    user: localStorage.getItem("currentUser")
  });

  localStorage.setItem("posts", JSON.stringify(posts));

  document.getElementById("postInput").value = "";
  showPosts();
}

// ===== SHOW POSTS =====
function showPosts() {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  let currentUser = localStorage.getItem("currentUser");

  let postDiv = document.getElementById("posts");
  postDiv.innerHTML = "";

  posts.forEach(post => {
    if (post.user === currentUser) {
      postDiv.innerHTML += `
        <div class="post">
          <p>${post.text}</p>
          <button onclick="deletePost(${post.id})">Delete</button>
          <button onclick="editPost(${post.id})">Edit</button>
        </div>
      `;
    }
  });
}

// ===== DELETE POST =====
function deletePost(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts = posts.filter(p => p.id !== id);

  localStorage.setItem("posts", JSON.stringify(posts));
  showPosts();
}

// ===== UPDATE POST =====
function editPost(id) {
  let posts = JSON.parse(localStorage.getItem("posts")) || [];

  let post = posts.find(p => p.id === id);

  let newText = prompt("Edit your post:", post.text);

  if (newText !== null && newText !== "") {
    post.text = newText;
    localStorage.setItem("posts", JSON.stringify(posts));
    showPosts();
  }
}

// ===== AUTO LOGIN =====
window.onload = function () {
  let user = localStorage.getItem("currentUser");

  if (user) {
    document.getElementById("loginPage").classList.add("hidden");
    document.getElementById("dashboard").classList.remove("hidden");
    showPosts();
  }
};



Swal.fire({
  title: "Welcome Back To Our Website..!",
  imageUrl: "https://cdn.shopify.com/s/files/1/0559/9513/8207/products/Welcome_Hearteyesemoji_60x40_b898c70d-8028-4713-9c11-9242f49ce576.jpg?v=1622080032",
  showClass: { popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    ` },
  hideClass: { popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    ` }
});