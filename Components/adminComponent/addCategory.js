let addCategory = document.querySelector(".admin-category-form");
addCategory.innerHTML = `
      <form id="category-form">
          <div class="add-category-close-container"><button type="button" class="add-category-close">X</button></div>

        <label for="category-name">Category Name:</label>
        <input type="text" id="category-name" name="name" required />

        <label for="category-description">Category Description:</label>
        <textarea
          id="category-description"
          name="description"
          required
        ></textarea>

        <label for="category-image">Category Image URL:</label>
        <input type="text" id="category-image" name="image" required />

        <label for="category-id">Category ID:</label>
        <input type="text" id="category-id" name="id" required />

        <button type="submit">Add Categor</button>
      </form>
    </div>`;

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("category-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const category = {
      name: document.getElementById("category-name").value,
      description: document.getElementById("category-description").value,
      image: document.getElementById("category-image").value,
      id: document.getElementById("category-id").value,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/categories",
        category
      );

      window.location.href = "dashboard.html";
    } catch (error) {
      console.error("Error adding category:", error);
    }
  });
});

document.querySelector(".add-category-close").addEventListener("click", () => {
  document.querySelector(".admin-category-form").style.display = "none";
});
