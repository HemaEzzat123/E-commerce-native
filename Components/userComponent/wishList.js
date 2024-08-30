import { getProductsByIds } from "../../APIsConnection/user.js";

let wishListContainer = document.querySelector(".user-wish-list-cards");

let user = JSON.parse(localStorage.getItem("user"));
let userID = "";
if (user) {
  userID = user.id;
}

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
let wishIDs = wishlist[userID] || [];

export const renderWishList = () => {
  const products = getProductsByIds(wishIDs);
  products.then((products) => {
    wishListContainer.innerHTML = "";

    products.forEach((product) => {
      wishListContainer.innerHTML += `
          <div class="product-card">
            <div class="product-image">
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="product-details">
              <h3>${product.name}</h3>
              <p class="description">${product.description}</p>
              <p class="price">$${product.price}</p>
              <button class="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
              <button class="remove-from-wishlist" data-product-id="${product.id}">Remove</button>
            </div>
          </div>
        `;
    });

    document.querySelectorAll(".add-to-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-product-id");
        addToCart(productId);
        showNotification("Added to cart");
      });
    });

    document.querySelectorAll(".remove-from-wishlist").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-product-id");
        removeFromWishlist(productId);
        showNotification("Removed from wishlist");
      });
    });
  });
};

// Function to add product to the cart
const addToCart = (productId) => {
  let cart = JSON.parse(localStorage.getItem("cart")) || {};

  if (!cart[userID]) {
    cart[userID] = [];
  }

  if (!cart[userID].includes(productId)) {
    cart[userID].push(productId);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Function to remove product from the wishlist
const removeFromWishlist = (productId) => {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || {};

  if (wishlist[userID]) {
    const index = wishlist[userID].indexOf(productId);
    if (index > -1) {
      wishlist[userID].splice(index, 1);
    }

    if (wishlist[userID].length === 0) {
      delete wishlist[userID];
    }

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    renderWishList();
  }
};

function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.innerText = message;
  notification.classList.add("show");

  // Hide notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

window.onload = () => {
  renderWishList();
};
