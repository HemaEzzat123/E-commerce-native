import { getProductsByCategory } from "../../APIsConnection/admin.js";

let addProduct = document.querySelector(".admin-product-form");
let addCategory = document.querySelector(".admin-category-form");
const params = new URLSearchParams(window.location.search);
const categoryId = params.get("id");

let categoryDetails = document.querySelector(".admin-category-details-page");

const viewProducts = async (categoryId) => {
  try {
    let products = await getProductsByCategory(categoryId); // Wait for the products to be fetched

    categoryDetails.innerHTML = `
      ${products
        .map(
          (product) => `
          <div class="product-card" data-product-id="${product.id}">
          <div class="productBtns">
            <button class="delete-product">X</button>
            <button class="edit-product"><i class="fa-solid fa-pencil"></i></button>
            </div>
            <img src="${product.image}" alt="${product.name}" /><br/>
            <div class="productDetails">
            <h1>${product.name}</h1>
            <p>Price: $${product.price}</p>
            <p>Stock: ${product.stock} available</p>
            </div>
            <p>${product.description}</p><br/>
          </div>`
        )
        .join("")}
    `;

    attachEventListenersToProducts(); // Moved to a function for clarity
  } catch (error) {
    console.error("Error fetching products:", error);
    categoryDetails.innerHTML = `<p>Error loading products. Please try again later.</p>`;
  }
};

const attachEventListenersToProducts = () => {
  document.querySelectorAll(".delete-product").forEach((button) => {
    button.addEventListener("click", async () => {
      const productId = button
        .closest(".product-card")
        .getAttribute("data-product-id");
      await deleteProduct(productId);
      viewProducts(categoryId); // Refresh the product list after deletion
    });
  });

  document.querySelectorAll(".edit-product").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button
        .closest(".product-card")
        .getAttribute("data-product-id");
      window.location.href = `editProduct.html?id=${productId}`;
    });
  });
};

const deleteProduct = async (productId) => {
  try {
    await axios.delete(`http://localhost:4000/products/${productId}`);
    console.log(`Product with id ${productId} deleted.`);
  } catch (error) {
    console.error(`Error deleting product with id ${productId}:`, error);
  }
};

const closeButton = document.querySelector(".add-close");

if (closeButton) {
  console.log("Button exists, adding event listener.");
  closeButton.addEventListener("click", function () {
    console.log("Close button clicked.");
    document.body.classList.remove("show-popup");
    document.querySelector(".admin-product-form").style.display = "none";
  });
} else {
  console.error("Close button not found.");
}

viewProducts(categoryId);

const addProducts = async (categoryId) => {
  try {
    let products = await getProductsByCategory(categoryId);

    addProduct.innerHTML = `
    <form id="product-form">
    <h2 class="add-product-title"></h2>
    <div class="add-close-container"><button type="button" class="add-close">X</button></div>
    <label for="product-id">Product ID:</label><br/>
         <input type="text" id="product-id" required>
        <label for="product-name">Product Name: </label><br/>
        <input type="text" id="product-name" required>
        <label for="product-description">Product Description:</label><br/>
         <textarea id="product-description" required></textarea>
        <label for="product-price">Product Price:</label><br/>
         <input type="number" id="product-price" required>
        <label for="product-image">Product Image: </label><br/>
        <input type="text" id="product-image" required>
        <label for="product-discount">Product Discount: </label><br/>
        <input type="number" id="product-discount">
        <label for="product-brandname">Product Brand Name: </label><br/>
        <input type="text" id="product-brandname" required>
        <label for="product-categoryId">Product Category Id: </label><br/>
        <input type="number" id="product-categoryId" value="${categoryId}" readonly>
        <label for="product-stock">Product Stock: </label><br/>
        <input type="number" id="product-stock" required>
        <label for="product-rating">Product Rating: </label><br/>
        <input type="number" id="product-rating" required>
        <label for="product-availability">Product Availability:</label>
         <input type="checkbox" id="product-availability">
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

        <label for="category-id">Category ID:</label>
        <input type="text" id="category-id" name="id" required />

        <button type="submit">Add Category</button>
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
