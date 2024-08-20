import { header } from "./Components/userComponent/header.js";

let content = document.getElementById("root");


let pageContent = `
    <div class="user-page-content">
            <h1>Home</h1>
            <p>This is the home page</p>
        </div>
`;

let page = document.createElement("div");
page.className = "user-page container";
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
