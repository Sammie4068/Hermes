AOS.init();

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const username = localStorage.getItem("name");
const account = document.getElementById("account");
const signin = document.getElementById("signin");
const runnerBtn = document.querySelector(".runner_btn");
const services = document.getElementById("services");
const userProfile = document.querySelector(".user");
const user = document.querySelector(".user p");

if (token) {
  signin.classList.add("hidden");
  account.classList.remove("hidden");
  runnerBtn.classList.add("hidden");
    userProfile.style.display = "flex";
    user.innerText = `${username}`;
}

runnerBtn.addEventListener("click", () => {
  window.location = "reg.html";
});

signin.addEventListener("click", () => {
  window.location = "auth.html";
});

userProfile.addEventListener("click", () => {
  if (role == "setter") {
    window.location = "profile.html#profile";
  } else if (role == "runner") {
    window.location = "account.html#dashboard";
  }
});

const asSetter = document.getElementById("as-setter");
const asRunner = document.getElementById("as-runner");

function setRole(role) {
  window.location = "auth.html";
  localStorage.setItem(
    "role",
    role.textContent.trim().split(" ")[1].toLowerCase()
  );
}

asSetter.addEventListener("click", () => {
  setRole(asSetter);
});
asRunner.addEventListener("click", () => {
  setRole(asRunner);
});

services.addEventListener("click", () => {
  window.location = "main.html#services";
});
