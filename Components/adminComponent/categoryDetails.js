import { getProductsByCategory } from "../../APIsConnection/admin.js";

let addProduct = document.querySelector(".admin-product-form");
let addCategory = document.querySelector(".admin-category-form");
const params = new URLSearchParams(window.location.search);
const categoryId = params.get("id");

const addProducts = async (categoryId) => {
  try {
    let products = await getProductsByCategory(categoryId);

    addProduct.innerHTML = `
      <h2>Add Products to Category: ${categoryId}</h2>
      <form id="product-form">
        <label for="product-id">Product ID: <input type="text" id="product-id" required></label>
        <label for="product-name">Product Name: <input type="text" id="product-name" required></label>
        <label for="product-description">Product Description: <textarea id="product-description" required></textarea></label>
        <label for="product-price">Product Price: <input type="number" id="product-price" required></label>
        <label for="product-image">Product Image: <input type="text" id="product-image" required></label>
        <label for="product-discount">Product Discount: <input type="number" id="product-discount"></label>
        <label for="product-availability">Product Availability: <input type="checkbox" id="product-availability"></label>
        <label for="product-brandname">Product Brand Name: <input type="text" id="product-brandname" required></label>
        <label for="product-categoryId">Product Category Id: <input type="number" id="product-categoryId" value="${categoryId}" readonly></label>
        <label for="product-stock">Product Stock: <input type="number" id="product-stock" required></label>
        <label for="product-rating">Product Rating: <input type="number" id="product-rating" required></label>
        <button type="submit">Add Product</button>
      </form>
    `;

    document
      .getElementById("product-form")
      .addEventListener("submit", async function (event) {
        event.preventDefault();

        const product = {
          id: document.getElementById("product-id").value,
          name: document.getElementById("product-name").value,
          description: document.getElementById("product-description").value,
          price: document.getElementById("product-price").value,
          image: document.getElementById("product-image").value,
          discount: document.getElementById("product-discount").value,
          availability: document.getElementById("product-availability").checked,
          brandname: document.getElementById("product-brandname").value,
          categoryId: document.getElementById("product-categoryId").value,
          stock: document.getElementById("product-stock").value,
          rating: document.getElementById("product-rating").value,
          reviews: [],
        };

        try {
          const response = await axios.post(
            "http://localhost:4000/products",
            product
          );
          console.log("Product added:", response.data);

          window.location.href = `categoryDetails.html?id=${categoryId}`;
        } catch (error) {
          console.error("Error adding product:", error);
        }
      });
  } catch (error) {
    console.error("Error fetching products:", error);
    addProduct.innerHTML = `<p>Error loading products. Please try again later.</p>`;
  }
};

addProducts(categoryId);

addCategory.innerHTML = `
<h1>Add New Category ${categoryId}</h1>
      <form id="category-form">
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

        <button type="submit">Add Category</button>
      </form>
    </div>`;

///////////

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("category-form");

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const category = {
      name: document.getElementById("category-name").value,
      description: document.getElementById("category-description").value,
      image: document.getElementById("category-image").value,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/categories",
        category
      );
      console.log("Category added:", response.data);

      window.location.href = "dashboard.html";
    } catch (error) {
      console.error("Error adding category:", error);
    }
  });
});
