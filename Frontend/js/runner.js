AOS.init();

const infoForm = document.querySelector(".personal_info");
const schoolForm = document.querySelector(".school_info");
const fullName = document.getElementById("fullname");
const gender = document.getElementById("gender");
const photo = document.getElementById("profilePic");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("cpassword");
const showCheckbox = document.getElementById("showpassword");
const schoolName = document.getElementById("uni");
const schoolState = document.getElementById("states");
const field = document.getElementById("study");
const yearEnrolled = document.getElementById("date-enrolled");
const yearGrad = document.getElementById("date-grad");
const idCard = document.getElementById("idCard");
const oathCheckbox = document.getElementById("oath");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const submitBtn = document.getElementById("submitBtn");
const errorMsg = document.getElementById("msg-i");
const errorMsg2 = document.getElementById("msg-ii");
const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Show Password
showCheckbox.addEventListener("click", () => {
  if (showCheckbox.checked) {
    password.type = "text";
    confirmPassword.type = "text";
  } else {
    password.type = "password";
    confirmPassword.type = "password";
  }
});

//Form validation
function infoFormIsEmpty() {
  if (
    fullName.value == "" ||
    email.value == "" ||
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
      `http://localhost:3000/api/v1/runners/email/${email.value}`
    );
    const data = await res.json();
    console.log(data);
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

function yearIsValid() {
  if (yearEnrolled.value.length > 4 || yearGrad.value.length > 4) {
    errorMsg2.innerText = "Please enter a valid year";
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
    errorMsg2.innerText = "Please fill all inputs";
  } else {
    errorMsg2.innerText = "";
    return true;
  }
}

function isChecked() {
  if (!oathCheckbox.checked) {
    errorMsg2.innerText = "Please check the oath box";
  } else {
    errorMsg2.innerText = "";
    return true;
  }
}

backBtn.addEventListener("click", (e) => {
  e.preventDefault();
  schoolForm.classList.add("hidden");
  infoForm.classList.remove("hidden");
});

nextBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (
    infoFormIsEmpty() &&
    emailValidation() &&
    passwordValidation() &&
    confirmPasswordValidation() &&
    (await checkEmail())
  ) {
  infoForm.classList.add("hidden");
  schoolForm.classList.remove("hidden");
  }
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (schoolFormIsEmpty() && yearIsValid() && isChecked()) {
    const formData = new FormData();

    formData.append("name", fullName.value);
    formData.append("email", email.value);
    formData.append("gender", gender.value);
    formData.append("image", photo.files[0]);
    formData.append("password", password.value);
    formData.append("school", schoolName.value);
    formData.append("schoolstate", schoolState.value);
    formData.append("field", field.value);
    formData.append("yearenrolled", yearEnrolled.value);
    formData.append("yeargrad", yearGrad.value);
    formData.append("image", idCard.files[0]);

    postData(formData);
  }
});

async function postData(data) {
  try {
    const res = await fetch(`http://localhost:3000/api/v1/runners`, {
      method: "POST",
      body: data,
    });
    const bodydata = await res.json();
    console.log(bodydata);
    if (bodydata.message == "success") {
      window.location = "main.html";
    }
  } catch (err) {
    console.error(`Error: ${err}`);
  }
}
