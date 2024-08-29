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
    let cart = JSON.parse(localStorage.getItem("cart")) || {};

    categoryDetails.innerHTML = `
      ${products
        .map((product) => {
          let iconClass = "fa-regular fa-heart";
          if (
            user &&
            wishlist[user.id] &&
            wishlist[user.id].includes(product.id)
          ) {
            iconClass = "fa-solid fa-heart";
          }

          // Check if the product is already in the cart
          let cartButtonText = "Add to Cart";
          if (user && cart[user.id] && cart[user.id].includes(product.id)) {
            cartButtonText = "Remove from Cart";
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
              <img class="product-image" src="${product.image}" alt="${
            product.name
          }" />
              <div class="product-card-content">
                <p class="product-name">${product.name}</p>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price}</p>
                <p class="product-stock">${
                  product.stock
                } <span>item in stock</span></p>
                ${
                  user
                    ? `<button class="add-to-cart" data-product-id="${product.id}">${cartButtonText}</button>`
                    : ""
                }
              </div>
            </div>`;
        })
        .join("")}
    `;

    // Attach event listeners to the wishlist buttons
    const addToWishlistButtons = document.querySelectorAll(".add-to-wishlist");
    addToWishlistButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-product-id");
        handleWishlist(productId, button);
      });
    });

    // Attach event listeners to the cart buttons
    const addToCartButtons = document.querySelectorAll(".add-to-cart");
    addToCartButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-product-id");
        handleCart(productId, button);
        updateCartCount();
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
    updateWishlistCount();
  }

  // Save the updated wishlist back to localStorage
  localStorage.setItem("wishlist", JSON.stringify(wishlist));

  console.log("Wishlist updated:", wishlist);
};

// Function to handle cart operations
const handleCart = (productId, button) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    console.error("User not logged in.");
    return;
  }

  const userId = user.id;

  // Retrieve or initialize the cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  // Initialize the user's cart if it doesn't exist
  if (!cart[userId]) {
    cart[userId] = [];
  }

  const userCart = cart[userId];

  if (userCart.includes(productId)) {
    // Remove product from cart
    const index = userCart.indexOf(productId);
    userCart.splice(index, 1);
    button.innerHTML = "Add to Cart";
    button.classList.remove("active");
  } else {
    // Add product to cart
    userCart.push(productId);
    button.innerHTML = "Remove from Cart";
    button.classList.add("active");
  }

  // Save the updated cart back to localStorage
  localStorage.setItem("cart", JSON.stringify(cart));

  console.log("Cart updated:", cart);
};

export const updateWishlistCount = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};
  const userWishlist = user && wishlist[user.id] ? wishlist[user.id] : [];

  const wishlistButton = document.querySelector(".user-header-wishlist-button");
  wishlistButton.setAttribute("data-count", userWishlist.length);

  if (userWishlist.length > 0) {
    wishlistButton.style.setProperty(
      "--wishlist-count",
      `"${userWishlist.length}"`
    );
  } else {
    wishlistButton.style.setProperty("--wishlist-count", `"0"`);
  }
};

export const updateCartCount = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const cart = JSON.parse(localStorage.getItem("cart")) || {};
  const userCart = user && cart[user.id] ? cart[user.id] : [];

  const cartButton = document.querySelector(".user-header-cart-button");
  cartButton.setAttribute("data-count", userCart.length);

  if (userCart.length > 0) {
    cartButton.style.setProperty("--cart-count", `"${userCart.length}"`);
  } else {
    cartButton.style.setProperty("--cart-count", `"0"`);
  }
};

// Call the functions when the page loads
window.onload = () => {
  viewProducts(categoryId);
  updateWishlistCount();
  updateCartCount();
};