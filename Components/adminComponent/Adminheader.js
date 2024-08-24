export let headerContent = `
    <div class="admin-header-branding">
        <img class="admin-logo-image" src="https://cdn-icons-png.flaticon.com/512/2591/2591253.png" alt="logo">
        <p class="admin-logo-text">E-commerce</p>
    </div>
    <div class="admin-header-links">
        <ul class="admin-header-links-list">
            <li class="admin-header-links-item home">Home  </li>
            <li class="admin-header-links-item category"> Categories </li>
            <li class="admin-header-links-item about"> About </li>
            <li class="admin-header-links-item contact"> Contact </li>
        </ul>
    </div>
    <div class="admin-header-buttons">
        ${
          localStorage.getItem("admin")
            ? `<button class="admin-header-logout-button">Logout</button>`
            : `<button class="admin-header-login-button">logIn</button>`
        }
    </div>
`;
//  <button class="addCategory" onclick="addCategory">
//    <a href="addCategory.html">add Category</a>
//  </button>;

let header = document.querySelector(".admin-header");
header.innerHTML = headerContent;

// Add event listeners after setting innerHTML
const loginButton = document.querySelector(".admin-header-login-button");
const logoutButton = document.querySelector(".admin-header-logout-button");

if (loginButton) {
  loginButton.addEventListener("click", () => {
    window.location.href = "../../HTML/sharedPages/sign.html";
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("admin");
    window.location.href = "../../HTML/adminPages/dashboard.html";
  });
}

if (document.querySelector(".home")) {
  document.querySelector(".home").addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });
}
if (document.querySelector(".about")) {
  document.querySelector(".about").addEventListener("click", () => {
  });
}
if (document.querySelector(".category")) {
  document.querySelector(".category").addEventListener("click", () => {
  });
}
if (document.querySelector(".contact")) {
  document.querySelector(".contact").addEventListener("click", () => {
  });
}
