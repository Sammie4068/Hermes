// Init
const id = localStorage.getItem("id");
const userImage = document.getElementById("userImage");
const userProfileName = document.getElementById("userName");
const walletAmt = document.getElementById("wallet__amount");
const taskCompleted = document.getElementById("task__completed");
const taskPending = document.getElementById("task__pending");

const username = localStorage.getItem("name");
const photo = localStorage.getItem("photo");
const wallet = localStorage.getItem("wallet");

// const email = localStorage.getItem("email");
// const task = localStorage.getItem("task");
// const bio = localStorage.getItem("bio");
// const editBtn = document.getElementById("edit__btn");
// const saveBtn = document.getElementById("saveBtn");
// const inputs = document.querySelectorAll("input");
// const nameInput = document.querySelector(".name");
// const emailInput = document.querySelector(".email");
// const bioInput = document.querySelector("#bio");
// const profileInfo = document.querySelector(".profile-info");
// const btnWrapper = document.querySelector(".btn-wrapper");
// const profileImage = document.getElementById("profile_image");
// const editDp = document.getElementById("edit_dp");
// const tipInput = document.querySelector(".tip");
// const taskInput = document.querySelector(".task-input");
// const taskList = document.getElementById("task-dropdown");

async function init() {
  // Nav bar profile
  userProfileName.innerText = username;
  userImage.attributes.src.value = photo;

  // Dashboard
  walletAmt.innerText = wallet;
  const runnerActivityData = await runnerActivity();
  const taskCompletedData = runnerActivityData.filter(
    (data) => data.status == "completed"
  );
  const taskPendingData = runnerActivityData.filter(
    (data) => data.status == "pending"
  );
  taskCompleted.innerText = taskCompletedData.length;
  taskPending.innerText = taskPendingData.length;

  // Dashboard Activity Table
  dashboardTableDisplay(runnerActivityData);
  displayTask(runnerActivityData);

  // profileImage.attributes.src.value = photo;
  // nameInput.value = username;
  // emailInput.value = email;
  // taskInput.value = task.replace(task[0], task[0].toUpperCase());

  // bioInput.value = bio;
}
init();

async function runnerActivity() {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/activity/runner/${id}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// date and time function
function reformatDate(date) {
  const originalDate = new Date(date);
  const options = { year: "numeric", month: "short", day: "numeric" };
  const formattedDate = new Intl.DateTimeFormat("en-UK", options).format(
    originalDate
  );
  return formattedDate;
}

function reformatTime(time) {
  const inputTimeString = time;
  const parsedTime = new Date(`2000-01-01T${inputTimeString}`);
  const formattedTime = parsedTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return formattedTime
}

// Activity Data
const dashboardTable = document.getElementById("dashboard_table");
const taskTable = document.getElementById("task_table");

function dashboardTableDisplay(data) {
    const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3);
    sortedData.map((dat) => {
      let value = JSON.stringify(dat);

      let markup = `<tr id="table_element">
                <td>
                <img src="${
                  dat.photo ||
                  "https://res.cloudinary.com/okorosamuel/image/upload/v1701356059/Hermes/user-avatar-svgrepo-com_wof4w4.svg"
                }" />
                   <p>${dat.name}</p>
                      </td>
                <td>${reformatDate(dat.date)}</td>
                <td><button class="status ${dat.status}" value='${value}'>${
        dat.status
      }</button>
              </tr>`;
      dashboardTable.insertAdjacentHTML("beforeend", markup);
    });
}

function displayTask(data) {
  const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  sortedData.map((dat) => {

    let value = JSON.stringify(dat);

    let markup = `<tr id="table_element">
                <td>
                <img src="${
                  dat.photo ||
                  "https://res.cloudinary.com/okorosamuel/image/upload/v1701356059/Hermes/user-avatar-svgrepo-com_wof4w4.svg"
                }" />
                   <p>${dat.name}</p>
                      </td>
                <td>${reformatDate(dat.date)}</td>
                <td><button class="status ${dat.status}" value='${value}'>${
      dat.status
    }</button></td>
    <td class="dropdown-cell">
                <i class='bx bx-dots-vertical-rounded' ></i>
                <div class="dropdown-content">
                  <a href="#">confirm task</a>
                  <a href="#">reject task</a>
                  <a href="#">delete</a>
                </div>
              </td>
              </tr>`;
    taskTable.insertAdjacentHTML("beforeend", markup);
  });

  const tableEle = document.querySelectorAll("#table_element");
  tableEle.forEach((tab) => {
    tab.addEventListener("click", () => {
      let taskData;

      const statusBtn = tab.querySelectorAll(".status");
      statusBtn.forEach((btn) => {
        taskData = JSON.parse(btn.value);
      });
      taskTableInfo(taskData.id, taskData.task);
    });
  });
}



