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

// Render Error
const errorContainer = document.querySelector(".render_error");

function renderError() {
  errorContainer.style.display = "flex";
}

// Render Spinner
function renderSpinner(parentEle) {
  overlay.style.display = "flex";
  modal.classList.add("hidden");
  parentEle.innerHTML = ``;
  const html = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  <p class="wait">Please wait..</p>
  `;
  parentEle.insertAdjacentHTML("beforeend", html);
}

// Display runners
const wrapper = document.querySelector(".runners_wrapper");
const gig = localStorage.getItem("gig");
const gigLocation = localStorage.getItem("state");

function displayRunners(data) {
  data.map((dat) => {
    let value = JSON.stringify(dat.id);
    let markup = `<div class="card_container">
          <div class="slide-card">
            <div class="card-content">
              <div class="image">
                <img
                  src="${dat.photo}"
                  alt="sample"
                />
                <span>
                  <button id="reqBtn" value='${value}'>Request</button>
                </span>
              </div>
              <article>
                <div class="info_top">
                  <div class="name-profession">
                    <span class="name">${dat.name}</span>
                    <span class="profession">${dat.completed} ${dat.gig} completed</span>
                  </div>
                </div>
                <div class="about">
                  <h3>About me</h3>
                  <p>${dat.bio}</p>
                </div>
                <button value='${value}' class="see_more">See More...</button>
              </article>
            </div>
          </div>
        </div>`;

    wrapper.insertAdjacentHTML("beforeend", markup);
  });
  // see more Button
  const seeMoreBtn = document.querySelectorAll(".see_more");
  seeMoreBtn.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      e.preventDefault();
      const runnerID = JSON.parse(e.target.value);
      const data = await runnerInfo(runnerID);
      statusDisplay(data);
    });
  });

  // Request button
  const reqBtn = document.querySelectorAll("#reqBtn");
  reqBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const runnerID = JSON.parse(e.target.value);
      localStorage.setItem("runnerID", runnerID);
      const id = localStorage.getItem("taskID");
      const gig = localStorage.getItem("gig");

      showTaskWithRunner(id, gig, runnerID);
    });
  });
}

// Get users info
async function runnerInfo(id) {
  try {
    const res = await fetch(
      `https://hermes-yto9.onrender.com/api/v1/users/${id}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

// Request function
async function requestRunner(requestData, id) {
  try {
    const res = await fetch(
      `https://hermes-yto9.onrender.com/api/v1/activity/runner/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      }
    );
    const data = await res.json();

    if (data.message == "success") {
      window.location = "profile.html#tasks";
    }
  } catch (err) {
    console.log(err);
  }
}

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
function statusDisplay(data) {
  modal.innerHTML = ``;
  let value = JSON.stringify(data.id);
  let html = `
      <button class="close_modal" onclick="closeModal()">
            <i class="ri-close-fill"></i>
          </button>
      <div class="heading">
      <div class="image_side">
        <img src="${data.photo}" alt="sample" />
        <button class="btn" id="reqBtn2" value='${value}'> Request </button>
      </div>
        <div class="runner-info">
          <h1>${data.name}</h1>
          <p>${data.completed} ${data.gig} completed</p>
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
          <img src="https://res.cloudinary.com/okorosamuel/image/upload/v1701356059/Hermes/user-avatar-svgrepo-com_wof4w4.svg" alt="sample" />
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
      </div>`;

  modal.insertAdjacentHTML("beforeend", html);
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");

  // Request button
  const reqBtnMore = document.querySelectorAll("#reqBtn2");
  reqBtnMore.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const runnerID = JSON.parse(e.target.value);
      localStorage.setItem("runnerID", runnerID);
      const id = localStorage.getItem("taskID");
      const gig = localStorage.getItem("gig");

      showTaskWithRunner(id, gig, runnerID);
    });
  });
}

// Task popup

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

async function showTaskWithRunner(id, gig, runnerID) {
  try {
    modal.innerHTML = ``;

    const result = await fetch(
      `https://hermes-yto9.onrender.com/api/v1/activity/setter/${id}`
    );
    const logData = await result.json();
    const data = logData[0];

    const res = await fetch(
      `https://hermes-yto9.onrender.com/api/v1/tasks/${gig}`
    );
    const bodydata = await res.json();
    const apiData = bodydata[0];

    const response = await fetch(
      `https://hermes-yto9.onrender.com/api/v1/users/${runnerID}`
    );
    const runnerData = await response.json();

    let html = `<div class="card_body">
          <div class="task_side">
            <span>
              <h1>${data.task}</h1>
              <img src="${apiData.icons}" alt="${apiData.title}"/>
            </span>
            <span> <strong>Location:</strong> ${data.location}</span>
            <span>
              <p> <strong>Date:</strong> ${reformatDate(data.date)}</p>
              <p> <strong>Time:</strong> ${reformatTime(data.time)}</p>
            </span>
          </div>
          <div class="billing">
            <h2>Pricing</h2>
            <p>Tip: NGN ${data.price}</p>
            <p>Service Charge: NGN 500.00</p>
            <p> <strong>Total:</strong> <strong>NGN ${data.total}</strong> </p>
          </div>
        </div>
        <h2>Runner</h2>
        <div class="heading">
          <img src="${runnerData.photo}" alt="sample" />
          <div class="runner-info">
            <h1>${runnerData.name}</h1>
            <p>${runnerData.school}</p>
          </div>
        </div>
        <div class="button__wrapper">
          <button class="cancel_btn" onclick="closeModal()">Cancel</button>
          <button class="proceed_btn">Proceed</button>
        </div>`;

    modal.insertAdjacentHTML("beforeend", html);
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");

    document.querySelector(".proceed_btn").addEventListener("click", () => {
      let status;

      if (
        parseFloat(localStorage.getItem("wallet")) >= parseFloat(data.total)
      ) {
        status = "pending";
        const newWallet =
          parseFloat(localStorage.getItem("wallet")) - parseFloat(data.total);
        const updateWalletData = {
          amount: newWallet,
          id: localStorage.getItem("id"),
        };
        updateWallet(updateWalletData);

        const transactionTableData = {
          id: localStorage.getItem("id"),
          amount: data.total,
          type: "paid",
        };
        addTransaction(transactionTableData);
      } else {
        status = "unpaid";
      }
      renderSpinner(overlay);
      setTimeout(() => {
        const requestData = {
          runnerID: localStorage.getItem("runnerID"),
          status,
        };
        const id = localStorage.getItem("taskID");
        requestRunner(requestData, id);
      }, 1000);
    });
  } catch (err) {
    console.log(err);
  }
}

//Add transaction
async function addTransaction(data) {
  try {
    const res = await fetch(
      "https://hermes-yto9.onrender.com/api/v1/transaction",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const apiData = await res.json();
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

// Update wallet
async function updateWallet(data) {
  try {
    const res = await fetch(
      `https://hermes-yto9.onrender.com/api/v1/users/wallet`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const apiData = await res.json();
    if (apiData.message) {
      localStorage.setItem("wallet", apiData.data.wallet);
    }
  } catch (err) {
    console.log(`Error: ${err}`);
  }
}

// close modal
function closeModal() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
  modal.innerHTML = ``;
}

overlay.addEventListener("click", closeModal);

function emptyCardDiv() {
  const cardcontainer = document.querySelectorAll(".card_container");
  cardcontainer.forEach((card) => (card.style.display = "none"));
  errorContainer.style.display = "none";
}

async function getData() {
  try {
    const res = await fetch(
      `https://hermes-yto9.onrender.com/api/v1/getrunners/${gig}/${gigLocation}`
    );
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function getRunners() {
  const data = await getData();
  if (data.length <= 0) renderError();
  displayRunners(data);
}
window.addEventListener("load", getRunners);

// Sorting runners
async function sortByTaskCompleted() {
  const data = await getData();
  const sortedArr = data.sort((a, b) => b.completed - a.completed);
  if (sortedArr.length <= 0) renderError();
  displayRunners(sortedArr);
}

const sortInput = document.getElementById("sort_runners");

sortInput.addEventListener("change", function () {
  const selectedValue = sortInput.value;
  sortItems(selectedValue);
});

function sortItems(selectedValue) {
  if (selectedValue === "Recommended") {
    emptyCardDiv();
    getRunners(gig, gigLocation);
  } else if (selectedValue === "Tasks completed") {
    emptyCardDiv();
    sortByTaskCompleted();
  } else if (selectedValue === "Trust Level") {
  }
}

const genderOptions = document.querySelectorAll(".gender_options span");
genderOptions.forEach((option) => {
  option.addEventListener("click", () => {
    active(genderOptions, option);
    const gender = option.textContent.toLowerCase();
    addURLParam("gender", gender);
  });
});

const runnerType = document.querySelectorAll(".runner_types span");
runnerType.forEach((option) => {
  option.addEventListener("click", () => {
    active(runnerType, option);
    const type = option.textContent.toLowerCase().split(" ")[0];
    addURLParam("runnerType", type);
  });
});

// Update url params
function addURLParam(key, value) {
  urlParams.set(key, value);
  const newUrl = `${window.location.origin}${
    window.location.pathname
  }?${urlParams.toString()}`;
  window.history.replaceState({}, "", newUrl);
  window.dispatchEvent(new Event("popstate"));
}

function clearFilters() {
  const newUrl = `${window.location.origin}${window.location.pathname}`;
  window.history.replaceState({}, "", newUrl);
}
// clearFilters();
document.querySelector(".filter_clear").addEventListener("click", () => {
  clearFilters();
  emptyCardDiv();
  getRunners();
  removeAllactive(genderOptions);
  removeAllactive(runnerType);
});

async function displayData() {
  let gender = urlParams.get("gender");
  let type = urlParams.get("runnerType");
  data = await getData();
  let filterArr;
  if (gender && type) {
    filterArr = data.filter((runner) => {
      return runner.gender == gender && runner.level == type;
    });
  }
  if (gender && !type) {
    filterArr = data.filter((runner) => {
      return runner.gender == gender;
    });
  }
  if (type && !gender) {
    filterArr = data.filter((runner) => {
      return runner.level == type;
    });
  }

  emptyCardDiv();
  if (filterArr.length <= 0) renderError();
  displayRunners(filterArr);
}
window.addEventListener("popstate", displayData);

// Bring forth filter
const filterOpenBtn = document.getElementById("filter_open_btn");
const filterBox = document.querySelector(".filter_box");
filterOpenBtn.addEventListener("click", () => {
  if(filterBox.style.display == "none" || !filterBox.style.display){
    filterBox.style.display = "block"
  } else {
    filterBox.style.display = "none";
  }
});
