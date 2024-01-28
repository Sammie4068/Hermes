// Init
const id = localStorage.getItem("id");
const userImage = document.getElementById("userImage");
const userProfileName = document.getElementById("userName");
const walletAmt = document.getElementById("wallet__amount");
const taskProcessing = document.getElementById("task__processing");
const taskPending = document.getElementById("task__pending");
const taskTableNumber = document.querySelector(".head h3 span");

const balanceAmt = document.getElementById("balance-amount");
const balanceDate = document.querySelector(".balance_date span");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const taskInput = document.getElementById("task-input");
const bioInput = document.getElementById("bio");
const profileImage = document.getElementById("profile_image");
const underline = document.querySelectorAll(".underline");
const editBtn = document.getElementById("edit__btn");
const saveBtn = document.getElementById("saveBtn");

const username = localStorage.getItem("name");
const photo = localStorage.getItem("photo");
const walletBalance = localStorage.getItem("wallet");
const email = localStorage.getItem("email");
const phone = localStorage.getItem("phone");
const task = localStorage.getItem("task");
const bio = localStorage.getItem("bio");
const inputs = document.querySelectorAll(".profileInputs");

let number = +walletBalance;
let wallet = number.toLocaleString("en-US") + "." + walletBalance.split(".")[1];

async function init() {
  // Nav bar profile
  userProfileName.innerText = username;
  userImage.attributes.src.value = photo;

  // Dashboard
  walletAmt.innerText = wallet;
  const runnerActivityData = await runnerActivity();
  const taskProcessingData = runnerActivityData.filter(
    (data) => data.status == "processing"
  );
  const taskPendingData = runnerActivityData.filter(
    (data) => data.status == "pending"
  );
  taskProcessing.innerText = taskProcessingData.length;
  taskPending.innerText = taskPendingData.length;

  // Dashboard Activity Table
  dashboardTableDisplay(runnerActivityData);
  displayTask(runnerActivityData);

  // Tasks
  allTasks(taskFilterOPt);

  // Wallet
  balanceAmt.innerText = wallet;
  balanceDate.innerText = reformatDate(new Date());

  // Profile
  profileImage.attributes.src.value = photo;
  nameInput.value = username;
  emailInput.value = email;
  phoneInput.value = phone;
  taskInput.innerHTML = `<option>${task}</option>`;
  bioInput.value = bio;
  allTasks(taskInput);
}
init();

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");
const logo = document.querySelector(".brand");

menuBar.addEventListener("click", hideSideBar);

function responsiveness() {
  if (window.matchMedia("(max-width: 768px)").matches) {
    hideSideBar();
  }
}
responsiveness();
document.addEventListener("load", responsiveness);

function hideSideBar() {
  sidebar.classList.toggle("hide");
  if (sidebar.attributes.class.textContent == "hide") {
    logo.classList.add("disappear");
  } else {
    logo.classList.remove("disappear");
  }
}

// Availability Toggle
const switchMode = document.getElementById("switch-mode");
const availabilityStatus = document.getElementById("avail_status");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    availabilityStatus.innerText = "ON";
  } else {
    availabilityStatus.innerText = "OFF";
  }
});

// Dashboard HashChange
const walletCard = document.getElementById("walletCard");
const dashboardDisplayTab = document.querySelector(".table-data");
const runningTaskCard = document.getElementById("runningTaskCard");
const pendingTaskCard = document.getElementById("pendingTaskCard");

function changingHash(div, hash) {
  div.addEventListener("click", () => {
    window.location.hash = `#${hash}`;
  });
  // responsiveness()
}

changingHash(walletCard, "wallet");
changingHash(dashboardDisplayTab, "tasks");
changingHash(runningTaskCard, "tasks");
changingHash(pendingTaskCard, "tasks");

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

  return formattedTime;
}

// Activity Data

// Table icons
const filterIcon = document.getElementById("filterIcon");
const filterWrapper = document.querySelector(".filter");
const iconWrapper = document.querySelector(".icon_wrapper");
filterIcon.addEventListener("click", () => {
  filterWrapper.style.display = "flex";
  iconWrapper.style.display = "none";
});

const filterCancel = document.getElementById("filter_cancel");
filterCancel.addEventListener("click", async () => {
  filterWrapper.style.display = "none";
  iconWrapper.style.display = "block";
  // clearFilters();
  const runnerActivityData = await runnerActivity();
  displayTask(runnerActivityData);
});

const searchIcon = document.getElementById("searchIcon");
const searchWrapper = document.querySelector(".search-form");
searchIcon.addEventListener("click", () => {
  searchWrapper.style.display = "flex";
  iconWrapper.style.display = "none";
});

