AOS.init();
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

//Services
const services = document.getElementById("services");
services.addEventListener("click", () => {
  window.location = "main.html#services";
});

//userprofile
const role = localStorage.getItem("role");
const username = localStorage.getItem("name");
// const account = document.getElementById("account");
const userProfile = document.querySelector(".user");
const user = document.querySelector(".user p");
const userImg = document.querySelector(".user img")
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

// Render Error
const errorContainer = document.querySelector(".render_error");

function renderError() {
  errorContainer.style.display = "flex";
}

// Display runners
const wrapper = document.querySelector(".runners_wrapper");
const gig = localStorage.getItem("gig");
const gigLocation = localStorage.getItem("state");

function displayRunners(data) {
  data.map((dat) => {
    let value = JSON.stringify(dat);
    let markup = `<div class="card_container" data-aos="fade-left"
        data-aos-duration="1000">
          <div class="slide-card">
            <div class="card-content">
              <div class="image">
                <img
                  src="${dat.photo}"
                  alt="sample"
                />
                <h4>Trust Level: ${dat.trust}%</h4>
                <span>
                  <button id="reqBtn">Request</button>
                </span>
              </div>
              <article>
                <div class="info_top">
                  <div class="name-profession">
                    <span class="name">${dat.name}</span>
                    <span class="profession">${dat.completed} ${
      dat.gig
    } completed</span>
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
  // Request Button
  const seeMoreBtn = document.querySelectorAll(".see_more");
  seeMoreBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const runnerData = JSON.parse(e.target.value);
       statusDisplay(runnerData);
    });
  });
}

const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
function statusDisplay(data) {
  let html = `
      <div class="heading">
      <div class="status">
        <img src="${data.photo}" alt="sample" />
        <p><span>Request</span> </p>
      </div>
        <div class="runner-info">
          <h1>${data.name
            .split(" ")
            .map((a) => a.replace(a[0], a[0].toUpperCase()))
            .join(" ")}</h1>
          <p>${data.completed} ${data.gig} completed</p>
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
}

overlay.addEventListener("click", () => {
  modal.innerHTML = ``;
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
})

function emptyCardDiv() {
  const cardcontainer = document.querySelectorAll(".card_container");
  cardcontainer.forEach((card) => (card.style.display = "none"));
  errorContainer.style.display = "none";
}

async function getData() {
  try {
    const res = await fetch(
      `http://localhost:3000/api/v1/getrunners/${gig}/${gigLocation}`
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
