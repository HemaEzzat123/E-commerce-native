import { getAllCategories } from "./../../APIsConnection/admin.js";

let categoriesContainer = document.querySelector(".admin-categories-container");

const displayCategories = async () => {
  try {
    let categories = await getAllCategories();

    categoriesContainer.innerHTML = `

      ${categories
        .map(
          (category) => `
          <div class="category-card">
              <img src="../../IMAGES/${category.image}" alt="${category.name}">
              <h3>${category.name}</h3>
              <p>${category.description}</p>
              <button class="category-card-button" onclick="viewProducts(${category.id})">View Products</button>
              <button class="category-card-button" onclick="addProducts(${category.id})">add Products</button>
              

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

// add products
window.addProducts = (categoryId) => {
  window.location.href = `addProduct.html?id=${categoryId}`;
};

window.addCategory = (categoryId) => {
  window.location.href = `addCategory.html?id=${categoryId}`;
};

// Initialize the displayCategories function when the page load

displayCategories();
