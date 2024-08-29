import { getAllCategories } from "./../../APIsConnection/user.js";

let categoriesContainer = document.querySelector(
  ".user-categories-container .categories"
);
// let categoriesContainer2 = document.querySelector(
//   ".user-categories-container2 .categories2"
// );

const displayCategories = async () => {
  try {
    let categories = await getAllCategories();

    categoriesContainer.innerHTML = `
      ${categories
        .map(
          (category) => `
          <div class="category-card">
              <img   src="../../IMAGES/${category.image}" alt="${category.name}">
              <div class="category-card-content">
                <h3>${category.name}</h3>
                <button class="category-card-button" onclick="viewProducts(${category.id})">View Products</button>
              </div>
          </div>
      `
        )
        .join("")}
    `;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Define viewProducts function in the global scope
window.viewProducts = (categoryId) => {
  window.location.href = `categoryDetails.html?id=${categoryId}`;
};

displayCategories();


// const displayCategories2 = async () => {
//   try {
//     let categories2 = await getAllCategories();

//     categoriesContainer2.innerHTML = `
//       ${categories2
//         .map(
//           (category) => `
//           <div class="category-card">
//               <img src="../../IMAGES/${category.image}" alt="${category.name}">
//               <div class="category-card-content">
//                 <h3>${category.name}</h3>
//                 <p>${category.description}</p>
//                 <button class="category-card-button" onclick="viewProducts(${category.id})">View Products</button>
//               </div>
//           </div>
//       `
//         )
//         .join("")}
//     `;
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//   }
// };

// // Define viewProducts function in the global scope
// window.viewProducts2 = (categoryId) => {
//   window.location.href = `categoryDetails.html?id=${categoryId}`;
// };

// displayCategories2();
