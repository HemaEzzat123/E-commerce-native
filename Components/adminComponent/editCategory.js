const editCategoryContainer = document.querySelector(
  ".admin-category-form-container"
);
const spinner = document.querySelector(".spinner");

const showSpinner = () => {
  spinner.style.display = "block";
};

const hideSpinner = () => {
  spinner.style.display = "none";
};

const getCategoryIdFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};

const showEditForm = async (categoryId) => {
  showSpinner();
  try {
    const response = await axios.get(
      `http://localhost:4000/categories/${categoryId}`
    );
    const category = response.data;

    editCategoryContainer.innerHTML = `
      <h2>Edit Product: ${category.name}</h2>
      <form id="edit-category-form">
        <label for="edit-category-name">Category Name: <input type="text" id="edit-category-name" value="${category.name}" required></label>
        <label for="edit-category-description">Category Description: <textarea id="edit-category-description" required>${category.description}</textarea></label>
        <label for="edit-category-image">Category Image: <input type="text" id="edit-category-image" value="${category.image}" required></label>
        <button type="submit">Save Changes</button>
      </form>
    `;

    document
      .getElementById("edit-category-form")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        showSpinner();

        const updatedCategory = {
          name: document.getElementById("edit-category-name").value,
          description: document.getElementById("edit-category-description")
            .value,
          image: document.getElementById("edit-category-image").value,
        };

        try {
          const response = await axios.put(
            `http://localhost:4000/categories/${categoryId}`,
            updatedCategory
          );
          console.log("Category updated:", response.data);
          window.location.href = `dashboard.html`; // Redirect to category details page
        } catch (error) {
          console.error("Error updating category:", error);
        } finally {
          hideSpinner();
        }
      });
  } catch (error) {
    console.error(`Error retrieving category with id ${categoryId}:`, error);
    editCategoryContainer.innerHTML = `<p>Error retrieving category. Please try again later.</p>`;
  } finally {
    hideSpinner();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const categoryId = getCategoryIdFromURL();
  if (categoryId) {
    showEditForm(categoryId);
  }
});
