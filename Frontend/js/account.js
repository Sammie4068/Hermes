// Display Contents
const contents = document.querySelectorAll("#content");
const dashboardDisplay = document.querySelector(".dashboard_display");
const profileDisplay = document.querySelector(".my_profile");
const dashboardLink = document.getElementById("dashboardLink");
const profileLink = document.getElementById("profileLink");
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
    case "profile":
      displayContent(profileDisplay);
      active(profileLink);
      break;
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

//Switch to password
const profileCard = document.querySelector(".profile_card");
const passwordCard = document.querySelector(".password_card");
const changePasswordBtn = document.querySelector(".change-password");

changePasswordBtn.addEventListener("click", () => {
  profileCard.style.display = "none";
  passwordCard.style.display = "block";
});

// Logout
const logoutLink = document.getElementById("logout");
logoutLink.addEventListener("click", logout);
function logout() {
  localStorage.clear();
  window.location = "main.html";
}

// Get User data
const id = localStorage.getItem("id");
async function userData() {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/users/${id}`);
    const data = await res.json();
    profileImage.attributes.src.value = data.photo
    console.log(profileImage.attributes.src.value);
    localStorage.setItem("photo", data.photo);
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);
    localStorage.setItem("task", data.gig);
    localStorage.setItem("bio", data.bio);
  } catch (err) {
    console.log(err);
  }
}
userData();

const username = localStorage.getItem("name");
const email = localStorage.getItem("email");
const photo = localStorage.getItem("photo");
const task = localStorage.getItem("task");
const bio = localStorage.getItem("bio");
const editBtn = document.getElementById("edit__btn");
const saveBtn = document.getElementById("saveBtn");
const inputs = document.querySelectorAll("input");
const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const taskInput = document.querySelector(".task");
const bioInput = document.querySelector("#bio");
const profileInfo = document.querySelector(".profile-info");
const btnWrapper = document.querySelector(".btn-wrapper")
const profileImage = document.getElementById("profile_image");

nameInput.value = username
  .split(" ")
  .map((a) => a.replace(a[0], a[0].toUpperCase()))
  .join(" ");
emailInput.value = email;
taskInput.value = task.replace(task[0], task[0].toUpperCase());
bioInput.value = bio;

function edit() {
  inputs.forEach((input) => {
    input.removeAttribute("readonly");
    input.style.border = "2px solid #002b1d";
  });
  bioInput.removeAttribute("readonly");
  bioInput.style.border = "2px solid #002b1d";
  editBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
}
editBtn.addEventListener("click", edit);

"dsds".toLowerCase();

async function save() {
  try {
    const newData = {
      name: nameInput.value.trim().toLowerCase(),
      email: emailInput.value.trim(),
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
      localStorage.setItem("task", data.gig);
      localStorage.setItem("bio", data.bio);

      editBtn.classList.remove("hidden");
      saveBtn.classList.add("hidden");
      inputs.forEach((input) => {
        input.setAttribute("readonly", "readonly");
        input.style.border = "2px solid #68ddcb";
      });
      bioInput.setAttribute("readonly", "readonly");
      bioInput.style.border = "2px solid #68ddcb";
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
saveBtn.addEventListener("click", save);
