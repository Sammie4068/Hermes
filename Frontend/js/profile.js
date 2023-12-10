// location.reload();
const id = localStorage.getItem("id");
async function userData() {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/users/${id}`);
    const data = await res.json();
    localStorage.setItem("photo", data.photo);
    localStorage.setItem("name", data.name);
    localStorage.setItem("email", data.email);
  } catch (err) {
    console.log(err);
  }
}

userData();

// Switch active
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
const backArrow = document.getElementById("back_arrow");

changePasswordBtn.addEventListener("click", () => {
  profileCard.style.display = "none";
  passwordCard.style.display = "block";
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

// passwordSaveBtn.addEventListener("click", (e) => {
//   //   e.preventDefault();
//   if (
//     oldpasswordValidation() &&
//     newpasswordValidation() &&
//     confirmPasswordValidation()
//   ) {
//     changePassword();
//   }
// });

async function changePassword() {
  try {
    if (
      oldpasswordValidation() &&
      newpasswordValidation() &&
      confirmPasswordValidation()
    ) {
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
  window.location = "main.html";
}

// Update user
const inputs = document.querySelectorAll(".input");
const username = localStorage.getItem("name");
const email = localStorage.getItem("email");
const photo = localStorage.getItem("photo");
const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const profileImage = document.getElementById("profile_image");
const editDp = document.getElementById("edit_dp");
const editBtn = document.getElementById("edit__btn");
const saveBtn = document.getElementById("saveBtn");

nameInput.value = username
  .split(" ")
  .map((a) => a.replace(a[0], a[0].toUpperCase()))
  .join(" ");
emailInput.value = email;

function edit() {
  inputs.forEach((input) => {
    input.removeAttribute("readonly");
    input.style.border = "2px solid #002b1d";
  });
  profileImage.style.border = "2px solid #002b1d";
  editDp.disabled = false;
  editBtn.classList.add("hidden");
  saveBtn.classList.remove("hidden");
}
// editBtn.addEventListener("click", edit);

async function save() {
  try {
    const newData = {
      name: nameInput.value.trim().toLowerCase(),
      email: emailInput.value.trim(),
      task: null,
      bio: null,
      tip: null,
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

      editBtn.classList.remove("hidden");
      saveBtn.classList.add("hidden");
      inputs.forEach((input) => {
        input.setAttribute("readonly", "readonly");
        input.style.border = "2px solid #68ddcb";
      });
      profileImage.style.border = "2px solid #68ddcb";
      editDp.disabled = true;
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
// saveBtn.addEventListener("click", save);

// SideBar active
function active(ele) {
  allSideMenu.forEach((i) => {
    i.parentElement.classList.remove("active");
  });
  ele.classList.add("active");
}

// Display Contents
const contents = document.querySelectorAll("#content");
const profileDisplay = document.querySelector(".my_profile");
const profileLink = document.getElementById("profileLink");
const messagesDisplay = document.querySelector(".messages");
const messagesLink = document.getElementById("messagesLink");
const settingsDisplay = document.querySelector(".settings");
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
    case "profile":
      displayContent(profileDisplay);
      profileCard.style.display = "flex";
      passwordCard.style.display = "none";
      active(profileLink);
      break;
    case "messages":
      displayContent(messagesDisplay);
      active(messagesLink);
      break;
    case "settings":
      displayContent(settingsDisplay);
      break;
    case "password":
      profileCard.style.display = "none";
      passwordCard.style.display = "block";
      break;
    case "edit":
      edit();
      break;
    case "save":
      save();
      displayContent(profileDisplay);
      break;
    case "passwordSave":
      changePassword();
      break;

    default:
      break;
  }
}
window.addEventListener("hashchange", updateDisplay);