// Display Contents
const contents = document.querySelectorAll(".content_display");
const dashboardDisplay = document.getElementById("dashboard_display");
const tasksDisplay = document.getElementById("tasks_display");
// const profileDisplay = document.querySelector(".my_profile");
const dashboardLink = document.getElementById("dashboardLink");
const tasksLink = document.getElementById("tasksLink");
// const profileLink = document.getElementById("profileLink");
// const messagesDisplay = document.querySelector(".messages");
// const messagesLink = document.getElementById("messagesLink");
// const settingsDisplay = document.querySelector(".settings");
const settingsLink = document.getElementById("settings");
const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

function displayContent(ele) {
  hideAllContents();
  ele.classList.remove("hidden");
}

function hideAllContents() {
  contents.forEach((content) => {
    content.classList.add("hidden");
  });
}
updateDisplay();
function updateDisplay() {
  const state = window.location.hash.slice(1);
  switch (state) {
    case "dashboard":
      displayContent(dashboardDisplay);
      active(dashboardLink);
      break;
    case "tasks":
      displayContent(tasksDisplay);
      active(tasksLink);
      break;
    // case "profile":
    //   displayContent(profileDisplay);
    //   active(tasksLink);
    //   break;
    // case "messages":
    //   displayContent(messagesDisplay);
    //   active(messagesLink);
    //   break;
    // case "settings":
    //   displayContent(settingsDisplay);
    //   break;
    default:
      break;
  }
}
window.addEventListener("hashchange", updateDisplay);

// SideBar active
function active(ele) {
  allSideMenu.forEach((i) => {
    i.parentElement.classList.remove("active");
  });
  ele.classList.add("active");
}

// See more on task
const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");

function seeMore(data, taskImgData) {
  let html = `<div class="card_body">
        <div class="task_side">
          <span>
            <h1>${data.task}</h1>
            <img
              src="${taskImgData.icons}"
              alt="${data.task}"
            />
          </span>
          <span class="status">
            <p><strong>Status:</strong><span class="${data.status}">${
    data.status
  }</span></p>
          </span>
          <span>
            <strong>Location:</strong> ${data.location}
          </span>
          <span>
            <p><strong>Date:</strong> ${reformatDate(data.date)}</p>
            <p><strong>Time:</strong> ${reformatTime(data.time)}</p>
          </span>
        </div>
        <div class="billing">
          <h2>Pricing</h2>
          <p>Tip: NGN 1000</p>
          <p>Transportation: NGN 1000</p>
          <p><strong>Total:</strong> <strong>NGN 2000</strong></p>
        </div>
      </div>
      <div>
        <h2>Runner info</h2>
        <div class="heading">
          <img src="${
            data.photo ||
            "https://res.cloudinary.com/okorosamuel/image/upload/v1701356059/Hermes/user-avatar-svgrepo-com_wof4w4.svg"
          }" />
          <div class="setter-info">
            <h1>${data.name}</h1>
            <div class="contact_icons">
              <span><i class="fa-solid fa-message"></i> message</span>
              <span><i class="fa-solid fa-phone"></i> call</span>
            </div>
          </div>
        </div>
      </div>`;
  modal.insertAdjacentHTML("beforeend", html);
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}

// more Info
async function taskTableInfo(id, gig) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/activity/setter/${id}`);
    const data = await res.json();

    const result = await fetch(`http://localhost:3000/api/v1/tasks/${gig}`);
    const bodydata = await result.json();
    const taskImgData = bodydata[0];

    seeMore(data[0], taskImgData);
  } catch (err) {
    console.log(err);
  }
}

// close modal
overlay.addEventListener("click", () => {
  modal.innerHTML = ``;
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});

// //Switch to password
// const profileCard = document.querySelector(".profile_card");
// const passwordCard = document.querySelector(".password_card");
// const changePasswordBtn = document.querySelector(".change-password");
// const backArrow = document.getElementById("back_arrow");

// changePasswordBtn.addEventListener("click", () => {
//   profileCard.style.display = "none";
//   passwordCard.style.display = "block";
// });

// backArrow.addEventListener("click", () => {
//   profileCard.style.display = "flex";
//   passwordCard.style.display = "none";
// });

// // Change Password
// const oldPassword = document.getElementById("old_password");
// const newPassword = document.getElementById("new_password");
// const cNewPassword = document.getElementById("confirm_new_password");
// const changePasswordMsg = document.getElementById("change_password_msg");
// const passwordSaveBtn = document.getElementById("password_saveBtn");

