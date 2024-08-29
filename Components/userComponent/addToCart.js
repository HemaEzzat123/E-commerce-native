import { getProductsByIds } from "../../APIsConnection/user.js";

let CartContainer = document.querySelector(".user-cart");

let user = JSON.parse(localStorage.getItem("user"));
let userID = "";
if (user) {
  userID = user.id;
}

let cartList = JSON.parse(localStorage.getItem("cart")) || [];
let cartIDs = cartList[userID] || [];

export const renderCartList = () => {
  const products = getProductsByIds(cartIDs);
  products.then((products) => {
    CartContainer.innerHTML = "";

    products.forEach((product) => {
      CartContainer.innerHTML += `
        <div class="product-card">
          <div class="product-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="product-details">
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">$${product.price}</p>
            <button class="remove-from-cart" data-product-id="${product.id}">Remove</button>
          </div>
        </div>
      `;
    });


    document.querySelectorAll(".remove-from-cart").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = e.target.getAttribute("data-product-id");
        removeFromCartList(productId);
      });
    });
  });
};

// Function to remove product from the wishlist
const removeFromCartList = (productId) => {
  let cartList = JSON.parse(localStorage.getItem("cart")) || {};

  if (cartList[userID]) {
    const index = cartList[userID].indexOf(productId);
    if (index > -1) {
      cartList[userID].splice(index, 1);
    }

    if (cartList[userID].length === 0) {
      delete cartList[userID];
    }

    localStorage.setItem("cart", JSON.stringify(cartList));
    renderCartList();
  }
};

window.onload = () => {
  renderCartList();
};
