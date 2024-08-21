export let headerContent = `
    <div class="user-header-branding">
        <img class="user-logo-image" src="https://cdn-icons-png.flaticon.com/512/2591/2591253.png" alt="logo">
        <p class="user-logo-text"></p>E-commerce</p>
    </div>
    <div class="user-header-links">
        <ul class="user-header-links-list">
            <li class="user-header-links-item home"> Home </li>
            <li class="user-header-links-item categories"> Categories </li>
            <li class="user-header-links-item about"> About </li>
            <li class="user-header-links-item contact"> Contact </li>
        </ul>
    </div>

    <div class="user-header-buttons">
        ${
          localStorage.getItem("user")
            ? `<button class="user-header-logout-button">Logout</button>`
            : `<button class="user-header-login-button">Login</button>`
        }
    </div>
`;

let header = document.querySelector(".user-header");
header.innerHTML = headerContent;

const loginButton = document.querySelector(".user-header-login-button");
const logoutButton = document.querySelector(".user-header-logout-button");

loginButton.addEventListener("click", () => {
  document.querySelector(".user-sign").style.display = "block";
  document.querySelector("body").style.opacity = "0.5";
});
