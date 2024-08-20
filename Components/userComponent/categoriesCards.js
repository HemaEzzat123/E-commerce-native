import { getAllCategories } from "./../../APIsConnection/user.js";

let categoriesContainer = document.querySelector(".user-categories-container");

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
          </div>
      `
        )
        .join("")}
    `;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

displayCategories(); // Call the async function
