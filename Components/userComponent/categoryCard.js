// import { getAllCategories } from "../../APIsConnection/user";

// let categories = getAllCategories();



// let categoryCardContent = ()=> {
//     let content = ``

//     for (let i = 0; i < categories.length; i++) {
//         content += `
//             <div class="user-category-card">
//                 <div class="user-category-card-image">
//                     <img src="${categories[i].image}" alt="${categories[i].name}">
//                 </div>
//                 <div class="user-category-card-title">${categories[i].name}</div>
//             </div>
//         `;
//     }

//     return content;
// } 

// export let categoryCard = document.createElement("div");
// categoryCard.className = "user-category-card-container";
// categoryCard.innerHTML = categoryCardContent();

import { getAllCategories } from "../../APIsConnection/user";

export let categoryCard = document.createElement("div");
categoryCard.className = "user-category-card-container";

// Function to render the category cards
const renderCategoryCards = async () => {
  const categories = await getAllCategories();
  let content = ``;

  for (let i = 0; i < categories.length; i++) {
    content += `
      <div class="user-category-card">
        <div class="user-category-card-image">
          <img src="${categories[i].image}" alt="${categories[i].name}">
        </div>
        <div class="user-category-card-title">${categories[i].name}</div>
      </div>
    `;
  }

  categoryCard.innerHTML = content;
};

// Call the function to fetch and render categories when the component is loaded
renderCategoryCards();
