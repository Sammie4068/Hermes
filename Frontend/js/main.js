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
  delay: 0.3,
  duration: 0.5,
});

gsap.from(".nav_menu_list .nav_menu_item", {
  opacity: 0,
  y: -10,
  delay: 0.5,
  duration: 0.5,
  stagger: 0.3,
});
gsap.from(".runner_btn", {
  opacity: 0,
  y: -10,
  delay: 1.1,
  duration: 1,
});

gsap.from(".toggle_btn", {
  opacity: 0,
  y: -10,
  delay: 0.5,
  duration: 0.5,
});

gsap.from(".main-heading", {
  opacity: 0,
  y: 20,
  delay: 0.7,
  duration: 1,
});

gsap.from(".info-text", {
  opacity: 0,
  y: 20,
  delay: 0.8,
  duration: 1,
});

gsap.from(".btn_wrapper", {
  opacity: 0,
  y: 20,
  delay: 0.9,
  duration: 1,
});

gsap.from(".img_wrapper img", {
  opacity: 0,
  y: 20,
  delay: 1,
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

const setterBtn = document.querySelectorAll(".setter_btn");
setterBtn.forEach((btn) =>
  btn.addEventListener("click", () => {
    describeTask();
  })
);
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


const wrapper = document.getElementById("wrapper");
function describeTask() {
  wrapper.innerHTML = ``;
  let markup = `<div class="contain" data-aos="fade-up" data-aos-duration="1000">
        <h4>Describe your Task</h4>
        <p>
          Tell us about your task. We use these details to get Runners in your
          area who fit your needs.
        </p>
        <form action="#" class="task-info">
          <div class="input-field">
            <label>Task </label>
            <input type="text" class="task-input" placeholder="Select a task" readonly required/>
           <ul class="task-dropdown" id="task-dropdown">
            </ul>
          </div>
          <div class="input-field">
            <label>Task description</label>
            <textarea id="task-decription" placeholder="Start the conversation and tell your Runner what you need done."></textarea>
          </div>
          <div class="input-field">
            <label>Task Location</label>
            <input type="text" required/>
          </div>
          <div class="input-field">
            <label>Task Options</label>
            <select required class="task-options">
              <option disabled selected>How big is your task?</option>
              <option>Small - 1hr max</option>
              <option>Medium - 3hrs max</option>
              <option>Big - 4hr+ max</option>
            </select>
          </div>
          <div class="input-field">
            <label>Number of runners</label>
            <input type="number" placeholder="How many runners do you need?" required/>
          </div>
          ${
            token
              ? `<button class="btn next-btn">Next</button>`
              : `<button class="btn task-signinBtn">Sign in to get runner</button>`
          }
        </form>
      </div>`;
  wrapper.insertAdjacentHTML("afterbegin", markup);
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
  allTasks(taskList);

  document.querySelector(".task-signinBtn").addEventListener("click", (e) => {
    e.preventDefault();
    window.location = "auth.html";
    localStorage.setItem("role", "setter");
  });
}




