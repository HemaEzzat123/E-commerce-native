document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("sign-form");
  if (form) {
    const signUp = document.querySelector("#signUp");
    const logIn = document.querySelector("#logIn");
    const inputs = document.querySelector(".sign-inputs");
    const username = document.querySelector("#username");
    const email = document.querySelector("#email");
    const password = document.querySelector("#psw");
    const Continue = document.querySelector("#sign-Continue");
    const allInputs = form.querySelectorAll("input");

    Continue.disabled = true;

    signUp.addEventListener("click", () => toggleMode("signUp"));
    logIn.addEventListener("click", () => toggleMode("logIn"));

    async function getAllAdmins() {
      try {
        const response = await axios.get("http://localhost:4000/admins");
        return response.data;
      } catch (error) {
        console.error("Error getting admins:", error);
        return [];
      }
    }

    async function getAllUsers() {
      try {
        const response = await axios.get("http://localhost:4000/users");
        return response.data;
      } catch (error) {
        console.error("Error getting users:", error);
        return [];
      }
    }

    async function checkIfUserExists(username, password) {
      const users = await getAllUsers();
      return users.find(
        (user) => user.username === username && user.password === password
      );
    }

    async function checkIfAdminExists(username, password) {
      const admins = await getAllAdmins();
      return admins.find(
        (admin) => admin.username === username && admin.password === password
      );
    }
    Continue.addEventListener("click", async (e) => {
      e.preventDefault(); // Prevent form submission

      if (signUp.style.backgroundColor === "white") {
        // Sign Up mode
        const user = {
          username: username.value,
          email: email.value,
          password: password.value,
          role: 1,
          id: "" + Math.random().toString(36).substr(2, 9),
        };

        const users = await getAllUsers();
        const existingUser = users.find((u) => u.username === user.username);
        if (existingUser) {
          const errorSpan = username.nextElementSibling;
          showErrorIfUserIsExist(user.username, errorSpan);
          setTimeout(() => {
          }, 600);
          return;
        } else {
          await addUser(user);
          localStorage.setItem("user", JSON.stringify(user));
          window.location.href = "../../HTML/userPages/userHome.html";
        }
      } else if (logIn.style.backgroundColor === "white") {
        // Log In mode
        const validUser = await checkIfUserExists(
          username.value,
          password.value
        );
        const validAdmin = await checkIfAdminExists(
          username.value,
          password.value
        );

        if (validUser) {
          console.log("User login successful");
          localStorage.setItem("user", JSON.stringify(validUser));
          window.location.href = "../../HTML/userPages/userHome.html";
        } else if (validAdmin) {
          console.log("Admin login successful");
          localStorage.setItem("admin", JSON.stringify(validAdmin));
          window.location.href = "../../HTML/adminPages/dashboard.html";
        } else {
          console.log("Invalid username or password");
          const errorSpan = password.nextElementSibling;
          errorSpan.textContent = "Invalid username or password";
          setTimeout(() => {
          }, 600);
          return;
        }
      }
    });

    async function addUser(user) {
      try {
        const response = await axios.post("http://localhost:4000/users", user);
        return response.data;
      } catch (error) {
        console.error("Error adding user:", error);
        return null;
      }
    }

    async function showErrorIfUserIsExist(username, errorSpan) {
      const users = await getAllUsers();
      const existingUser = users.find((user) => user.username === username);
      if (existingUser) {
        errorSpan.textContent = "User already exists";
      } else {
        errorSpan.textContent = "";
      }
    }

    function toggleMode(mode) {
      allInputs.forEach((input) => (input.value = "")); // Clear all inputs
      Continue.style.backgroundColor = "";
      Continue.style.color = "";
      Continue.style.cursor = "pointer";
      if (mode === "signUp") {
        signUp.style.backgroundColor = "white";
        signUp.style.color = "#404553";
        logIn.style.backgroundColor = "transparent";
        logIn.style.color = "white";
        email.style.display = "block";
        username.value = "";
        password.value = "";
        email.value = "";
      } else if (mode === "logIn") {
        logIn.style.backgroundColor = "white";
        logIn.style.color = "#404553";
        signUp.style.backgroundColor = "transparent";
        signUp.style.color = "white";
        email.style.display = "none";
        email.nextElementSibling.textContent = "";
        username.value = "";
        password.value = "";
      }

      allInputs.forEach((input) => {
        input.addEventListener("input", function () {
          validateInput(input, mode);
        });
      });
    }

    function validateInput(input, mode) {
      const errorSpan = input.nextElementSibling;

      if (input.validity.valid) {
        errorSpan.textContent = "";
        username.nextElementSibling.value = "";
        password.nextElementSibling.value = "";
        checkFormValidity(mode);
      } else {
        showError(input, errorSpan);
        Continue.disabled = true;
      }
    }

    function showError(input, errorSpan) {
      if (input.validity.valueMissing) {
        errorSpan.textContent = "This field is required.";
      } else {
        errorSpan.textContent = "Invalid input.";
      }
    }

    function checkFormValidity(mode) {
      let isValid = false;

      if (mode === "signUp") {
        isValid =
          username.validity.valid &&
          email.validity.valid &&
          password.validity.valid;
      } else if (mode === "logIn") {
        isValid = username.validity.valid && password.validity.valid;
      }

      if (isValid) {
        Continue.style.backgroundColor = "#3866DF";
        Continue.style.color = "white";
        Continue.disabled = false;
        Continue.style.cursor = "pointer";
      } else {
        Continue.style.backgroundColor = "";
        Continue.style.color = "";
        Continue.disabled = true;
        Continue.style.cursor = "not-allowed";
      }
    }
  } else {
    console.error('Form with id "sign-form" not found.');
  }
});
export let signContent = `
  <form action="javascript:void(0);" id="sign-form">
    <div class="sign-container">
      <div class="sign-image"><button class="sign-close">X</button></div>
      <h1 class="sign-h1">Hala! Let's get started</h1>
      <div class="sign-buttons">
        <button type="button" id="signUp">
          Sign Up
        </button>
        <button type="button" id="logIn">
          Log in
        </button>
      </div>
      <div class="sign-inputs">
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          id="username"
          required

        />
        <span class="sign-error"></span>

        <input
          type="email"
          placeholder="Enter Email"
          name="email"
          id="email"
          required
        />
        <span class="sign-error"></span>

        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          id="psw"
          required
        />
        <span class="sign-error"></span>
      </div>
      <button id="sign-Continue">CONTINUE</button>
    </div>
  </form>`;

let sign = document.querySelector(".user-sign");
if (sign) {
  sign.innerHTML = signContent;
} else {
  console.log("Sign element not found");
}

// Close the sign form
document.querySelector(".sign-close").addEventListener("click", function () {
  document.body.classList.remove("show-popup");
  document.querySelector(".user-sign").style.display = "none";
});

