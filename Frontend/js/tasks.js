// userProfile
const role = localStorage.getItem("role");
const username = localStorage.getItem("name");
const userProfile = document.querySelector(".user");
const user = document.querySelector(".user p");
const userImg = document.querySelector(".user img");
userProfile.style.display = "flex";
user.innerText = `${username}`;
user.addEventListener("click", () => {
  if (role == "setter") {
    window.location = "profile.html#profile";
  } else if (role == "runner") {
    window.location = "account.html#dashboard";
  }
});
userImg.addEventListener("click", () => {
  if (role == "setter") {
    window.location = "profile.html#profile";
  } else if (role == "runner") {
    window.location = "account.html#dashboard";
  }
});

// Services
const services = document.getElementById("services");
services.addEventListener("click", () => {
  window.location = "main.html#services";
});

// AOS.init();
// Url instance
const urlParams = new URLSearchParams(window.location.search);

// Filter Active Switch
function active(parentEle, ele) {
  parentEle.forEach((i) => i.classList.remove("active_option"));
  ele.classList.add("active_option");
}

function removeAllactive(parentEle) {
  parentEle.forEach((i) => i.classList.remove("active_option"));
}

// Display tasks
const table = document.getElementById("table_container");
const id = localStorage.getItem("id");
function displayTask(data) {
  const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  sortedData.map((dat) => {
    const originalDate = new Date(dat.date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-UK", options).format(
      originalDate
    );
    let value = JSON.stringify(dat.id);

    let markup = `<tr id="table_element">
                <td>
                <img src="${dat.photo}" />
                   <p>${dat.name}</p>
                      </td>
                <td class="task_name">${dat.task}</td>
                <td>${formattedDate}</td>
                <td><button class="status ${dat.status}" value='${value}'>${dat.status}</button></td>
              </tr>`;
    table.insertAdjacentHTML("beforeend", markup);
  });
 
  const tableEle = document.querySelectorAll("#table_element");
  tableEle.forEach((tab) => {
    tab.addEventListener("click", () => {
      let taskID;
      let taskName;
      const taskTab = tab.querySelectorAll(".task_name");
      taskTab.forEach((btn) => {
        taskName = btn.innerText.toLowerCase();
      });

      const statusBtn = tab.querySelectorAll(".status");
      statusBtn.forEach((btn) => {
        taskID = JSON.parse(btn.value);
      });
      taskTableInfo(taskID, taskName);
    });
  });
}

async function getTableData() {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/activity/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getTasks() {
  const data = await getTableData();
  displayTask(data);
}
window.addEventListener("load", getTasks);

// filter Table

// empty table
function emptyCardDiv() {
  const tableEle = document.querySelectorAll("#table_element");
  tableEle.forEach((card) => (card.style.display = "none"));
}

// all Tasks
const filterTask = document.querySelector(".task_filter_options");
async function allTasks(parentEle) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/tasks`);
    const data = await res.json();
    data.forEach((dt) => {
      const html = `<option>${dt.title}</option>`;
      parentEle.insertAdjacentHTML("afterbegin", html);
    });
  } catch (err) {
    console.log(err);
  }
}
allTasks(filterTask);

filterTask.addEventListener("change", () => {
  const selectedValue = filterTask.value;
  if (selectedValue == "All Tasks") getTasks();
  filterByTasks(selectedValue);
});

// filter by tasks
async function filterByTasks(task) {
  emptyCardDiv();
  const data = await getTableData();
  const filteredArr = data.filter((dat) => dat.task == task);
  displayTask(filteredArr);
}

// more Info
async function taskTableInfo(id, gig) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/activity/id/${id}`);
    const data = await res.json();

    const result = await fetch(`http://localhost:3000/api/v1/tasks/${gig}`);
    const bodydata = await result.json();
    const taskImgData = bodydata[0];

    statusDisplay(data[0], taskImgData);
  } catch (err) {
    console.log(err);
  }
}

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
function statusDisplay(data, taskImgData) {
  modal.innerHTML = ``;

    const originalDate = new Date(data.date);
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-UK", options).format(
      originalDate
    );
  let html = `<div class="card_body">
        <div class="task__info">
          <span>
            <h1>${data.task}</h1>
            <img src="${taskImgData.icons}" alt="${data.title}"/>
            <div class="status">
              <p><strong>Status:</strong><span class="pending">pending</span></p>
            </div>
          </span>
          <span>
            <strong>Location:</strong>${data.location}</span>
          <span>
            <p> <strong>Date:</strong> ${formattedDate}</p>
            <p> <strong>Time:</strong> ${data.time}</p>
          </span>
        </div>
      </div>
      <div>
        <h2>Runner info</h2>
        <div class="heading">
          <img src="${data.photo}" alt="sample" />
          <div class="runner-info">
            <h1>${data.name}</h1>
            <p>${data.school}</p>
            <div class="contact_icons">
              <span><i class="fa-solid fa-message"></i> message</span>
              <span><i class="fa-solid fa-phone"></i> call</span>
            </div>
          </div>
        </div>
        <hr />
        <div class="about_runner">
          <h3>About</h3>
          <p>${data.bio}</p>
        </div>
        <hr />
        <div class="review_runner">
          <h3>Reviews (1)</h3>
          <div class="reviewer">
            <img
              src="https://res.cloudinary.com/okorosamuel/image/upload/v1701356059/Hermes/user-avatar-svgrepo-com_wof4w4.svg"
              alt="sample"
            />
            <div class="review">
              <h4>Joe Biden</h4>
              <div class="stars">
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
              </div>
              <p>
                This person is a very good person. They are a honest person and highly diligent.
              </p>
            </div>
          </div>
        </div>
      </div>`;

  modal.insertAdjacentHTML("beforeend", html);
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

overlay.addEventListener("click", () => {
  modal.innerHTML = ``;
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});
