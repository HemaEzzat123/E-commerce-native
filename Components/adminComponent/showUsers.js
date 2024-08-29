// Get all users
const getAllUsers = async () => {
  const response = await axios.get("http://localhost:4000/users");
  return response.data;
};

// Get all admins
const getAllAdmins = async () => {
  const response = await axios.get("http://localhost:4000/admins");
  return response.data;
};

// Delete user
const deleteUser = async (userId) => {
  try {
    await axios.delete(`http://localhost:4000/users/${userId}`);
    await displayUsers(); // Update the display after deletion
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

// Delete admin
const deleteAdmin = async (adminId) => {
  try {
    await axios.delete(`http://localhost:4000/admins/${adminId}`);
    await displayUsers(); // Update the display after deletion
  } catch (error) {
    console.error("Error deleting admin:", error);
  }
};

// Remove admin role (convert back to user)
const removeAdmin = async (adminId) => {
  try {
    const adminData = await axios.get(
      `http://localhost:4000/admins/${adminId}`
    );
    const { username, email, password } = adminData.data;

    await axios.post("http://localhost:4000/users", {
      username,
      email,
      password,
      role: 1, // Assuming role 1 is for regular users
    });

    await deleteAdmin(adminId); // Delete from the admins table
    await displayUsers(); // Update the display after role change
  } catch (error) {
    console.error("Error removing admin role:", error);
  }
};

// Make user admin
const makeAdmin = async (userId) => {
  try {
    const userData = await axios.get(`http://localhost:4000/users/${userId}`);
    const { username, email, password } = userData.data;

    await axios.post("http://localhost:4000/admins", {
      username,
      email,
      password,
      role: 0, // Assuming role 0 is for admins
    });

    await deleteUser(userId); // Delete from the users table
    await displayUsers(); // Update the display after role change
  } catch (error) {
    console.error("Error updating user role:", error);
  }
};

// Function to display users and admins in the table

// Content for users and admins table---------------------------------------------!!!!!!!!!!!!!!!!-----------
export let content = `
<div class="container">
<div class="content">
<h1 class="members">MEMBERS.</h1>
<div style="display:flex; align-items:center ;height:40px;gap:10px">
<input class="search" type="search" placeholder="  search ...">
<button class="addmember">add member</button>
</div>
</div>
<hr>
<h3><i class="fa-brands fa-black-tie"></i> ADMINS</h3>
<div class="adminsInfo"></div>
<hr>
<h3><i class="fa-solid fa-users"></i> USERS</h3>
<div class="usersInfo"></div>
</div>
`

//---------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!---------------------------------------------
// Load users and table structure on page load
window.onload = async () => {
  let usersContainer = document.querySelector(".admin-user-table-container");
  if (usersContainer) {
    usersContainer.innerHTML = content; // Load table structure
    await displayUsers(); // Populate the table with user and admin data
  } else {
    console.error("Element with class 'admin-user-table-container' not found.");
  }
};

// let value=await getAllUsers();
// let search = document.querySelector(".search")
// search.addEventListener("input",(event)=> {
//   const value = search.target.value
//   getAllAdmins.filter((obj) => { return obj.name === value })
//   console.log(value)
// })


  const displayUsers = async () => {
    const users = await getAllUsers();
    const admins = await getAllAdmins();
  
    let userRows = users
      .map(
        (user) => `
        <div class="headers">
        <span class="name">${user.username}</span>
          <span class="info">${user.id}</span>
          <span class="info">${user.email}</span>  
          <span class="info">${user.role}</span>
          <div class="buttons">
          <div class="tooltip">
          <button class="delete-user" data-id="${user.id}"><i class="fa-solid fa-user-xmark"></i></button>
          <span class="tooltiptext">Remove account</span>
          </div>
          <button class="make-admin" data-id="${user.id}"><i class="fa-solid fa-user-tie"></i> Make Admin</button>
  
         </div>
        </div>
        <br/>
        <hr/>
        <br/>
       
      `
      )
      .join("");
  
    let adminRows = admins
      .map(
        (admin) => `
        <div  class="headers">
        <span class="name">${admin.username}</span>
          <span class="info">${admin.id}</span>
          <span class="info">${admin.email}</span>
          <span class="info">${admin.role}</span>
          <div class="buttons">
          <div class="tooltip">
          <button class="delete-admin" data-id="${admin.id}"><i class="fa-solid fa-user-xmark"></i></button>
           <span class="tooltiptext">Remove account</span>
           </div>
          <button class="remove-admin" data-id="${admin.id}"><i class="fa-solid fa-user-minus"></i> Remove Admin</button>
          
          </div>
        </div>
        <br/>
        <hr/>
        <br/>
      `
      )
      .join("");
  
    let usersInfoContainer = document.querySelector(".usersInfo");
    let adminsInfoContainer = document.querySelector(".adminsInfo");
  
    if (usersInfoContainer) {
      usersInfoContainer.innerHTML = userRows;
    } else {
      console.error("Element with class 'usersInfo' not found.");
    }
  
    if (adminsInfoContainer) {
      adminsInfoContainer.innerHTML = adminRows;
    } else {
      console.error("Element with class 'adminsInfo' not found.");
    }
  
    // Attach event listeners for user actions
    document.querySelectorAll(".delete-user").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const userId = event.target.getAttribute("data-id");
        await deleteUser(userId);
      });
    });
  
    document.querySelectorAll(".make-admin").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const userId = event.target.getAttribute("data-id");
        await makeAdmin(userId);
      });
    });
  
    // Attach event listeners for admin actions
    document.querySelectorAll(".delete-admin").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const adminId = event.target.getAttribute("data-id");
        await deleteAdmin(adminId);
      });
    });
  
    document.querySelectorAll(".remove-admin").forEach((button) => {
      button.addEventListener("click", async (event) => {
        const adminId = event.target.getAttribute("data-id");
        await removeAdmin(adminId);
      });
    });
  };