const searchCancel = document.getElementById("search_cancel");
searchCancel.addEventListener("click", async () => {
  searchWrapper.style.display = "none";
  iconWrapper.style.display = "block";

  const runnerActivityData = await runnerActivity();
  displayTask(runnerActivityData);
});

// Task filter options
const taskFilterOPt = document.querySelector(".task_filter_options");
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

// filter Options
taskFilterOPt.addEventListener("change", async () => {
  data = await runnerActivity();

  let filterArr = data.filter((runner) => {
    if (taskFilterOPt.value == "All") return runner;

    return runner.task == taskFilterOPt.value;
  });

  displayTask(filterArr);
});

const statusFilterOpt = document.querySelector(".status_filter_options");

statusFilterOpt.addEventListener("change", async () => {
  data = await runnerActivity();

  let filterArr = data.filter((runner) => {
    if (statusFilterOpt.value == "All") return runner;

    return runner.status == statusFilterOpt.value.toLowerCase();
  });

  displayTask(filterArr);
});

// Fllter display
async function displayFilter() {
  let task = urlParams.get("task");
  let status = urlParams.get("status");
  data = await runnerActivity();
  let filterArr = data;

  if (task && status) {
    filterArr = data.filter((runner) => {
      return runner.task == task && runner.status == status;
    });
  }
  if (task && !status) {
    filterArr = data.filter((runner) => {
      return runner.task == task;
    });
  }
  if (status && !task) {
    filterArr = data.filter((runner) => {
      return runner.status == status;
    });
  }

  emptyCardDiv();
  // if (filterArr.length <= 0) renderError();
  displayTask(filterArr);
}

// Empty table
function emptyCardDiv() {
  const tableEle = document.querySelectorAll("#table_tab");
  tableEle.forEach((tab) => (tab.style.display = "none"));
}

// Search
const searchBar = document.getElementById("search_bar");
searchBar.addEventListener("input", async () => {
  data = await runnerActivity();
  const searchTerm = searchBar.value.toLowerCase();
  const searchResult = data.filter((dat) =>
    dat.name.toLowerCase().includes(searchTerm)
  );
  displayTask(searchResult);
});

const dashboardTable = document.getElementById("dashboard_table");
const taskTable = document.getElementById("task_table");

