const editProfileLinks = document.querySelectorAll(".edit-profile-link");
const editProfileModal = document.getElementById("editProfileModal");
const closeEditBtn = document.getElementById("closeEditModal");
const changeButtons = document.querySelectorAll(".change-btn");
const generateButton = document.querySelector(".generate-btn");
const inputs = document.querySelectorAll(".einput-box input");
const form = document.querySelector(".edit-sign-up-contents");
const welcomeText = document.querySelector(".hero h2");

editProfileLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    editProfileModal.classList.add("show");
    inputs.forEach((input) => {
      const changeBtn = input.nextElementSibling.nextElementSibling;
      if (changeBtn.classList.contains("change-btn")) {
        input.disabled = true;
        changeBtn.classList.remove("hidden");
        input.value = "";
      }
    });
  });
});

closeEditBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("show");
});

editProfileModal.addEventListener("click", function (e) {
  if (e.target === editProfileModal) {
    editProfileModal.classList.remove("show");
  }
});

changeButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    btn.classList.add("hidden");
    const input = btn.previousElementSibling.previousElementSibling;
    input.disabled = false;
    input.focus();
  });
});

generateButton.addEventListener("click", function () {
  const input = generateButton.previousElementSibling.previousElementSibling;
  const spaceTerms = [
    "star",
    "galaxy",
    "nebula",
    "orbit",
    "cosmo",
    "lunar",
    "solar",
    "nova",
    "astral",
    "cyber",
    "stellar",
    "interstellar",
    "quantum",
  ];
  const descriptors = [
    "Walker",
    "Explorer",
    "Voyager",
    "Ranger",
    "Seeker",
    "Pioneer",
    "Chaser",
    "Adventurer",
    "Adviser",
    "Balancer",
    "Hunter",
    "Solacer",
    "Finder",
    "Crusader",
    "Diviner",
  ];
  const randomSpace = spaceTerms[Math.floor(Math.random() * spaceTerms.length)];
  const randomDesc =
    descriptors[Math.floor(Math.random() * descriptors.length)];
  const newUsername = `${randomSpace}${randomDesc}`;
  input.placeholder = newUsername;
  input.value = "";
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  inputs.forEach((input) => {
    const changeBtn = input.nextElementSibling.nextElementSibling;
    if (changeBtn.classList.contains("change-btn")) {
      if (changeBtn.classList.contains("hidden")) {
        changeBtn.classList.remove("hidden");
        input.disabled = true;
      }
    }
    const newValue =
      input.value.trim() !== "" ? input.value.trim() : input.placeholder;
    input.placeholder = newValue;
    input.defaultPlaceholder = newValue;
    input.value = "";
    if (input.previousElementSibling.textContent === "Username") {
      welcomeText.textContent = `Welcome, ${newValue}`;
    }
  });
  editProfileModal.classList.remove("show");
});

inputs.forEach((input) => {
  input.defaultPlaceholder = input.placeholder;
});

const toggleAutopayLink = document.querySelector(".toggle");
const autopayStatus = document.querySelector(".span-2");

let isAutopayOn =
  localStorage.getItem("autopayState") === "false" ? false : true;

function setAutopayState() {
  autopayStatus.textContent = isAutopayOn ? "On" : "Off";
  autopayStatus.classList.toggle("on", isAutopayOn);
  autopayStatus.classList.toggle("off", !isAutopayOn);
  localStorage.setItem("autopayState", isAutopayOn);
}

setAutopayState();

toggleAutopayLink.addEventListener("click", function (e) {
  e.preventDefault();
  isAutopayOn = !isAutopayOn;
  setAutopayState();
});

const paymentMethodLink = document.querySelector(".payment-method");
const paymentModal = document.getElementById("paymentModal");
const closePaymentBtn = document.getElementById("closeModal");
const savedModal = document.getElementById("savedModal");
const paymentRadios = document.querySelectorAll(
  ".payment-option input[type='radio']"
);
const add粮食Btn = document.querySelector(".add-btn");

paymentMethodLink.addEventListener("click", function (e) {
  e.preventDefault();
  paymentModal.classList.add("show");
});

closePaymentBtn.addEventListener("click", function () {
  paymentModal.classList.remove("show");
});

paymentModal.addEventListener("click", function (e) {
  if (e.target === paymentModal) {
    paymentModal.classList.remove("show");
  }
});

const savedPaymentIndex = localStorage.getItem("selectedPaymentIndex");
if (savedPaymentIndex !== null) {
  paymentRadios[savedPaymentIndex].checked = true;
}

paymentRadios.forEach((radio, index) => {
  radio.addEventListener("click", function () {
    localStorage.setItem("selectedPaymentIndex", index);
    paymentModal.classList.remove("show");
    savedModal.classList.add("show");

    setTimeout(() => {
      savedModal.classList.remove("show");

      if (!isAutopayOn) {
        isAutopayOn = true;
        setAutopayState();
      }
    }, 2000);
  });
});

addPaymentBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "/add-payment.html";
});
