// Update sidebar content
let sideBarContent = `
    <div class="menu">
        <ul class="menu-list">
            <li>
                <a class="Side-Bar-buttons active" href="dashboard.html">
                    <i class="fas fa-home"></i>
                    <p>dashboard</p>
                </a>
            </li>
            <li>
                <a class="Side-Bar-buttons" href="#">
                    <i class="fa-solid fa-user"></i>
                    <p>profile</p>
                </a>
            </li>
            <li>
                <a class="Side-Bar-buttons" href="allUser.html">
                    <i class="fas fa-user-group"></i>
                    <p>Users</p>
                </a>
            </li>
          
            <li>
                <a class="Side-Bar-buttons" href="#">
                    <i class="fa-solid fa-cube"></i>
                    <p>Orders</p>
                </a>
            </li>
            <li>
                <a class="Side-Bar-buttons" href="#">
                    <i class="fas fa-cog"></i>
                    <p>settings</p>
                </a>
            </li>
            ${
              localStorage.getItem("admin")
                ? `
                <li class="Side-Bar-buttons log-out">
                    <button class="log-out">
                        <i class="fas fa-sign-out-alt"></i> Log out
                    </button>
                </li>
            `
                : `
                <li class="Side-Bar-buttons">
                    <button class="login">login</button>
                </li>
            `
            }
        </ul>
    </div>
`;

// Set the sidebar content
let sideBar = document.querySelector(".adminSb");
sideBar.innerHTML = sideBarContent;

// Check if elements exist before adding event listeners
const showUsersBtn = document.querySelector(".showUsers");
const loginBtn = document.querySelector(".login");
const logoutBtn = document.querySelector(".log-out");
const addCategoryBtn = document.querySelector(".addCategory");

if (showUsersBtn) {
  showUsersBtn.addEventListener("click", () => {
    window.location.href = "allUser.html";
  });
}

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    document.querySelector(".user-sign").style.display = "block";
    document.querySelector(".user-sign").style.opacity = "1";
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("admin");
    window.location.href = "/HTML/adminPages/dashboard.html";
  });
}