function dashboardTableDisplay(data) {
  const filteredData = data.filter((a) => a.status !== "unpaid");
  const sortedData = filteredData
    .sort((a, b) => new Date(b.created) - new Date(a.created))
    .slice(0, 3);
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
                <td class="remove_tab">${reformatDate(dat.date)}</td>
                <td><button class="status ${dat.status}" value='${value}'>${
      dat.status
    }</button>
              </tr>`;
    dashboardTable.insertAdjacentHTML("beforeend", markup);
  });
}

function displayTask(data) {
  taskTable.innerHTML = ``;
  const filteredData = data.filter((a) => a.status !== "unpaid");
  const sortedData = filteredData.sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );
  taskTableNumber.innerHTML = `(${sortedData.length})`;
  sortedData.map((dat) => {
    let value = JSON.stringify(dat);

    let markup = `<tr id="table_tab">
                <td id="table_element">
                <img src="${
                  dat.photo ||
                  "https://res.cloudinary.com/okorosamuel/image/upload/v1701356059/Hermes/user-avatar-svgrepo-com_wof4w4.svg"
                }" />
                   <p>${dat.name}</p>
                      </td>
                <td id="table_element" class="remove_tab">${reformatDate(
                  dat.date
                )}</td>
                <td id="table_element"> <button class="status ${
                  dat.status
                }" value='${value}'>${dat.status}</button></td>
    <td class="dropdown-cell">
                <i class='bx bx-dots-vertical-rounded' ></i>
                <div class="dropdown-content">
                ${
                  dat.status == "pending"
                    ? `<a id="confirm_task" href="#">confirm task</a>
                  <a id="reject_task" href="#">reject task</a>`
                    : dat.status == "processing"
                    ? `<a id="reject_task" href="#">cancel task</a>`
                    : dat.status == "completed" || dat.status == "cancelled"
                    ? ``
                    : `<a id="confirm_task" href="#">confirm task</a>`
                }
                </div>
              </td>
              </tr>`;
    taskTable.insertAdjacentHTML("beforeend", markup);
  });

  const tableTab = document.querySelectorAll("#table_tab");
  tableTab.forEach((tab) => {
    const statusBtn = tab.querySelectorAll(".status");
    let taskData;
    const statusData = { status: "" };
    const confirmOpt = tab.querySelectorAll("#confirm_task");
    confirmOpt.forEach((opt) => {
      opt.addEventListener("click", () => {
        statusBtn.forEach((btn) => {
          taskData = JSON.parse(btn.value);
          statusData.status = "processing";
          updateStatus(taskData.id, statusData);
          location.reload();
        });
      });
    });

    const rejectOpt = tab.querySelectorAll("#reject_task");
    rejectOpt.forEach((opt) => {
      opt.addEventListener("click", () => {
        statusBtn.forEach((btn) => {
          taskData = JSON.parse(btn.value);
          statusData.status = "cancelled";
          updateStatus(taskData.id, statusData);
          location.reload();
        });
      });
    });

    const tableEle = tab.querySelectorAll("#table_element");
    tableEle.forEach((ele) => {
      ele.addEventListener("click", () => {
        statusBtn.forEach((btn) => {
          taskData = JSON.parse(btn.value);
        });
        taskTableInfo(taskData.id, taskData.task);
      });
    });
  });
}

// Update status
async function updateStatus(id, statusData) {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/activity/status/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(statusData),
      }
    );
    const data = await res.json();
  } catch (err) {
    console.log(err);
  }
}

// Display Contents
const contents = document.querySelectorAll(".content_display");
const dashboardDisplay = document.getElementById("dashboard_display");
const tasksDisplay = document.getElementById("tasks_display");
const walletDisplay = document.getElementById("wallet_display");
const profileDisplay = document.getElementById("profile_display");
const dashboardLink = document.getElementById("dashboardLink");
const tasksLink = document.getElementById("tasksLink");
const walletLink = document.getElementById("walletLink");
const profileLink = document.getElementById("profileLink");
// const messagesDisplay = document.querySelector(".messages");
// const messagesLink = document.getElementById("messagesLink");
// const settingsDisplay = document.querySelector(".settings");
const settingsLink = document.getElementById("settings");
const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

function displayContent(ele) {
  responsiveness();
  hideAllContents();
  ele.classList.remove("hidden");
}

function hideAllContents() {
  contents.forEach((content) => {
    content.classList.add("hidden");
  });
}
function updateDisplay() {
  responsiveness();

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
    case "profile":
      displayContent(profileDisplay);
      active(profileLink);
      break;
    case "wallet":
      displayContent(walletDisplay);
      active(walletLink);
      break;
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
window.addEventListener("load", updateDisplay);

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
  let html = `
  <button class="close_modal" onclick="closeModal()">
            <i class="ri-close-fill"></i>
          </button>
  <div class="card_body">
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
            <strong>Description:</strong> ${data.description}
          </span>
          <span>
            <strong>Working hrs:</strong> ${data.duration} Hrs
          </span>
          <span>
            <strong>Location:</strong> ${data.location}
          </span>
          <span>
            <strong>Task Duration:</strong> ${data.duration} Hrs
          </span>
          <span>
            <p><strong>Date:</strong> ${reformatDate(data.date)}</p>
            <p><strong>Time:</strong> ${reformatTime(data.time)}</p>
          </span>
        </div>
        <div class="billing">
          <h2>Tip</h2>
          <p><strong>NGN ${data.price}</strong></p>
        </div>
      </div>
      <div>
        <h2>Setter info</h2>
        <div class="heading">
          <img src="${
            data.photo ||
            "https://res.cloudinary.com/okorosamuel/image/upload/v1701356059/Hermes/user-avatar-svgrepo-com_wof4w4.svg"
          }" />
          <div class="setter-info">
            <h1>${data.name}</h1>
            <div class="contact_icons">
              <span><i class="fa-solid fa-phone"></i>${data.phone}</span>
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
    const res = await fetch(
      `http://localhost:3000/api/v1/activity/setter/${id}`
    );
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
overlay.addEventListener("click", closeModal);

