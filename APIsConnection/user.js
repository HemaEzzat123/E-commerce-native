// import axios from "axios";

//function to get all categories
export const getAllCategories = async () => {
  try {
    const response = await axios.get("http://localhost:4000/categories");
    console.log(response.data);
    console.log("test");
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

getProductsByCategory(1);
