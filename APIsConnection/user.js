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

  getAllCategories()