import { getProductsByIds } from "../../APIsConnection/admin.js";

let ordersContainer = document.querySelector(".user-orders");

// Get user from localStorage
const user = JSON.parse(localStorage.getItem("user")); // Parse the stored JSON string to get the user object
let userID = "";

if (user) {
  userID = user.id;
}

export const getAllOrders = async () => {
  try {
    const response = await fetch("http://localhost:4000/orders");
    const orders = await response.json();
    console.log(orders);

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const renderOrdersList = async () => {
  const orders = await getAllOrders();

  if (orders.length === 0) {
    ordersContainer.innerHTML = "<p>No orders available.</p>";
    return;
  }

  // Filter orders for the current user
  const userOrders = orders.filter((order) => order.userId === userID);

  if (userOrders.length === 0) {
    ordersContainer.innerHTML = "<p>No orders found for this user.</p>";
    return;
  }

  ordersContainer.innerHTML = ""; // Clear the container before rendering

  let orderHTML = `
    <div class="product-card">
      <h3>Orders for User ID: ${userID}</h3>
      <div class="products">
  `;

  for (const order of userOrders) {
    // Fetch product details for the order
    const products = await getProductsByIds(
      order.products.map((p) => p.productId)
    );

    // Render product details
    orderHTML += products
      .map(
        (product) => `
        <div class="product-details">
        <h3 class=${order.status}>${
          orders[userOrders.indexOf(order)].status || "Pending"
        }</h3>
            <img src="${product.image}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p class="description">${product.description}</p>
            <p class="price">Price: $${product.price}</p>
          </div>
        `
      )
      .join("");
  }

  orderHTML += `
      </div>
    </div>
  `;

  ordersContainer.innerHTML = orderHTML; // Update the container with the new HTML
};

window.onload = () => {
  renderOrdersList();
};
