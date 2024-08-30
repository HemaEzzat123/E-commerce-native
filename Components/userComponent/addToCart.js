import { getProductsByIds } from "../../APIsConnection/user.js";

let CartContainer = document.querySelector(".user-cart");

let user = JSON.parse(localStorage.getItem("user"));
let userID = "";
if (user) {
  userID = user.id;
}

let cartList = JSON.parse(localStorage.getItem("cart")) || [];
let cartIDs = cartList[userID] || [];

const response = async () => {
  try {
    const response = await axios.get("http://localhost:4000/orders");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
response();

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
        showNotification("Removed from cart");
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
    window.location.reload();
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

const placeOrder = document.querySelector(".placeOrderBtn");

if(!cartIDs || cartIDs.length === 0) {
  placeOrder.style.display = "none";
}

placeOrder.addEventListener("click", () => {
  // Create the order object with userId and productIds
  const order = {
    userId: userID,
    products: cartIDs.map((id) => ({ productId: id })), // Format products as array of objects with productId
  };

  // Send the order to the server, update the cart, and display success message
  sendOrderToServer(order);

  cartList = JSON.parse(localStorage.getItem("cart")) || {};
  if (cartList[userID]) {
    delete cartList[userID];
    localStorage.setItem("cart", JSON.stringify(cartList));
  }

  // Display success notification
  showNotification("Order placed successfully!");
});

const sendOrderToServer = (order) => {
  fetch("http://localhost:4000/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Order placed successfully:", data);
    })
    .catch((error) => {
      console.error("Error placing order:", error);
    });
};

window.onload = () => {
  renderCartList();
};
