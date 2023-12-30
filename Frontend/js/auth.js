const container = document.getElementById("container");
const overlayCon = document.getElementById("overlaycon");
const overlayBtn = document.getElementById("overlayBtn");
const modal = document.querySelector(".modal");
const overlayer = document.querySelector(".overlayer");
const setterCard = document.getElementById("setterCard");
const runnerCard = document.getElementById("runnerCard");

setterCard.addEventListener("click", () => {
  localStorage.setItem(
    "signuprole",
    setterCard.textContent.trim().split(" ")[0].toLowerCase()
  );
  panel();
  closeModal();
});
runnerCard.addEventListener("click", () => {
  localStorage.setItem(
    "signuprole",
    runnerCard.textContent.trim().split(" ")[0].toLowerCase()
  );
  window.location = "reg.html";
});

overlayBtn.addEventListener("click", () => {
  const signuprole = localStorage.getItem("signuprole");
  if (signuprole) {
    panel();
  } else {
    overlayer.classList.remove("hidden");
    modal.classList.remove("hidden");
  }
});

function closeModal() {
  modal.classList.add("hidden");
  overlayer.classList.add("hidden");
}

overlayer.addEventListener("click", closeModal);

document.getElementById("signup-btn2").addEventListener("click", panel);
document.getElementById("signin-btn2").addEventListener("click", panel);

function panel() {
  container.classList.toggle("right-panel-active");
  overlayBtn.classList.remove("btnScaled");
  window.requestAnimationFrame(() => {
    overlayBtn.classList.add("btnScaled");
  });
}

// Form validation
const SignupForm = document.getElementById("signup-form");
const username = document.getElementById("username");
const email = document.getElementById("signup-email");
const password = document.getElementById("signup-password");
const confirmPassword = document.getElementById("signup-confirm-password");
const usernameErrMsg = document.getElementById("name-error-msg");
const emailErrMsg = document.getElementById("email-error-msg");
const passwordErrMsg = document.getElementById("password-error-msg");
const confirmPasswordErrMsg = document.getElementById("password2-error-msg");
const signupMsg = document.getElementById("sign-up-msg");
const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

SignupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    nameValidation() &&
    emailValidation() &&
    passwordValidation() &&
    confirmPasswordValidation()
  ) {
    let userData = {
      name: username.value.trim().toLowerCase(),
      email: email.value.trim().toLowerCase(),
      password: password.value,
      role: "setter",
    };
    postData(`${baseURL}register`, userData);
  }
});

function nameValidation() {
  if (username.value === "") {
    usernameErrMsg.innerText = "Please enter a username";
    document.getElementById("username-line").classList.add("error");
  } else {
    usernameErrMsg.innerText = "";
    document.getElementById("username-line").classList.remove("error");
    return true;
  }
}
username.addEventListener("input", nameValidation);

function emailValidation() {
  if (email.value === "") {
    emailErrMsg.innerText = "Please enter your email address";
    document.getElementById("email-line").classList.add("error");
  } else if (!email.value.match(emailPattern)) {
    emailErrMsg.innerText = "Please enter a valid email";
    document.getElementById("email-line").classList.add("error");
  } else {
    emailErrMsg.innerText = "";
    document.getElementById("email-line").classList.remove("error");
    return true;
  }
}
email.addEventListener("input", emailValidation);

function passwordValidation() {
  if (password.value === "") {
    passwordErrMsg.innerText = "Please enter a password";
    document.getElementById("signup-password-line").classList.add("error");
  } else {
    passwordErrMsg.innerText = "";
    document.getElementById("signup-password-line").classList.remove("error");
    return true;
  }
}
password.addEventListener("input", passwordValidation);

function confirmPasswordValidation() {
  if (confirmPassword.value !== password.value) {
    confirmPasswordErrMsg.innerText = "Password don't match";
    document
      .getElementById("signup-confirm-password-line")
      .classList.add("error");
  } else {
    confirmPasswordErrMsg.innerText = "";
    document
      .getElementById("signup-confirm-password-line")
      .classList.remove("error");
    return true;
  }
}
confirmPassword.addEventListener("input", confirmPasswordValidation);

// Post request to server
const baseURL = "http://localhost:3000/api/v1/";

async function postData(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const bodydata = await res.json();
    if (bodydata.message == "success") {
      signupMsg.textContent = "Registration Successful";
      localStorage.setItem("token", bodydata.token);
      localStorage.setItem("id", bodydata.id);
      localStorage.setItem("name", bodydata.name);
      window.location = "main.html";
    }
    if (bodydata.message == "Already Exists") {
      signupMsg.textContent = "Email Already Exist";
      signupMsg.style.color = "red";
      email.value = "";
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

// Signin Auth
const signinForm = document.getElementById("signin-form");
const signinEmail = document.getElementById("email-signin");
const signinPassword = document.getElementById("password-signin");
const signinMsg = document.getElementById("sign-in-msg");

async function loginPost(url, data) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const bodydata = await res.json();
    console.log(bodydata);
    if (bodydata.message == "invalid") {
      signinMsg.textContent = "Invalid Email or Password";
      signinMsg.style.color = "red";
    }
    if (bodydata.message == "logged") {
      localStorage.setItem("token", bodydata.token);
      localStorage.setItem("id", bodydata.id);
      localStorage.setItem("name", bodydata.name);
      localStorage.setItem("photo", bodydata.photo);
      localStorage.setItem("email", bodydata.email);
      localStorage.setItem("task", bodydata.gig);
      localStorage.setItem("bio", bodydata.bio);
      localStorage.setItem("wallet", bodydata.wallet);
      if (bodydata.role == "setter") {
        window.location = "main.html";
      } else if (bodydata.role == "runner") {
        window.location = "account.html";
      }
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let userData = {
    email: signinEmail.value.trim(),
    password: signinPassword.value,
    role: localStorage.getItem("role"),
  };
  loginPost(`${baseURL}login`, userData);
});

// Password show and hide
const signinEyeIcon = document.getElementById("signinEyeIcon");
const signupEyeIcon = document.getElementById("eyeIcon");
const confirmEyeIcon = document.getElementById("confirmEyeIcon");

function showpass(input, icon) {
  if (input.value == "") return;
  if (input.type == "password") {
    input.type = "text";
    icon.innerHTML = `<i class="fas fa-eye-slash"></i>`;
  } else {
    input.type = "password";
    icon.innerHTML = `<i class="fas fa-eye"></i>`;
  }
}

signinEyeIcon.addEventListener("click", () =>
  showpass(signinPassword, signinEyeIcon)
);
signupEyeIcon.addEventListener("click", () =>
  showpass(password, signupEyeIcon)
);
confirmEyeIcon.addEventListener("click", () =>
  showpass(confirmPassword, confirmEyeIcon)
);
