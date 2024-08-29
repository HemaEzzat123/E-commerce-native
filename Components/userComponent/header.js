export let headerContent = `
    <div class="user-header-branding">
        <img src="../../IMAGES/Logo.png" alt="logo">
    </div>
    <div class="user-header-links">
        <ul class="user-header-links-list">
            <li class="user-header-links-item home"> Home </li>
            <li><a class="admin-header-links-item category" href="#categories">Categories</a></li>
            <li><a href="#user-category-footer" class="admin-header-links-item about">About</a></li>
            <li><a href="#user-category-footer" class="admin-header-links-item contact">Contact</a></li>
        </ul>
    </div>
    <div class="user-header-buttons">
        ${
          localStorage.getItem("user")
            ? `<button class="user-header-logout-button">Logout</button>
               <a href="/HTML/userPages/wishlist.html" class="user-header-wishlist-button"><i class="fa-solid fa-heart"></i></a>
               <a href="/HTML/userPages/cart.html" class="user-header-cart-button"><i class="fa-solid fa-cart-shopping"></i></a>
            `
            : `<button class="user-header-login-button " onclick="showSignForm()">Login</button>`
        }
        
    </div>
`;

let header = document.querySelector(".user-header");
header.innerHTML = headerContent;

// Add event listeners after setting innerHTML
const loginButton = document.querySelector(".user-header-login-button");
const logoutButton = document.querySelector(".user-header-logout-button");

if (loginButton) {
  loginButton.addEventListener("click", () => {
    document.querySelector(".user-sign").style.display = "block";
    document.querySelector(".user-sign").style.opacity = "1";
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.reload();
  });
}
