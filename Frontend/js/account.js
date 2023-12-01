// Display Contents
const contents = document.querySelectorAll("#content");
const dashboardDisplay = document.querySelector(".dashboard_display");
const profileDisplay = document.querySelector(".my_profile");
const dashboardLink = document.getElementById("dashboardLink");
const profileLink = document.getElementById("profileLink");

function displayContent(ele) {
  hideAllContents();
  ele.classList.remove("hidden");
}

function hideAllContents() {
  contents.forEach((content) => {
    content.classList.add("hidden");
  });
}

dashboardLink.addEventListener("click", () => {
  displayContent(dashboardDisplay);
});
  displayContent(dashboardDisplay);


profileLink.addEventListener("click", () => {
  displayContent(profileDisplay);
});

// SideBar active
const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

//Switch to password
const profileCard = document.querySelector(".profile_card");
const passwordCard = document.querySelector(".password_card");
const changePasswordBtn = document.querySelector(".change-password");

changePasswordBtn.addEventListener("click", () => {
  profileCard.style.display = "none";
  passwordCard.style.display = "block";
});

// Skill Tag
const ul = document.querySelector(".tag-ul"),
  input = document.querySelector(".tag-input"),
  tagNumb = document.querySelector(".details span");

let maxTags = 5,
  tags = [];

countTags();
createTag();

function countTags() {
  input.focus();
  tagNumb.innerText = maxTags - tags.length;
}

function createTag() {
  ul.querySelectorAll("li").forEach((li) => li.remove());
  tags
    .slice()
    .reverse()
    .forEach((tag) => {
      let liTag = `<li>${tag} <i class="uit uit-multiply" onclick="remove(this, '${tag}')"></i></li>`;
      ul.insertAdjacentHTML("afterbegin", liTag);
    });
  countTags();
}

function remove(element, tag) {
  let index = tags.indexOf(tag);
  tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
  element.parentElement.remove();
  countTags();
}

function addTag(e) {
  if (e.key == "Enter") {
    let tag = e.target.value.replace(/\s+/g, " ");
    if (tag.length > 1 && !tags.includes(tag)) {
      if (tags.length < 10) {
        tag.split(",").forEach((tag) => {
          tags.push(tag);
          createTag();
        });
      }
    }
    e.target.value = "";
  }
}

input.addEventListener("keyup", addTag);

const removeBtn = document.querySelector(".details button");
removeBtn.addEventListener("click", () => {
  tags.length = 0;
  ul.querySelectorAll("li").forEach((li) => li.remove());
  countTags();
});
