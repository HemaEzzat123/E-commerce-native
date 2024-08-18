import { headerContent } from "./Components/header.js";

let content = document.getElementById("root");

// let headerContent = `
//     <div class="user-header-branding">
//         <img class="user-logo-image" src="https://cdn-icons-png.flaticon.com/512/2591/2591253.png" alt="logo">
//         <p class="user-logo-text"></p>E-commerce</p>
//     </div>
//     <div class="user-header-links">
//         <ul class="user-header-links-list">
//             <li class="user-header-links-item home"> Home </li>
//             <li class="user-header-links-item categories"> Categories </li>
//             <li class="user-header-links-item about"> About </li>
//             <li class="user-header-links-item contact"> Contact </li>
//         </ul>
//     </div>
//     <div class="user-header-logout">
//         <button class="user-header-logout-button">Logout</button>
//     </div>
// `;

let header = document.createElement("div");
header.className = "user-header";
header.innerHTML = headerContent;

let pageContent = `
    <div class="user-page-content">
        <h1>Categories</h1>
        <ul id="categoryList">
            <li>Electronics</li>
            <li>Fashion</li>
            <li>Home</li>
            <li>Books</li>
        </ul>
    </div>
`;

let page = document.createElement("div");
page.className = "user-page";
page.innerHTML = pageContent;

content.appendChild(header);
content.appendChild(page);

let home = document.querySelector(".home");
home.addEventListener("click", () => {
  pageContent = `
        <div class="user-page-content">
            <h1>Home</h1>
            <p>This is the home page</p>
        </div>
    `;
  page.innerHTML = pageContent;
});

let categories = document.querySelector(".categories");
categories.addEventListener("click", () => {
  pageContent = `
        <div class="user-page-content">
            <h1>Categories</h1>
            <ul id="categoryList">
                <li>Electronics</li>
                <li>Fashion</li>
                <li>Home</li>
                <li>Books</li>
            </ul>
        </div>
    `;
  page.innerHTML = pageContent;
});

let about = document.querySelector(".about");
about.addEventListener("click", () => {
  pageContent = `
        <div class="user-page-content">
            <h1>About</h1>
            <p>This is the about page</p>
        </div>
    `;
  page.innerHTML = pageContent;
});

let contact = document.querySelector(".contact");
contact.addEventListener("click", () => {
  pageContent = `
        <div class="user-page-content">
            <h1>Contact</h1>
            <p>This is the contact page</p>
        </div>
    `;
  page.innerHTML = pageContent;
});
