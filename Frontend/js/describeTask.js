AOS.init();

// Describe task
// Get all tasks
async function allTasks(parentEle) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/tasks`);
    const data = await res.json();
    data.forEach((dt) => {
      const html = `<li>${dt.title}</li>`;
      parentEle.insertAdjacentHTML("afterbegin", html);
    });
  } catch (err) {
    console.log(err);
  }
}

const taskInput = document.querySelector(".task-input");
const taskList = document.getElementById("task-dropdown");

taskInput.addEventListener("click", function () {
  allTasks(taskList);
  if (taskList.style.display == "none") {
    taskList.style.display = "block";
  } else {
    taskList.style.display = "none";
  }
});

document.addEventListener("DOMContentLoaded", function (event) {
  if (event.target !== taskInput && event.target !== taskList) {
    taskList.style.display = "none";
  }
});

taskList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    taskInput.value = event.target.textContent;
    taskList.style.display = "none";
  }
});

// Describe task
const nextBtn = document.querySelector(".next-btn");
const overlay = document.querySelector(".overlay");
const taskCont = document.querySelector(".task_container");
const runnerCont = document.querySelector(".runner_section");
const describeTaskForm = document.getElementById("describe_task");

// Describe Task Form
const gig = document.querySelector(".task-input");
const gigDescription = document.querySelector("#task-description");
const gigLocation = document.querySelector(".task-location");
const locationState = document.getElementById("states");
const gigOption = document.querySelector(".task-options");

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.setItem("gig", gig.value);
  localStorage.setItem("location", locationState.value.toLowerCase());
  renderSpinner(overlay);
  setTimeout(() => {
    window.location = "runner.html";
  }, 1500);
});

function renderSpinner(parentEle) {
  overlay.style.display = "flex";
  parentEle.innerHTML = ``;
  const html = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  <p class="wait">Please wait..</p>
  `;
  parentEle.insertAdjacentHTML("beforeend", html);
}

//Services
const services = document.getElementById("services");
services.addEventListener("click", () => {
  window.location = "main.html#services";
});

//Account
const role = localStorage.getItem("role");
const account = document.getElementById("account");
account.addEventListener("click", () => {
  if (role == "setter") {
    window.location = "profile.html#profile";
  } else if (role == "runner") {
    window.location = "account.html#dashboard";
  }
});
