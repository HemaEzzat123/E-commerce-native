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
const displayUsers = async () => {
  const users = await getAllUsers();
  const admins = await getAllAdmins();

  let userRows = users
    .map(
      (user) => `
      <tr>
        <td>${user.id}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td><button class="delete-user" data-id="${user.id}">X</button></td>
        <td><button class="make-admin" data-id="${user.id}">Make Admin</button></td>
      </tr>
    `
    )
    .join("");

  let adminRows = admins
    .map(
      (admin) => `
      <tr>
        <td>${admin.id}</td>
        <td>${admin.username}</td>
        <td>${admin.email}</td>
        <td>${admin.role}</td>
        <td><button class="delete-admin" data-id="${admin.id}">X</button></td>
        <td><button class="remove-admin" data-id="${admin.id}">Remove Admin</button></td>
      </tr>
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

// Content for users and admins table
export let content = `
 <table>
  <thead>
    <tr>
      <th>ID</th>
      <th>Username</th>
      <th>Email</th>
      <th>Role</th>
      <th>Delete</th>
      <th>Make Admin</th>
    </tr>
  </thead>
  <tbody class="usersInfo"></tbody>
  <tbody class="adminsInfo"></tbody>
</table>
<div class="pagination">
  <!-- Pagination controls fetched dynamically from API -->
</div>
<div class="admin-search-bar">
  <input type="search" placeholder="Search" class="admin-search">
</div>
`;

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