// function oldpasswordValidation() {
//   if (oldPassword.value === "") {
//     changePasswordMsg.innerText = "Please fill all inputs";
//   } else {
//     changePasswordMsg.innerText = "";
//     return true;
//   }
// }

// function newpasswordValidation() {
//   if (newPassword.value === "") {
//     changePasswordMsg.innerText = "Please fill all inputs";
//   } else {
//     changePasswordMsg.innerText = "";
//     return true;
//   }
// }

// function confirmPasswordValidation() {
//   if (cNewPassword.value !== newPassword.value) {
//     changePasswordMsg.innerText = "Password don't match";
//     document;
//   } else {
//     changePasswordMsg.innerText = "";
//     return true;
//   }
// }

// passwordSaveBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   if (
//     oldpasswordValidation() &&
//     newpasswordValidation() &&
//     confirmPasswordValidation()
//   ) {
//     changePassword();
//   }
// });

// async function changePassword() {
//   try {
//     const newData = {
//       oldPassword: oldPassword.value,
//       newPassword: newPassword.value,
//     };

//     const res = await fetch(
//       `http://localhost:3000/api/v1/users/password/${id}`,
//       {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newData),
//       }
//     );
//     const data = await res.json();

//     if (data.message == "success") {
//       changePasswordMsg.innerText = "Password change";
//       changePasswordMsg.style.color = "#002b1d";
//       oldPassword.value = "";
//       newPassword.value = "";
//       cNewPassword.value = "";
//     }
//     if (data.message == "invalid") {
//       changePasswordMsg.innerText = "Invalid Password";
//     }
//   } catch (err) {
//     console.log(err);
//   }
// }

// Logout
const logoutLink = document.getElementById("logout");
logoutLink.addEventListener("click", logout);
function logout() {
  localStorage.clear();
  window.location = "main.html";
}

// // Get all taskers
// async function allTasks(parentEle) {
//   try {
//     const res = await fetch(`http://localhost:3000/api/v1/tasks`);
//     const data = await res.json();
//     parentEle.innerHTML = ``;
//     data.forEach((dt) => {
//       const html = `<li>${dt.title}</li>`;
//       parentEle.insertAdjacentHTML("afterbegin", html);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// }

// taskInput.addEventListener("click", function () {
//   if (taskList.style.display == "none") {
//     taskList.style.display = "block";
//   } else {
//     taskList.style.display = "none";
//   }
// });

// document.addEventListener("click", function (event) {
//   if (event.target !== taskInput && event.target !== taskList) {
//     taskList.style.display = "none";
//   }
// });

// taskList.addEventListener("click", function (event) {
//   if (event.target.tagName === "LI") {
//     taskInput.value = event.target.textContent;
//     taskList.style.display = "none";
//   }
// });

// function edit() {
//   inputs.forEach((input) => {
//     input.removeAttribute("readonly");
//     input.style.border = "2px solid #002b1d";
//   });
//   bioInput.removeAttribute("readonly");
//   bioInput.style.border = "2px solid #002b1d";
//   profileImage.style.border = "2px solid #002b1d";
//   editDp.disabled = false;
//   editBtn.classList.add("hidden");
//   saveBtn.classList.remove("hidden");
// }
// editBtn.addEventListener("click", () => {
//   edit();
//   allTasks(taskList);
// });

// async function save() {
//   try {
//     const newData = {
//       name: nameInput.value.trim().toLowerCase(),
//       email: emailInput.value.trim(),
//       task: taskInput.value.trim().toLowerCase(),
//       bio: bioInput.value.trim(),
//       tip: tipInput.value,
//     };

//     const res = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(newData),
//     });
//     const data = await res.json();
//     console.log(data);

//     if (data.message == "success") {
//       localStorage.setItem("name", data.name);
//       localStorage.setItem("email", data.email);
//       localStorage.setItem("task", data.task);
//       localStorage.setItem("bio", data.bio);
//       localStorage.setItem("tip", data.tip);

//       editBtn.classList.remove("hidden");
//       saveBtn.classList.add("hidden");
//       inputs.forEach((input) => {
//         input.setAttribute("readonly", "readonly");
//         input.style.border = "2px solid #68ddcb";
//       });
//       profileImage.style.border = "2px solid #68ddcb";
//       editDp.disabled = true;
//       bioInput.setAttribute("readonly", "readonly");
//       bioInput.style.border = "2px solid #68ddcb";
//     }
//   } catch (err) {
//     console.error(`Error: ${err}`);
//   }
// }
// saveBtn.addEventListener("click", save);
