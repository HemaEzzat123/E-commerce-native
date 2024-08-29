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

    const user = JSON.parse(localStorage.getItem("user"));
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};

    categoryDetails.innerHTML = `
      ${products
        .map((product) => {
          let iconClass = "fa-regular fa-heart"; 
          if (user && wishlist[user.id] && wishlist[user.id].includes(product.id)) {
            iconClass = "fa-solid fa-heart"; 
          }

          return `
            <div class="product-card">
              ${
                user
                  ? `<div class="add-to-wishlist" data-product-id="${product.id}">
                      <i class="${iconClass}"></i>
                     </div>`
                  : ""
              }
              <img class="product-image" src="${product.image}" alt="${product.name}" />
              <div class="product-card-content">
                <p class="product-name">${product.name}</p>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <p class="product-stock">${product.stock} <span>item in stock</span></p>
                <button class="add-to-cart">Add to Cart</button>
              </div>
            </div>`;
        })
        .join("")}
    `;

    // Now that the products are rendered, attach event listeners to the wishlist buttons
    const addToWishlistButtons = document.querySelectorAll(".add-to-wishlist");

    addToWishlistButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-product-id");
        handleWishlist(productId, button);
      });
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    categoryDetails.innerHTML = `<p>Error loading products. Please try again later.</p>`;
  }
};

// Function to handle wishlist operations
const handleWishlist = (productId, button) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.error("User not logged in.");
    return;
  }

  const userId = user.id;

  // Retrieve or initialize the wishlist from localStorage
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};

  // Initialize the user's wishlist if it doesn't exist
  if (!wishlist[userId]) {
    wishlist[userId] = [];
  }

  const userWishlist = wishlist[userId];

  if (userWishlist.includes(productId)) {
    // Remove product from wishlist
    const index = userWishlist.indexOf(productId);
    userWishlist.splice(index, 1);
    button.innerHTML = `<i class="fa-regular fa-heart"></i>`;
    button.classList.remove("active");
  } else {
    // Add product to wishlist
    userWishlist.push(productId);
    button.innerHTML = `<i class="fa-solid fa-heart"></i>`;
    button.classList.add("active");
  }

  // Save the updated wishlist back to localStorage
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  console.log("Wishlist updated:", wishlist);
};

// Call the function to display the products when the page loads
window.onload = () => {
  viewProducts(categoryId);
};
