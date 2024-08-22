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
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error getting admins:", error);
        return [];
      }
    }
    getAllAdmins();
    async function showErrorIfUserIsExist(username, errorSpan) {
      const users = await getAllUsers();
      const existingUser = users.find((user) => user.username === username);
      if (existingUser) {
        errorSpan.textContent = "User already exists";
      } else {
        errorSpan.textContent = "";
      }
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
        const errorSpan = username.nextElementSibling;
        if (existingUser) {
          console.log("This user already exists");
          showErrorIfUserIsExist(user.username, errorSpan);
          setTimeout(() => {
            window.location.href = "../../HTML/sharedPages/sign.html";
          }, 600);
          return;
        } else {
          console.log("Your account has been created");
          window.location.href = "../../HTML/userPages/userHome.html";
          await addUser(user);
          localStorage.setItem("user", JSON.stringify(user));
        }
      } else if (logIn.style.backgroundColor === "white") {
        // Log In mode
        const users = await getAllUsers();
        const validUser = users.find(
          (user) =>
            user.username === username.value && user.password === password.value
        );

        if (validUser) {
          console.log("Login successful");
          window.location.href = "../../HTML/userPages/userHome.html";
          localStorage.setItem("user", JSON.stringify(validUser));
        } else {
          document.getElementById("psw").nextElementSibling.textContent =
            "Invalid username or password";
          console.log("Invalid username or password");
          setTimeout(() => {
            window.location.href = "../../HTML/sharedPages/sign.html";
          }, 600);
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

    async function getAllUsers() {
      try {
        const response = await axios.get("http://localhost:4000/users");
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.error("Error getting users:", error);
        return [];
      }
    }

    function toggleMode(mode) {
      allInputs.forEach((input) => (input.value = "")); // Clear all inputs

      if (mode === "signUp") {
        signUp.style.backgroundColor = "white";
        signUp.style.color = "#404553";
        logIn.style.backgroundColor = "transparent";
        logIn.style.color = "white";
        email.style.display = "block";
      } else if (mode === "logIn") {
        logIn.style.backgroundColor = "white";
        logIn.style.color = "#404553";
        signUp.style.backgroundColor = "transparent";
        signUp.style.color = "white";
        email.style.display = "none";
      }

      // Revalidate all inputs after toggling mode
      allInputs.forEach((input) => {
        input.addEventListener("input", function () {
          validateInput(input, mode);
        });
      });
    }

    function validateInput(input, mode) {
      const errorSpan = input.nextElementSibling;

      if (input.validity.valid) {
        errorSpan.textContent = ""; // Clear error message if input is valid
        checkFormValidity(mode); // Check if the entire form is valid
      } else {
        showError(input, errorSpan);
        Continue.disabled = true;
      }
    }

    function showError(input, errorSpan) {
      if (input.validity.valueMissing) {
        errorSpan.textContent = "This field is required.";
      } else if (input.validity.tooShort) {
        errorSpan.textContent = `Must be at least ${input.minLength} characters; you entered ${input.value.length}.`;
      } else if (input.validity.tooLong) {
        errorSpan.textContent = `Must be no more than ${input.maxLength} characters; you entered ${input.value.length}.`;
      } else if (input.validity.typeMismatch) {
        errorSpan.textContent = `Please enter a valid ${input.type}.`;
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
    <div class="sign-image"></div>
    <h1 class="sign-h1">Hala! Let's get started</h1>
    <div class="sign-buttons">
      <button type="button" id="signUp">Sign Up</button>
      <button type="button" id="logIn">Log in</button>
    </div>
    <div class="sign-inputs">
      <input
        type="text"
        placeholder="Enter Username"
        name="username"
        id="username"
        required
        minlength="3"
        maxlength="15"
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
        minlength="6"
      />
      <span class="sign-error"></span>
    </div>
    <button id="sign-Continue">CONTINUE</button>
  </div>
</form>
`;

let sign = document.querySelector(".user-sign");
if (sign) {
  sign.innerHTML = signContent;
} else {
  console.log("Sign element not found");
}
