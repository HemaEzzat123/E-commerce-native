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
    document.addEventListener("click", (e) => {
      if (e.target.id === "signUp") {
        toggleMode("signUp");
        Continue.addEventListener("click", async () => {
          // add new user
          const addUser = async (user) => {
            try {
              const response = await axios.post(
                "http://localhost:4000/users",
                user
              );
              return response.data;
            } catch (error) {
              console.error("Error adding user:", error);
              return null;
            }
          };
          response.data.map((user) => {
            console.log(user.username);
            if (user.username === username.value) {
              console.log("This user already exists");
            } else {
              console.log("your account has been created");
            }
          });
          let user = {};
          user.username = document.getElementById("username").value;
          user.email = document.getElementById("email").value;
          user.password = document.getElementById("psw").value;
          user.role = 1;
          user.id = "" + Math.random().toString(36).substr(2, 9);
          addUser(user);
          localStorage.setItem("user", JSON.stringify(user));
        });
      }
      if (e.target.id === "logIn") {
        toggleMode("logIn");
        Continue.addEventListener("click", () => {
          // get all users
          const getAllUsers = async () => {
            try {
              const response = await axios.get("http://localhost:4000/users");
              response.data.map((user) => {
                // console.log(user.username);
                if (user.username === username.value) {
                  console.log(username.value);
                } else {
                  console.log("not found");
                }
              });
              return response.data;
            } catch (error) {
              console.error("Error getting users:", error);
              return null;
            }
          };
          getAllUsers();
        });
      }
    });

    function toggleMode(mode) {
      if (mode === "signUp") {
        signUp.style.backgroundColor = "white";
        signUp.style.color = "#404553";
        logIn.style.backgroundColor = "transparent";
        logIn.style.color = "white";
        email.style.display = "block";
        username.value = "";
        email.value = "";
        password.value = "";
        Continue.style.backgroundColor = "";
        Continue.style.color = "";
      } else if (mode === "logIn") {
        logIn.style.backgroundColor = "white";
        logIn.style.color = "#404553";
        signUp.style.backgroundColor = "transparent";
        signUp.style.color = "white";
        inputs.style.justifyContent = "center";
        email.style.display = "none";
        username.value = "";
        password.value = "";
        Continue.style.backgroundColor = "";
        Continue.style.color = "";
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
        Continue.style.backgroundColor = "";
        Continue.style.color = "";
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
        Continue.style.cursor = "pointer"; // Set cursor to pointer when valid
      } else {
        Continue.style.backgroundColor = "";
        Continue.style.color = "";
        Continue.disabled = true;
        Continue.style.cursor = "not-allowed"; // Set cursor to not-allowed when invalid
      }
    }
  } else {
    console.error('Form with id "sign-form" not found.');
  }
});

let signContent = `
<form action="javascript:void(0);" id="sign-form">
      <div class="sign-container">
        <div class="sign-image"></div>
        <h1 class="sign-h1">Hala! Let's get started</h1>
        <div class="sign-buttons">
          <button id="signUp">Sign Up</button>
          <button id="logIn">Log in</button>
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
            type="text"
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

// let signHTML = document.querySelector(".sign-parent");
// signHTML.innerHTML = signContent;
