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

// gsap.from(".logo", {
//   opacity: 0,
//   y: -10,
//   delay: 1,
//   duration: 0.5,
// });

// gsap.from(".nav_menu_list .nav_menu_item", {
//   opacity: 0,
//   y: -10,
//   delay: 1.4,
//   duration: 0.5,
//   stagger: 0.3,
// });

// gsap.from(".toggle_btn", {
//   opacity: 0,
//   y: -10,
//   delay: 1.4,
//   duration: 0.5,
// });

// gsap.from(".main-heading", {
//   opacity: 0,
//   y: 20,
//   delay: 2.4,
//   duration: 1,
// });

// gsap.from(".grid-item-1 img", {
//   opacity: 0,
//   y: 20,
//   delay: 2.5,
//   duration: 1,
// });

// gsap.from(".info-text", {
//   opacity: 0,
//   y: 20,
//   delay: 2.8,
//   duration: 1,
// });

// gsap.from(".btn_wrapper", {
//   opacity: 0,
//   y: 20,
//   delay: 2.8,
//   duration: 1,
// });

// gsap.from(".img_wrapper img", {
//   opacity: 0,
//   y: 20,
//   delay: 3,
//   duration: 1,
// });

// Authentication
const token = localStorage.getItem("token");
const role = localStorage.getItem("role");
const username = localStorage.getItem("name");
const activity = document.getElementById("activity");
const signin = document.getElementById("signin");
const runnerLink = document.getElementById("runner_link");

if (token) {
  signin.classList.add("hidden");
  activity.classList.remove("hidden");
  runnerLink.classList.add("hidden");
}

const asSetter = document.getElementById("as-setter");
const asRunner = document.getElementById("as-runner");

function setRole(role) {
  window.location = "auth.html";
  localStorage.setItem("role", role);
}

asSetter.addEventListener("click", () => {
  setRole("setter");
});
asRunner.addEventListener("click", () => {
  setRole("runner");
});

// Task cards
const cards = document.querySelectorAll(".card");

cards.forEach((card) => {
  card.addEventListener("click", (e) => {
    toggleActive(card);
    let title = card.innerText.toLowerCase();
    displayTask(title);
  });
});

function toggleActive(activeCard) {
  cards.forEach((card) => card.classList.remove("active"));
  activeCard.classList.add("active");
}

const taskImage = document.getElementById("task_image");
const taskTitle = document.getElementById("task_title");
const taskDescription = document.getElementById("task_text");
const runnerNum = document.getElementById("runner_number");
const startingTip = document.getElementById("starting_tip");

async function displayTask(title) {
  try {
    const res = await fetch(
      `https://hermes-yto9.onrender.com/api/v1/tasks/${title}`
    );
    const data = await res.json();

    taskImage.attributes.src.nodeValue = data[0].image;
    taskTitle.innerText = data[0].title;
    taskDescription.innerText = data[0].description;
    runnerNum.innerText = data[0].runners + "+";
    startingTip.innerText = data[0].tip;
  } catch (err) {
    console.error(err);
  }
}

window.addEventListener("load", () => {
  displayTask("errands");
});

// // Describe task
const setterBtn = document.querySelectorAll(".setter_btn");
setterBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (token) {
      window.location = "describeTask.html";
    } else {
      localStorage.setItem("role", "setter");
      window.location = "auth.html";
    }
  })
);
