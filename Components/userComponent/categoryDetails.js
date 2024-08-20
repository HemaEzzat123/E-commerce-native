import { getProductsByCategory } from "../../APIsConnection/user.js";

let categoryDetails = document.querySelector(".user-category-details-page");

const params = new URLSearchParams(window.location.search);
const categoryId = params.get("id");

const viewProducts = async (categoryId) => {
  try {
    let products = await getProductsByCategory(categoryId); // Wait for the products to be fetched

    categoryDetails.innerHTML = `
      ${products
        .map(
          (product) => `
          <div class="product-card">
            <h1>${product.name}</h1>
            <img src="${product.image}" alt="${product.name}" />
            <p>${product.description}</p>
            <p>Price: $${product.price}</p>
            <p>Stock: ${product.stock} available</p>
          </div>`
        )
        .join("")}
    `;
  } catch (error) {
    console.error("Error fetching products:", error);
    categoryDetails.innerHTML = `<p>Error loading products. Please try again later.</p>`;
  }
};

// Call the function to display the products when the page loads
viewProducts(categoryId);
