import { getAllCategories } from "./../../APIsConnection/admin.js";

let categoriesContainer = document.querySelector(".admin-categories-container");

// Function to delete a category
const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(`http://localhost:4000/categories/${categoryId}`);
    displayCategories(); // Update the display after deletion
  } catch (error) {
    console.error("Error deleting category:", error);
  }
};

// Function to edit a category
const editCategory = async (categoryId) => {
  // Find the category to edit
  const categoryCard = document.querySelector(
    `.category-card[data-category-id="${categoryId}"]`
  );

  // Get the current values to pre-fill the edit form
  const currentName = categoryCard.querySelector("h3").innerText;
  const currentDescription = categoryCard.querySelector("p").innerText;
  const currentImage = categoryCard.querySelector("img").innerText;
  // Prompt user for new details (replace with a proper form or modal in production)
  const newName = prompt("Enter new category name:", currentName);
  const newDescription = prompt(
    "Enter new category description:",
    currentDescription
  );
  const newImage = prompt("Enter new category image URL:", currentImage);

  if (newName && newDescription && newImage) {
    try {
      await axios.put(`http://localhost:4000/categories/${categoryId}`, {
        name: newName,
        description: newDescription,
        image: newImage,
      });
      displayCategories(); // Refresh categories after edit
    } catch (error) {
      console.error("Error editing category:", error);
    }
  }
};

// Function to display categories
const displayCategories = async () => {
  try {
    let categories = await getAllCategories();

    categoriesContainer.innerHTML = `
      ${categories
        .map(
          (category) => `
          <div class="category-card" data-category-id="${category.id}">
              <button class="delete-category">X</button>
              <img src="../../IMAGES/${category.image}" alt="${category.name}">
              <h3>${category.name}</h3>
              <p>${category.description}</p>
              <button class="category-card-button" onclick="viewProducts(${category.id})">View Products</button>
              <button class="category-card-button" onclick="addProducts(${category.id})">Add Products</button>
              <button class="edit-category"><i class="fa-solid fa-pencil"></i></button> <!-- New Edit button -->
          </div>
      `
        )
        .join("")}
    `;

    // Attach event listeners to the delete and edit buttons after rendering
    document.querySelectorAll(".delete-category").forEach((button) => {
      button.addEventListener("click", () => {
        const categoryId = button
          .closest(".category-card")
          .getAttribute("data-category-id");
        deleteCategory(categoryId);
      });
    });

    document.querySelectorAll(".edit-category").forEach((button) => {
      button.addEventListener("click", () => {
        const categoryId = button
          .closest(".category-card")
          .getAttribute("data-category-id");
        // editCategory(categoryId);
        window.location.href = `editCategory.html?id=${categoryId}`;
      });
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

// Define viewProducts function in the global scope
window.viewProducts = (categoryId) => {
  window.location.href = `categoryDetails.html?id=${categoryId}`;
};

// Define addProducts function in the global scope
window.addProducts = (categoryId) => {
  window.location.href = `addProduct.html?id=${categoryId}`;
};

// Initialize the displayCategories function when the page loads
displayCategories();
