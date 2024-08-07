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

const asSetter = document.getElementById("as-setter");
const asRunner = document.getElementById("as-runner");
const signinLink = document.getElementById("signinLink");

function setRole(role) {
  window.location = "auth.html";
  localStorage.setItem("role", role);
}

asSetter.addEventListener("click", () => {
  setRole("setter");
});
asRunner.addEventListener("click", () => {
  setRole("runner");
});
signinLink.addEventListener("click", () => {
  setRole("runner");
});

// Get all taskers
async function allTasks(parentEle) {
  try {
    const res = await fetch(`https://hermes-yto9.onrender.com/api/v1/tasks`);
    const data = await res.json();
    data.forEach((dt) => {
      const html = `<option>${dt.title}</option>`;
      parentEle.insertAdjacentHTML("afterbegin", html);
    });
  } catch (err) {
    console.log(err);
  }
}
const taskInput = document.querySelector(".task-input");
allTasks(taskInput);

// Gig tip
async function getTip(gig) {
  try {
    const res = await fetch(`https://hermes-yto9.onrender.com/api/v1/tasks`);
    const data = await res.json();
    const gigArr = data.filter((dat) => dat.title == gig);
    const gigTip = +gigArr[0].tip.split(" ")[1];
    localStorage.setItem("tip", gigTip);
  } catch (err) {
    console.log(err);
  }
}

const infoForm = document.querySelector(".personal_info");
const profileForm = document.querySelector(".profile_card");
const schoolForm = document.querySelector(".school_info");
const fullName = document.getElementById("fullname");
const gender = document.getElementById("gender");
const photo = document.getElementById("profilePic");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("cpassword");
const showCheckbox = document.getElementById("showpassword");
const bio = document.getElementById("description");
const schoolName = document.getElementById("uni");
const schoolState = document.getElementById("states");
const field = document.getElementById("study");
const yearEnrolled = document.getElementById("date-enrolled");
const yearGrad = document.getElementById("date-grad");
const idCard = document.getElementById("idCard");
const oathCheckbox = document.getElementById("oath");
const nextBtn1 = document.getElementById("nextBtn1");
const nextBtn2 = document.getElementById("nextBtn2");
const backBtn1 = document.getElementById("backBtn1");
const backBtn2 = document.getElementById("backBtn2");
const submitBtn = document.getElementById("submitBtn");
const errorMsg = document.getElementById("msg-i");
const errorMsg2 = document.getElementById("msg-ii");
const errorMsg3 = document.getElementById("msg-iii");
const showLabel = document.getElementById("show_label");
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Show Password
showCheckbox.addEventListener("click", () => {
  if (showCheckbox.checked) {
    password.type = "text";
    confirmPassword.type = "text";
    showLabel.innerText = "Hide Password";
  } else {
    password.type = "password";
    confirmPassword.type = "password";
    showLabel.innerText = "Show Password";
  }
});

//Form validation
function infoFormIsEmpty() {
  if (
    fullName.value == "" ||
    email.value == "" ||
    phone.value == "" ||
    password.value == "" ||
    confirmPassword.value == "" ||
    photo.files.length < 1
  ) {
    errorMsg.innerText = "Please fill all inputs";
  } else {
    errorMsg.innerText = "";
    return true;
  }
}

function emailValidation() {
  if (!email.value.match(emailPattern)) {
    errorMsg.innerText = "Please enter a valid email";
  } else {
    errorMsg.innerText = "";
    return true;
  }
}

async function checkEmail() {
  try {
    const res = await fetch(
      `https://hermes-yto9.onrender.com/api/v1/runners/email/${email.value}`
    );
    const data = await res.json();
    if (data.message === "exists") {
      errorMsg.innerText = "Email already exists";
      return false;
    } else {
      return true;
    }
  } catch (err) {
    console.log(err);
  }
}

function passwordValidation() {
  if (!password.value.match(passwordPattern)) {
    errorMsg.innerHTML =
      "Please enter atleast 8 charatcer with number, symbol, small and capital letter.";
  } else {
    errorMsg.innerText = "";
    return true;
  }
}

function confirmPasswordValidation() {
  if (confirmPassword.value !== password.value) {
    errorMsg.innerText = "Password don't match";
  } else {
    errorMsg.innerText = "";
    return true;
  }
}

