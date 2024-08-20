// const productID = "5";
// import { getAllCategories } from "./../../APIsConnection/user.js";
// export const displayAllCategories = async () => {
//   const categories = await getAllCategories();
//   console.log(categories);
//   const categoryList = document.createElement("div");
//   categoryList.className = "user-category-list";

//   if (categories.length > 0) {
//     categories.forEach((category) => {
//       const categoryCard = document.createElement("div");
//       categoryCard.className = "user-category-item";
//       categoryCard.textContent = category.description;
//       categoryList.appendChild(categoryCard);
//     });
//   } else {
//     categoryList.textContent = "No categories found";
//   }

//   console.log(categoryList);
//   return categoryList;
// };

// export let categoriesContainer = document.createElement("div");
// categoriesContainer.className = "user-categories-container";
// categoriesContainer.innerHTML = displayAllCategories();


import { getAllCategories } from "./../../APIsConnection/user.js";

export const displayAllCategories = async () => {
  const categories = await getAllCategories();
  console.log(categories);
  const categoryList = document.createElement("div");
  categoryList.className = "user-category-list";

  if (categories.length > 0) {
    categories.forEach((category) => {
      const categoryCard = document.createElement("div");
      categoryCard.className = "user-category-item";
      categoryCard.textContent = category.description;
      categoryList.appendChild(categoryCard);
    });
  } else {
    categoryList.textContent = "No categories found";
  }

  console.log(categoryList);
  return categoryList;
};

export let categoriesContainer = document.createElement("div");
categoriesContainer.className = "user-categories-container";

// Instead of setting innerHTML directly, we'll use this function to append the category list.
export const loadCategories = async () => {
  const categoryList = await displayAllCategories();
  categoriesContainer.appendChild(categoryList);
};

