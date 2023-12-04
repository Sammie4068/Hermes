const navId = document.getElementById("nav_menu"),
  ToggleBtnId = document.getElementById("toggle_btn"),
  CloseBtnId = document.getElementById("close_btn");

ToggleBtnId.addEventListener("click", () => {
  navId.classList.add("show");
});

CloseBtnId.addEventListener("click", () => {
  navId.classList.remove("show");
});

AOS.init();

gsap.from(".logo", {
  opacity: 0,
  y: -10,
  delay: 1,
  duration: 0.5,
});

gsap.from(".nav_menu_list .nav_menu_item", {
  opacity: 0,
  y: -10,
  delay: 1.4,
  duration: 0.5,
  stagger: 0.3,
});
gsap.from(".runner_btn", {
  opacity: 0,
  y: 20,
  delay: 3,
  duration: 1,
});

gsap.from(".toggle_btn", {
  opacity: 0,
  y: -10,
  delay: 1.4,
  duration: 0.5,
});

gsap.from(".main-heading", {
  opacity: 0,
  y: 20,
  delay: 2.4,
  duration: 1,
});

gsap.from(".info-text", {
  opacity: 0,
  y: 20,
  delay: 2.8,
  duration: 1,
});

gsap.from(".btn_wrapper", {
  opacity: 0,
  y: 20,
  delay: 2.8,
  duration: 1,
});

gsap.from(".img_wrapper img", {
  opacity: 0,
  y: 20,
  delay: 3,
  duration: 1,
});

// Authentication
const token = localStorage.getItem("token");
const account = document.getElementById("account");
const signin = document.getElementById("signin");

if (token) {
  signin.classList.add("hidden");
  account.classList.remove("hidden");
}

signin.addEventListener("click", () => {
  window.location = "auth.html";
});

account.addEventListener("click", () => {
  window.location = "http://127.0.0.1:5501/account.html#dashboard";
})

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

document.querySelector(".runner_btn").addEventListener("click", () => {
  window.location = "runner.html";
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
    const res = await fetch(`http://localhost:3000/api/v1/tasks/${title}`);
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

// Get all taskers
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
  if (taskList.style.display == "none") {
    taskList.style.display = "block";
  } else {
    taskList.style.display = "none";
  }
});

document.addEventListener("click", function (event) {
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
const setterBtn = document.querySelectorAll(".setter_btn");
setterBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    if (token) {
      describeTask();
    } else {
      localStorage.setItem("role", "setter");
      window.location = "auth.html";
    }
  })
);

const wrapper = document.getElementById("wrapper");
const heroCont = document.getElementById("hero");
const describeTaskForm = document.getElementById("describe_task");
function describeTask() {
  heroCont.classList.add("hidden");
  describeTaskForm.classList.remove("hidden");
  allTasks(taskList);
}

// Describe Task Form
const gig = document.querySelector(".task-input");
const gigDescription = document.querySelector("#task-description");
const gigLocation = document.querySelector(".task-location");
const locationState = document.getElementById("states")
const gigOption = document.querySelector(".task-options");

nextBtn.addEventListener("click", (e) => {
  e.preventDefault();
  runnerSlider(gig.value, locationState.value.toLowerCase());
});

// Slider
const sliderwrapper = document.querySelector(".slider_wrapper");
const sliderContent = document.querySelector(".swiper-wrapper");
async function runnerSlider(task, location) {
  wrapper.innerHTML = ``;
  sliderwrapper.classList.remove("hidden");
  sliderContent.innerHTML = ``;
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/getrunners/${task}/${location}`
    );
  
    const data = await res.json();
    data.map((dat) => {
      let markup = `<div class="swiper-slide slide-card">
              <div class="card-content">
                <div class="image">
                  <img src="${dat.photo}" alt="sample" />
                  <h4>Trust Level: 1%</h4>
                  <span>
                    <button><i class="fa-solid fa-message"></i></button>
                    <button><i class="fa-solid fa-phone"></i></button>
                  </span>
                </div>
                <article>
                  <div class="name-profession">
                    <span class="name">${dat.name
                      .split(" ")
                      .map((a) => a.replace(a[0], a[0].toUpperCase()))
                      .join(" ")}</span>
                    <span class="profession">3 ${dat.gig} Tasks</span>
                  </div>
                  <hr />
                  <div class="about">
                    <h3>About me</h3>
                    <p>${dat.bio} </p>
                  </div>
                </article>
              </div>
            </div>`;
      sliderContent.insertAdjacentHTML("afterbegin", markup);
    });
    wrapper.appendChild(sliderwrapper);
  } catch (err) {
    console.log(err);
  }
}
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 1,
  slidesPerGroup: 1,
  loop: true,
  loopFillGroupWithBlank: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});