function profileFormIsEmpty() {
  if (taskInput.value == "" || bio.value == "") {
    errorMsg2.innerText = "Please fill all inputs";
  } else {
    errorMsg2.innerText = "";
    getTip(taskInput.value);
    return true;
  }
}

function yearIsValid() {
  if (yearEnrolled.value.length > 4 || yearGrad.value.length > 4) {
    errorMsg3.innerText = "Please enter a valid year";
  } else {
    errorMsg.innerText = "";
    return true;
  }
}

function schoolFormIsEmpty() {
  if (
    schoolName.value == "" ||
    schoolState.value == "" ||
    field.value == "" ||
    yearEnrolled.value == "" ||
    yearGrad.value == "" ||
    idCard.files.length < 1
  ) {
    errorMsg3.innerText = "Please fill all inputs";
  } else {
    errorMsg3.innerText = "";
    return true;
  }
}

function isChecked() {
  if (!oathCheckbox.checked) {
    errorMsg3.innerText = "Please check the oath box";
  } else {
    errorMsg3.innerText = "";
    return true;
  }
}

backBtn1.addEventListener("click", (e) => {
  e.preventDefault();
  infoForm.classList.remove("hidden");
  profileForm.classList.add("hidden");
  schoolForm.classList.add("hidden");
});

backBtn2.addEventListener("click", (e) => {
  e.preventDefault();
  profileForm.classList.remove("hidden");
  schoolForm.classList.add("hidden");
  infoForm.classList.add("hidden");
});

nextBtn1.addEventListener("click", async (e) => {
  e.preventDefault();
  if (
    infoFormIsEmpty() &&
    emailValidation() &&
    passwordValidation() &&
    confirmPasswordValidation() &&
    (await checkEmail())
  ) {
    infoForm.classList.add("hidden");
    profileForm.classList.remove("hidden");
  }
});

nextBtn2.addEventListener("click", async (e) => {
  e.preventDefault();
  if (profileFormIsEmpty()) {
    profileForm.classList.add("hidden");
    schoolForm.classList.remove("hidden");
  }
});

const container = document.querySelector(".container");
const overlay = document.querySelector(".overlay");
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (schoolFormIsEmpty() && yearIsValid() && isChecked()) {
    const formData = new FormData();

    formData.append("name", fullName.value);
    formData.append("email", email.value);
    formData.append("phone", phone.value);
    formData.append("gender", gender.value);
    formData.append("image", photo.files[0]);
    formData.append("password", password.value);
    formData.append("gig", taskInput.value.toLowerCase());
    formData.append("bio", bio.value.toLowerCase());
    formData.append("school", schoolName.value.toLowerCase());
    formData.append("schoolstate", schoolState.value.toLowerCase());
    formData.append("field", field.value.toLowerCase());
    formData.append("yearenrolled", yearEnrolled.value);
    formData.append("yeargrad", yearGrad.value);
    formData.append("image", idCard.files[0]);

    postData(formData);
  }
});

async function postData(data) {
  try {
    renderSpinner(overlay);
    const res = await fetch(`https://hermes-yto9.onrender.com/api/v1/runners`, {
      method: "POST",
      body: data,
    });
    const bodydata = await res.json();
    if (bodydata.message == "success") {
      localStorage.setItem("id", bodydata.id);
      localStorage.setItem("token", bodydata.token);
      localStorage.setItem("role", bodydata.role);
      localStorage.setItem("task", bodydata.gig);
      localStorage.setItem("name", bodydata.name);
      localStorage.setItem("photo", bodydata.photo);
      localStorage.setItem("email", bodydata.email);
      localStorage.setItem("task", bodydata.gig);
      localStorage.setItem("bio", bodydata.bio);
      localStorage.setItem("wallet", bodydata.wallet);
      localStorage.setItem("phone", bodydata.phone);
      window.location = "account.html#dashboard";
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}

function renderSpinner(parentEle) {
  overlay.style.display = "flex";
  parentEle.innerHTML = ``;
  const html = `<div class="lds-ring"><div></div><div></div><div></div><div></div></div>
  <p class="wait">Please wait..</p>
  `;
  parentEle.insertAdjacentHTML("beforeend", html);
}
