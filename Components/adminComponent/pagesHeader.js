export let headerContent = `
    <div class="admin-header-branding">
       <a class="admin-header-links-item home" href="/HTML/adminPages/dashboard.html"><img src="../../IMAGES/Logo.png" alt="logo"></a>
    </div>
    <div class="admin-header-buttons">
        ${
          localStorage.getItem("admin")
            ? `<button class="admin-header-logout-button">Logout</button>`
            : `<button class="admin-header-login-button">logIn</button>`
        }
    </div>
`;

window.addCategory = () => {
  document.querySelector(".admin-category-form").style.display = "flex";
  document.querySelector(".admin-category-form").style.opacity = "1";
};

// Setting inner HTML content for the header
let header = document.querySelector(".admin-header");
header.innerHTML = headerContent;



const loginButton = document.querySelector(".admin-header-login-button");
const logoutButton = document.querySelector(".admin-header-logout-button");

if (loginButton) {
  loginButton.addEventListener("click", () => {
    document.querySelector(".user-sign").style.display = "block";
    document.querySelector(".user-sign").style.opacity = "1";
  });
}

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("admin");
    window.location.href = "../../HTML/adminPages/dashboard.html";
  });
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
