// get All users
const getAllUsers = async () => {
  const response = await axios.get("http://localhost:4000/users");
  return response.data;
};

// delete user
const deleteUser = async (userId) => {
  try {
    await axios.delete(`http://localhost:4000/users/${userId}`);
    getAllUsers(); // Update the display after deletion
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

//get all carts
const getAllCarts = async () => {
  const response = await axios.get("http://localhost:4000/carts");
  return response.data;
};

export let sideBarContent = `
<div class="admin-SB-content">
        <button class="addCategory">Add Category</button>
        <button class="orders">orders</button>
        <button class="users">users</button>
      </div> `;

let sideBar = document.querySelector(".adminSb");
sideBar.innerHTML = sideBarContent;

document.querySelector(".users").addEventListener("click", async () => {
  const users = await getAllUsers();
  console.log(users);
});
