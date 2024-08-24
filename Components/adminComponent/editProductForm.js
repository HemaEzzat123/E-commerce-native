const editProductContainer = document.querySelector(
  ".admin-product-form-container"
);
const spinner = document.querySelector(".spinner");

const showSpinner = () => {
  spinner.style.display = "block";
};

const hideSpinner = () => {
  spinner.style.display = "none";
};

const getProductIdFromURL = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
};

const showEditForm = async (productId) => {
  showSpinner();
  try {
    const response = await axios.get(
      `http://localhost:4000/products/${productId}`
    );
    const product = response.data;

    editProductContainer.innerHTML = `
      <h2>Edit Product: ${product.name}</h2>
      <form id="edit-product-form">
        <label for="edit-product-name">Product Name: <input type="text" id="edit-product-name" value="${
          product.name
        }" required></label>
        <label for="edit-product-description">Product Description: <textarea id="edit-product-description" required>${
          product.description
        }</textarea></label>
        <label for="edit-product-price">Product Price: <input type="number" id="edit-product-price" value="${
          product.price
        }" required></label>
        <label for="edit-product-image">Product Image: <input type="text" id="edit-product-image" value="${
          product.image
        }" required></label>
        <label for="edit-product-discount">Product Discount: <input type="number" id="edit-product-discount" value="${
          product.discount
        }"></label>
        <label for="edit-product-availability">Product Availability: <input type="checkbox" id="edit-product-availability" ${
          product.availability ? "checked" : ""
        }></label>
        <label for="edit-product-brandname">Product Brand Name: <input type="text" id="edit-product-brandname" value="${
          product.brandname
        }" required></label>
        <label for="edit-product-stock">Product Stock: <input type="number" id="edit-product-stock" value="${
          product.stock
        }" required></label>
        <label for="edit-product-rating">Product Rating: <input type="number" id="edit-product-rating" value="${
          product.rating
        }" required></label>
        <button type="submit">Save Changes</button>
      </form>
    `;

    document
      .getElementById("edit-product-form")
      .addEventListener("submit", async function (event) {
        event.preventDefault();
        showSpinner();

        const updatedProduct = {
          id: productId,
          name: document.getElementById("edit-product-name").value,
          description: document.getElementById("edit-product-description")
            .value,
          price: document.getElementById("edit-product-price").value,
          image: document.getElementById("edit-product-image").value,
          discount: document.getElementById("edit-product-discount").value,
          availability: document.getElementById("edit-product-availability")
            .checked,
          brandname: document.getElementById("edit-product-brandname").value,
          categoryId: product.categoryId,
          stock: document.getElementById("edit-product-stock").value,
          rating: document.getElementById("edit-product-rating").value,
          reviews: product.reviews,
        };

        try {
          const response = await axios.put(
            `http://localhost:4000/products/${productId}`,
            updatedProduct
          );
          console.log("Product updated:", response.data);
          window.location.href = `categoryDetails.html?id=${product.categoryId}`; // Redirect to category details page
        } catch (error) {
          console.error("Error updating product:", error);
        } finally {
          hideSpinner();
        }
      });
  } catch (error) {
    console.error(`Error retrieving product with id ${productId}:`, error);
    editProductContainer.innerHTML = `<p>Error retrieving product. Please try again later.</p>`;
  } finally {
    hideSpinner();
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromURL();
  if (productId) {
    showEditForm(productId);
  }
});