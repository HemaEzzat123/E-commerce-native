// import { header } from "./Components/userComponent/header.js";
// import { slider } from "./Components/userComponent/slider.js";

// let content = document.getElementById("root");

// // Create the main page structure
// let page = document.createElement("div");
// page.className = "user-page container";

// // Set the initial content
// let pageContent = `
//     <div class="user-home-page-content">
//         <h1>Home</h1>
//         <p>This is the home page</p>
//     </div>
// `;
// page.innerHTML = pageContent;

// // Append the header and slider elements
// content.appendChild(header);
// content.appendChild(slider);
// content.appendChild(page);

// // Handle navigation events
// let home = document.querySelector(".home");
// home.addEventListener("click", () => {
//   pageContent = `
//         <div class="user-page-content">
//             <h1>Home</h1>
//             <p>This is the home page</p>
//         </div>
//     `;
//   page.innerHTML = pageContent;
//   content.insertBefore(slider, page); // Reinsert slider before the page content
// });

// let categories = document.querySelector(".categories");
// categories.addEventListener("click", () => {
//   pageContent = `
//         <div class="user-page-content">
//             <h1>Categories</h1>
//             <ul id="categoryList">
//                 <li>Electronics</li>
//                 <li>Fashion</li>
//                 <li>Home</li>
//                 <li>Books</li>
//             </ul>
//         </div>
//     `;
//   page.innerHTML = pageContent;
//   content.removeChild(slider); // Remove slider when not needed
// });

// let about = document.querySelector(".about");
// about.addEventListener("click", () => {
//   pageContent = `
//         <div class="user-page-content">
//             <h1>About</h1>
//             <p>This is the about page</p>
//         </div>
//     `;
//   page.innerHTML = pageContent;
//   content.removeChild(slider); // Remove slider when not needed
// });

// let contact = document.querySelector(".contact");
// contact.addEventListener("click", () => {
//   pageContent = `
//         <div class="user-page-content">
//             <h1>Contact</h1>
//             <p>This is the contact page</p>
//         </div>
//     `;
//   page.innerHTML = pageContent;
//   content.removeChild(slider); // Remove slider when not needed
// });



import { header } from "./Components/userComponent/header.js";
import { slider } from "./Components/userComponent/slider.js";
import { categoryCard } from "./Components/userComponent/categoryCard.js";

let content = document.getElementById("root");

// Create the main page structure
let page = document.createElement("div");
page.className = "user-page container";

// Function to set the initial content
const setInitialContent = () => {
  let pageContent = `
    <div class="user-home-page-content">
      <h1>Home</h1>
      <p>This is the home page</p>
    </div>
  `;
  page.innerHTML = pageContent;
  page.appendChild(categoryCard); // Append the category cards
};

// Set the initial content
setInitialContent();

// Append the header and slider elements
content.appendChild(header);
content.appendChild(slider);
content.appendChild(page);

// Handle navigation events
let home = document.querySelector(".home");
home.addEventListener("click", () => {
  setInitialContent(); // Reset the content when "Home" is clicked
  content.insertBefore(slider, page); // Reinsert slider before the page content
});

let categories = document.querySelector(".categories");
categories.addEventListener("click", () => {
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
  page.innerHTML = pageContent;
  content.removeChild(slider); // Remove slider when not needed
});

let about = document.querySelector(".about");
about.addEventListener("click", () => {
  let pageContent = `
    <div class="user-page-content">
      <h1>About</h1>
      <p>This is the about page</p>
    </div>
  `;
  page.innerHTML = pageContent;
  content.removeChild(slider); // Remove slider when not needed
});

let contact = document.querySelector(".contact");
contact.addEventListener("click", () => {
  let pageContent = `
    <div class="user-page-content">
      <h1>Contact</h1>
      <p>This is the contact page</p>
    </div>
  `;
  page.innerHTML = pageContent;
  content.removeChild(slider); // Remove slider when not needed
});
