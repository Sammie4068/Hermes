const navId = document.getElementById("nav_menu"),
  ToggleBtnId = document.getElementById("toggle_btn"),
  CloseBtnId = document.getElementById("close_btn");

ToggleBtnId.addEventListener("click", () => {
  navId.classList.add("show");
});

CloseBtnId.addEventListener("click", removeMenu);
function removeMenu() {
  navId.classList.remove("show");
}

AOS.init();

// Describe task
// Get all tasks
async function allTasks(parentEle) {
  try {
    parentEle.innerHTML = ``;
    const res = await fetch(`https://hermes-yto9.onrender.com/api/v1/tasks`);
    const data = await res.json();
    data.forEach((dt) => {
      const html = `<li>${dt.title}  <img src="${dt.icons}"></li>`;
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

const deliveryAddr = document.querySelector(".deliveryAddress");

taskList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    taskInput.value = event.target.textContent;
    taskList.style.display = "none";
  }
  if (taskInput.value.trim() == "errands") {
    deliveryAddr.classList.remove("hidden");
  } else {
    deliveryAddr.classList.add("hidden");
  }
});

// Describe task
const nextBtn = document.querySelector(".next-btn");
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const taskCont = document.querySelector(".task_container");
const describeTaskForm = document.querySelector(".task-info");

// Describe Task Form
const gig = document.querySelector(".task-input");
const gigDescription = document.getElementById("task-decription");
const gigLocation = document.querySelector(".task-location");
const locationState = document.getElementById("states");
const gigDuration = document.getElementById("duration");
const gigOption = document.querySelector(".task-options");
const gigDate = document.getElementById("date");
const gigTime = document.getElementById("time");
const id = localStorage.getItem("id");

describeTaskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const data = {
    task: gig.value.trim(),
    description: gigDescription.value,
    location: gigLocation.value + " " + locationState.value.toLowerCase(),
    date: gigDate.value,
    time: gigTime.value,
    status: "pending",
    setterid: id,
    duration: gigDuration.value,
  };
  createTask(data);
});

async function createTask(data) {
  try {
    const res = await fetch(
      `https://hermes-yto9.onrender.com/api/v1/activity`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const apiData = await res.json();
    if (apiData.id) {
      localStorage.setItem("gig", data.task);
      localStorage.setItem("state", locationState.value.toLowerCase());
      localStorage.setItem("taskID", apiData.id);
      renderSpinner(overlay);
      setTimeout(() => {
        window.location = "runner.html";
      }, 1500);
    }
  } catch (err) {
    console.log(err);
  }
}

function renderSpinner(parentEle) {
  overlay.style.display = "flex";
  modal.classList.add("hidden");
  parentEle.innerHTML = ``;
  const html = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  <p class="wait">Please wait..</p>
  `;
  parentEle.insertAdjacentHTML("beforeend", html);
}

function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modal.innerHTML = "";
}
