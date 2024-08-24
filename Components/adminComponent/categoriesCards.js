import { getAllCategories } from "./../../APIsConnection/admin.js";

let categoriesContainer = document.querySelector(
  ".admin-categories-container .categories"
);

// Function to delete a category
const deleteCategory = async (categoryId) => {
  try {
    await axios.delete(`http://localhost:4000/categories/${categoryId}`);
    displayCategories(); // Update the display after deletion
  } catch (error) {
    console.error("Error deleting category:", error);
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
      <div class="category-card" data-category-id="${category.id}" style="background-image: url('../../IMAGES/${category.image}');">
              <div class="topBtns"><button class="delete-category"><i class="fa-solid fa-xmark"></i></button>
               <div> <button class="edit-category"><i class="fa-solid fa-pencil"></i></button> 
              <button class="addProduct-category" onclick="addProducts(${category.id})"><i class="fa-solid fa-plus"></i></button></div>
              </div>
             
             
             

              
              <button class="category-card-button" onclick="viewProducts(${category.id})">${category.name}</button>
              
             
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
