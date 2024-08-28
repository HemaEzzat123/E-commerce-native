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
                <a  class="Side-Bar-buttons" href="addCategory.html">
        <i class="fas fa-table"></i>
        <p>AddCategory</p>
                </a>
            </li>
            <li>
                <a  class="Side-Bar-buttons" href="#">
<i class="fa-solid fa-cube"></i>
      <p>Orders</p>
                </a>
            </li>
            <li>
                <a  class="Side-Bar-buttons" href="#">
                    <i class="fas fa-cog"></i>
                    <p>settings</p>
                </a>
            </li>
            <li class=" Side-Bar-buttons log-out">
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
