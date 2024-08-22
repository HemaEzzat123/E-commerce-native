// Update sidebar content
let sideBarContent = `
        <div class="menu">
        <ul>

            <li>
                <a class="active" href="dashboard.html">
                    <i class="fas fa-home"></i>
                    <p>dashboard</p>
                </a>
            </li>
                     <li>
                <a class="" href="#">
<i class="fa-solid fa-user"></i>
                    <p>profile</p>
                </a>
            </li>
            <li>
                <a href="allUser.html">
                    <i class="fas fa-user-group"></i>
                    <p>Users</p>
                </a>
            </li>
            <li>
                <a href="addCategory.html">
        <i class="fas fa-table"></i>
        <p>Add Category</p>
                </a>
            </li>
            <li>
                <a href="#">
<i class="fa-solid fa-cube"></i>
      <p>Orders</p>
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="fas fa-cog"></i>
                    <p>settings</p>
                </a>
            </li>
            <li class="log-out">
                <a href="#">
                    <i class="fas fa-sign-out"></i>
                    <p>Log Out</p>
                </a>
            </li>
        </ul>
    </div>
        
        `;

let sideBar = document.querySelector(".adminSb");
sideBar.innerHTML = sideBarContent;

document.querySelector(".showUsers").addEventListener("click", () => {
  window.location.href = "allUser.html";
});
