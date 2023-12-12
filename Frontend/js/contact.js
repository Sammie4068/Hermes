const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const account = document.getElementById("account");
const signin = document.getElementById("signin");
const runnerBtn = document.querySelector(".runner_btn");
const services = document.getElementById("services");

if (token) {
  signin.classList.add("hidden");
  account.classList.remove("hidden");
  runnerBtn.classList.add("hidden");
}

runnerBtn.addEventListener("click", () => {
  window.location = "reg.html";
});

signin.addEventListener("click", () => {
  window.location = "auth.html";
});

account.addEventListener("click", () => {
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