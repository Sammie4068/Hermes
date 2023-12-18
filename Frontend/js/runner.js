AOS.init();
// Url instance
const urlParams = new URLSearchParams(window.location.search);

// Filter Active Switch
function active(parentEle, ele) {
  parentEle.forEach((i) => i.classList.remove("active_option"));
  ele.classList.add("active_option");
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

// Render Error
const errorContainer = document.querySelector(".render_error");

function renderError() {
  errorContainer.style.display = "flex";
}

// Display runners
const wrapper = document.querySelector(".runners_wrapper");
const gig = localStorage.getItem("gig");
const gigLocation = localStorage.getItem("location");

function displayRunners(data) {
  data.map((dat) => {
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
                  <button>Request</button>

                </span>
              </div>
              <article>
                <div class="info_top">
                  <div class="name-profession">
                    <span class="name">${dat.name
                      .split(" ")
                      .map((a) => a.replace(a[0], a[0].toUpperCase()))
                      .join(" ")}</span>
                    <span class="profession">${dat.completed} ${
      dat.gig
    } completed</span>
                  </div>
                </div>
                <div class="about">
                  <h3>About me</h3>
                  <p>${dat.bio}</p>
                </div>
              </article>
            </div>
          </div>
        </div>`;
    wrapper.insertAdjacentHTML("beforeend", markup);
  });
}

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
  emptyCardDiv();
  getRunners();
}
// clearFilters();
document.querySelector(".clear_btn").addEventListener("click", () => {
  clearFilters();
  location.reload()
});

async function displayData() {
  let gender = urlParams.get("gender");
  let type = urlParams.get("runnerType");
  data = await getData();
  let filterArr;
  if(gender && type){
    filterArr = data.filter((runner) => {
      return runner.gender == gender && runner.level == type;
    });
  }
  if(gender && !type) {
    filterArr = data.filter((runner) => {
      return runner.gender == gender
    });
  }
  if(type && !gender) {
    filterArr = data.filter((runner) => {
      return runner.level == type
    });
  }

  emptyCardDiv();
  if (filterArr.length <= 0) renderError();
  displayRunners(filterArr);
}
window.addEventListener("popstate", displayData);