function closeModal() {
  modal.innerHTML = ``;
  modal.style.padding = "25px";
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

//Switch to password
const profileCard = document.querySelector(".profile_card");
const passwordCard = document.querySelector(".password_card");
const changePasswordBtn = document.querySelector(".change-password");
const backArrow = document.getElementById("back_arrow");

changePasswordBtn.addEventListener("click", () => {
  profileCard.style.display = "none";
  passwordCard.style.display = "flex";
  oldPassword.innerHTML = ``;
  newPassword.innerHTML = ``;
  cNewPassword.innerHTML = ``;
});

backArrow.addEventListener("click", () => {
  profileCard.style.display = "flex";
  passwordCard.style.display = "none";
});

// Change Password
const oldPassword = document.getElementById("old_password");
const newPassword = document.getElementById("new_password");
const cNewPassword = document.getElementById("confirm_new_password");
const changePasswordMsg = document.getElementById("change_password_msg");
const passwordSaveBtn = document.getElementById("password_saveBtn");

function oldpasswordValidation() {
  if (oldPassword.value === "") {
    changePasswordMsg.innerText = "Please fill all inputs";
  } else {
    changePasswordMsg.innerText = "";
    return true;
  }
}

function newpasswordValidation() {
  if (newPassword.value === "") {
    changePasswordMsg.innerText = "Please fill all inputs";
  } else {
    changePasswordMsg.innerText = "";
    return true;
  }
}

function confirmPasswordValidation() {
  if (cNewPassword.value !== newPassword.value) {
    changePasswordMsg.innerText = "Password don't match";
    document;
  } else {
    changePasswordMsg.innerText = "";
    return true;
  }
}

passwordSaveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (
    oldpasswordValidation() &&
    newpasswordValidation() &&
    confirmPasswordValidation()
  ) {
    changePassword();
  }
});

