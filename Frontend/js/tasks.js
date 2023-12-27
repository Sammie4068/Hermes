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
    let markup = `<tr id="table_element">
                <td>
                  <img
                    src="${dat.photo}"
                  />
                  <p>${dat.name}</p>
                </td>
                <td>${dat.task}</td>
                <td>${formattedDate}</td>
                <td><span class="status ${dat.status}">${dat.status}</span></td>
              </tr>`;

    table.insertAdjacentHTML("beforeend", markup);
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
  const filteredArr = data.filter(dat => dat.task == task)
  displayTask(filteredArr);
}