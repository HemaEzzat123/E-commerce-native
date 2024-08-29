// import axios from "axios";

//function to get all categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get("http://localhost:4000/categories");
    // console.log(response.data);
    // console.log("test");
    return response.data;
  } catch (error) {
    console.error("Error in getAllCategories function", error);
    return [];
  }
};

// Function to get all products and categories, then filter products by category
export const getProductsByCategory = async (categoryId) => {
  try {
    // Fetch all products and categories
    const [productsResponse, categoriesResponse] = await Promise.all([
      axios.get("http://localhost:4000/products"),
      axios.get("http://localhost:4000/categories"),
    ]);

    const products = productsResponse.data;
    // console.log(products);
    const categories = categoriesResponse.data;
    // console.log(categories);
    // Find the category object by categoryId
    const category = categories.find((cat) => cat.id === categoryId);
    // console.log(category);

    if (!category) {
      // console.error("Category not found");
      return [];
    }

    // Filter products by categoryId
    const filteredProducts = products.filter(
      (product) => product.categoryId === categoryId
    );

    console.log(filteredProducts);
    return filteredProducts;
  } catch (error) {
    console.error("Error in getProductsByCategory function", error);
    return [];
  }
};

//function get array of ids of products then return them as an array
export const getProductsByIds = async (ids) => {
  try {
    // Make multiple requests to get data for each product ID
    const productPromises = ids.map((id) =>
      axios.get(`http://localhost:4000/products/${id}`)
    );

    // Wait for all requests to complete
    const responses = await Promise.all(productPromises);

    // Extract the product data from each response
    const products = responses.map((response) => response.data);

    return products;
  } catch (error) {
    console.error("Error in getProductsByIds function", error);

    // Return an empty array in case of an error
    return [];
  }
};