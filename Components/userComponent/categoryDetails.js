import { getProductsByCategory } from "../../APIsConnection/user.js";

let categoryDetails = document.querySelector(".user-category-details-page");

const params = new URLSearchParams(window.location.search);
const categoryId = params.get("id");

const numberContainer = document.querySelector(".products-number");

const viewProducts = async (categoryId) => {
  try {
    let products = await getProductsByCategory(categoryId);

    let numberOfProducts = products.length;

    numberContainer.innerHTML = `${numberOfProducts} products`;

    categoryDetails.innerHTML = `
      ${products
        .map(
          (product) => `
          <div class="product-card">
            <div class="add-to-wishlist"><i class="fa-regular fa-heart"></i></div>
            <img class="product-image" src="${product.image}" alt="${product.name}" />
            <div class="product-card-content">
              <P class="product-name">${product.name}</P>
              <p class="product-description">${product.description}</p>
              <p class="product-price">$${product.price}</p>
              <p class="product-stock">${product.stock} <span>item in stock</span></p>
              <button class="add-to-cart">Add to Cart</button>
            </div>
          </div>`
        )
        .join("")}
    `;

    // Now that the products are rendered, attach event listeners to the wishlist buttons
    const addToWishlistButtons = document.querySelectorAll(".add-to-wishlist");

    addToWishlistButtons.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");
        if (button.classList.contains("active")) {
          button.innerHTML = `<i class="fa-solid fa-heart"></i>`;
        } else {
          button.innerHTML = `<i class="fa-regular fa-heart"></i>`;
        }
        console.log("Added to wishlist!");
      });
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    categoryDetails.innerHTML = `<p>Error loading products. Please try again later.</p>`;
  }
};

// Call the function to display the products when the page loads
window.onload = () => {
  viewProducts(categoryId);
};
