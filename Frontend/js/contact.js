const navId = document.getElementById("nav_menu"),
  ToggleBtnId = document.getElementById("toggle_btn"),
  CloseBtnId = document.getElementById("close_btn");

ToggleBtnId.addEventListener("click", () => {
  navId.classList.add("show");
});

CloseBtnId.addEventListener("click", () => {
  navId.classList.remove("show");
});

const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const username = localStorage.getItem("name");
const activity = document.getElementById("activity");
const signin = document.getElementById("signin");
const runnerLink = document.getElementById("runner_link");
const services = document.getElementById("services");

if (token) {
  signin.classList.add("hidden");
  activity.classList.remove("hidden");
  runnerLink.classList.add("hidden");
}

activity.addEventListener("click", () => {
  if (role == "setter") {
    window.location = "profile.html#dashboard";
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