async function changePassword() {
  try {
    const newData = {
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
    };

    const res = await fetch(
      `http://localhost:3000/api/v1/users/password/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newData),
      }
    );
    const data = await res.json();

    if (data.message == "success") {
      changePasswordMsg.innerText = "Password change";
      changePasswordMsg.style.color = "#002b1d";
      oldPassword.value = "";
      newPassword.value = "";
      cNewPassword.value = "";
    }
    if (data.message == "invalid") {
      changePasswordMsg.innerText = "Invalid Password";
    }
  } catch (err) {
    console.log(err);
  }
}

// Logout
const logoutLink = document.getElementById("logout");
logoutLink.addEventListener("click", logout);
function logout() {
  localStorage.clear();
  window.location = "index.html";
}

// Profile
function edit() {
  inputs.forEach((input) => {
    input.disabled = false;
  });
  underline.forEach((line) => {
    line.style.width = "100%";
  });
  editBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
}
editBtn.addEventListener("click", edit);

async function save() {
  try {
    const newData = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      phone: phoneInput.value,
      task: taskInput.value.trim().toLowerCase(),
      bio: bioInput.value.trim(),
    };

    const res = await fetch(`http://localhost:3000/api/v1/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    const data = await res.json();

    if (data.message == "success") {
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("task", data.task);
      localStorage.setItem("bio", data.bio);
      localStorage.setItem("phone", data.phone);

      editBtn.classList.remove("hidden");
      saveBtn.classList.add("hidden");
      inputs.forEach((input) => {
        input.disabled = true;
      });
      underline.forEach((line) => {
        line.style.width = "0%";
      });
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
saveBtn.addEventListener("click", save);

// Wallet Operations
const depositBtn = document.getElementById("deposit");
const withdrawalBtn = document.getElementById("withdrawal");

function depositFormMarkup() {
  const html = `<div class="payment_wrapper">
      <div class="payment">
      <button class="payment_close_modal" onclick="closeModal()">
            <i class="ri-close-fill"></i>
          </button>
      <p class="hidden">Successful</p>
        <form class="form" id="depositForm">
          <div class="card space icon-relative">
            <label class="label">Amount:</label>
            <input type="text" class="input"
            id="depositAmt"
            oninput="this.value = this.value.replace(/[^0-9+/-]/g, '')" required />
            <i class="fa-solid fa-money-bill"></i>
          </div>
          <div class="card space icon-relative">
            <label class="label">Card number:</label>
            <input
              type="text"
              class="input"
              data-mask="0000 0000 0000 0000"
              placeholder="Card Number"
              oninput="this.value = this.value.replace(/[^0-9+/-]/g, '')"
              required
            />
            <i class="far fa-credit-card"></i>
          </div>
          <div class="card-grp space">
            <div class="card-item icon-relative">
              <label class="label">Expiry date:</label>
              <input
                type="text"
                name="expiry-data"
                class="input"
                data-mask="00 / 00"
                placeholder="00 / 00"
                oninput="this.value = this.value.replace(/[^0-9+/-]/g, '')"
                required
              />
              <i class="far fa-calendar-alt"></i>
            </div>
            <div class="card-item icon-relative">
              <label class="label">CVC:</label>
              <input
                type="text"
                class="input"
                data-mask="000"
                placeholder="000"
                oninput="this.value = this.value.replace(/[^0-9+/-]/g, '')"
                required
              />
              <i class="fas fa-lock"></i>
            </div>
          </div>

          <button type="submit" class="btn" id="depositEnter">Enter</button>

          <div id="paystack-footer" class="paystack-footer animated fadeIn">
            <a target="_blank" href="https://paystack.com/what-is-paystack">
              <img
                alt="Paystack secured badge"
                src="https://koboline.com.ng/wp-content/uploads/2020/05/paystack-badge-cards-ngn.png"
              />
            </a>
          </div>
        </form>
      </div>
    </div>`;

  modal.insertAdjacentHTML("beforeend", html);
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
  modal.style.padding = "0px";
}

depositBtn.addEventListener("click", () => {
  depositFormMarkup();

  //depositing
  const depositAmt = document.getElementById("depositAmt");
  const depositForm = document.getElementById("depositForm");
  const successMsg = document.querySelectorAll(".payment p");

  depositForm.addEventListener("submit", (e) => {
    e.preventDefault();
    successMsg.forEach((msg) => {
      return msg.classList.remove("hidden");
    });

    const data = {
      id,
      amount: depositAmt.value,
      type: "deposit",
    };
    addTransaction(data);

    const updateWalletData = {
      amount: parseFloat(walletBalance) + Number(depositAmt.value),
      id,
    };
    updateWallet(updateWalletData);
  });
});

withdrawalBtn.addEventListener("click", () => {
  html = `<div class="payment_wrapper">
      <div class="payment">
      <button class="payment_close_modal" onclick="closeModal()">
            <i class="ri-close-fill"></i>
          </button>
      <p class="hidden">Successful</p>
        <form class="form" id="withdrawalForm">
          <div class="card space icon-relative">
            <label class="label">Amount:</label>
            <input type="text" class="input" 
            id="withdrawalAmt"
            oninput="this.value = this.value.replace(/[^0-9+/-]/g, '')" required/>
            <i class="fa-solid fa-money-bill"></i>
          </div>
          <div class="card space icon-relative">
            <label class="label">Account Number:</label>
            <input type="text" class="input" oninput="this.value = this.value.replace(/[^0-9+/-]/g, '')" required/>
            <i class="fas fa-user"></i>
          </div>
          
          <div class="card space icon-relative">
            <label class="label">Bank:</label>
            <input type="text" class="input" required/>
            <i class="fas fa-bank"></i>
          </div>
          <button type="submit" class="btn" id="withdrawalEnter">Enter</button>

          <div id="paystack-footer" class="paystack-footer animated fadeIn">
            <a target="_blank" href="https://paystack.com/what-is-paystack">
              <img
                alt="Paystack secured badge"
                src="https://koboline.com.ng/wp-content/uploads/2020/05/paystack-badge-cards-ngn.png"
              />
            </a>
          </div>
        </form>
      </div>
    </div>`;

  modal.insertAdjacentHTML("beforeend", html);
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
  modal.style.padding = "0px";

  //withdrawal
  const withdrawalAmt = document.getElementById("withdrawalAmt");
  const withdrawalForm = document.getElementById("withdrawalForm");
  const successMsg = document.querySelectorAll(".payment p");

  withdrawalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    successMsg.forEach((msg) => {
      return msg.classList.remove("hidden");
    });

    const data = {
      id,
      amount: withdrawalAmt.value,
      type: "withdrawal",
    };
    addTransaction(data);

    const updateWalletData = {
      amount: parseFloat(walletBalance) - Number(withdrawalAmt.value),
      id,
    };
    updateWallet(updateWalletData);
  });
});

async function addTransaction(data) {
  try {
    const res = await fetch("http://localhost:3000/api/v1/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const apiData = await res.json();
    if (apiData.message) {
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

async function updateWallet(data) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/users/wallet`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const apiData = await res.json();
    if (apiData.message) {
      localStorage.setItem("wallet", apiData.data.wallet);
    }
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

// Transaction Table
const transactionTable = document.getElementById("transaction_table");

function transactionDisplay(data) {
  const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
  sortedData.map((dat) => {
    let value = JSON.stringify(dat);

    let markup = `<tr>
                      <td><span class="status ${dat.type}">${
      dat.type
    }</span></td>
                      <td class="remove_tab">${reformatDate(dat.date)}</td>
                      <td class="table_amt">
                        <span>NGN</span>
                        <p>${dat.amount}</p>
                      </td>
                    </tr>`;
    transactionTable.insertAdjacentHTML("beforeend", markup);
  });
}

async function transactionData() {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/transaction/${id}`);
    const data = await res.json();

    transactionDisplay(data);
  } catch (err) {
    console.log(err);
  }
}

transactionData();
