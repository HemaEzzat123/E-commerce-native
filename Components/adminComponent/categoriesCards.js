import { getAllCategories } from "./../../APIsConnection/admin.js";

document.addEventListener("DOMContentLoaded", () => {
  const categoriesContainer = document.querySelector(
    ".admin-categories-container .categories"
  );
  const formContainer = document.querySelector(
    ".admin-category-form-container"
  );

  if (!categoriesContainer) {
    console.error("Categories container not found in the DOM.");
    return;
  }

  if (!formContainer) {
    console.error("Edit form container not found in the DOM.");
    return;
  }

  // Function to get category ID from URL
  const getCategoryIdFromURL = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
  };

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
      const categories = await getAllCategories();
      categoriesContainer.innerHTML = categories
        .map(
          (category) => `
      <div class="category-card" data-category-id="${category.id}" style="background-image: url('../../IMAGES/${category.image}');">
        <div class="topBtns">
          <button class="delete-category"><i class="fa-solid fa-xmark"></i></button>
          <div>
            <button class="edit-category"><i class="fa-solid fa-pencil"></i></button>
            <button class="addProduct-category" onclick="addProducts(${category.id})"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <button class="category-card-button" onclick="viewProducts(${category.id})">${category.name}</button>
      </div>`
        )
        .join("");

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
        button.addEventListener("click", async () => {
          const categoryId = button
            .closest(".category-card")
            .getAttribute("data-category-id");

          formContainer.style.display = "flex";
          formContainer.style.opacity = "1";


          try {
            const response = await axios.get(
              `http://localhost:4000/categories/${categoryId}`
            );
            const category = response.data;

            // Create form HTML with the fetched category data
            let formContainerContent = `
              <form id="edit-category-form">
                <h2 class="edit-category-title">Edit Category: ${category.name}</h2>
                <div class="edit-category-close-container"><button type="button" class="edit-category-close">X</button></div>
                <label for="edit-category-name">Category Name:</label>
                <input type="text" id="edit-category-name" value="${category.name}" required>
                <label for="edit-category-description">Category Description:</label>
                <textarea id="edit-category-description" required>${category.description}</textarea>
                <label for="edit-category-image">Category Image:</label>
                <input type="text" id="edit-category-image" value="${category.image}" required>
                <button type="submit">Save Changes</button>
              </form>
            `;

            formContainer.innerHTML = formContainerContent;

            // Add event listener for form submission
            document
              .getElementById("edit-category-form")
              .addEventListener("submit", async function (event) {
                event.preventDefault();

                const updatedCategory = {
                  name: document.getElementById("edit-category-name").value,
                  description: document.getElementById(
                    "edit-category-description"
                  ).value,
                  image: document.getElementById("edit-category-image").value,
                };

                try {
                  const response = await axios.put(
                    `http://localhost:4000/categories/${categoryId}`,
                    updatedCategory
                  );
                  console.log("Category updated:", response.data);
                  window.location.href = `dashboard.html`; // Redirect after successful update
                } catch (error) {
                  console.error("Error updating category:", error);
                }
              });

            // Add event listener to close button to close the form
            document
              .querySelector(".edit-category-close")
              .addEventListener("click", () => {
                formContainer.style.display = "none";
                formContainer.innerHTML = ""; // Clear form content
              });
          } catch (error) {
            console.error(
              `Error retrieving category with id ${categoryId}:`,
              error
            );
            formContainer.innerHTML = `<p>Error retrieving category. Please try again later.</p>`;
          }
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
    document.querySelector(".admin-product-form").style.display = "flex";
    document.querySelector(".admin-product-form").style.opacity = "1";
    document.querySelector(
      ".add-product-title"
    ).innerHTML = `Add Products to Category: ${categoryId}`;
  };

  // Initialize the displayCategories function when the page loads
  displayCategories();
});
