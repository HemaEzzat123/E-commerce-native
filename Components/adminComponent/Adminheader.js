export let headerContent = `
    <div class="admin-header-branding">
              <img src="../../IMAGES/Logo.png" alt="logo">
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
  document.querySelector(".about").addEventListener("click", () => {});
}
if (document.querySelector(".category")) {
  document.querySelector(".category").addEventListener("click", () => {});
}
if (document.querySelector(".contact")) {
  document.querySelector(".contact").addEventListener("click", () => {});
}

document.querySelector(".dash").addEventListener("click", () => {
  const sidebar = document.querySelector(".adminSb");

  // Toggle the active class to slide in/out
  if (sidebar.style.display === "none" || sidebar.style.left === "-200px") {
    sidebar.style.display = "block";
    setTimeout(() => {
      sidebar.classList.add("active");
      document.querySelector(".dash").style.left = "180px";
      document.querySelector(".dash").style.transform = "rotate(180deg)";
    }, 10); // Slight delay to ensure display property is set before animation
  } else {
    sidebar.classList.remove("active");
    setTimeout(() => {
      sidebar.style.display = "none";
    }, 500); // Match this timeout with your CSS transition duration
    document.querySelector(".dash").style.left = "-4px";
    document.querySelector(".dash").style.transform = "rotate(0)";
  }
});
