const editProfileLink = document.getElementById("edit-profile-link");
const editProfileModal = document.getElementById("editProfileModal");
const closeEditBtn = document.getElementById("closeEditModal");
const changeButtons = document.querySelectorAll(".change-btn");
const generateButton = document.querySelector(".generate-btn");
const inputs = document.querySelectorAll(".einput-box input");
const form = document.querySelector(".edit-sign-up-contents");
const welcomeText = document.querySelector(".hero h2");

// Edit Profile Modal logic
editProfileLink.addEventListener("click", function (e) {
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

// Toggle Autopay functionality
const toggleAutopayLink = document.querySelector(".toggle");
const autopayStatus = document.querySelector(".span-2");

// Load autopay state from localStorage or default to true
let isAutopayOn =
  localStorage.getItem("autopayState") === "false" ? false : true;

// Set autopay state (UI and storage update)
function setAutopayState() {
  autopayStatus.textContent = isAutopayOn ? "On" : "Off";
  autopayStatus.classList.toggle("on", isAutopayOn);
  autopayStatus.classList.toggle("off", !isAutopayOn);
  localStorage.setItem("autopayState", isAutopayOn); // Save state to localStorage
}

// Apply initial state
setAutopayState();

toggleAutopayLink.addEventListener("click", function (e) {
  e.preventDefault();
  isAutopayOn = !isAutopayOn;
  setAutopayState();
});

// Edit Payment Method functionality
const paymentMethodLink = document.querySelector(".payment-method");
const paymentModal = document.getElementById("paymentModal");
const closePaymentBtn = document.getElementById("closeModal");
const savedModal = document.getElementById("savedModal");
const paymentRadios = document.querySelectorAll(
  ".payment-option input[type='radio']"
);
const add粮食Btn = document.querySelector(".add-btn");

// Show payment modal when "Edit Payment Method" is clicked
paymentMethodLink.addEventListener("click", function (e) {
  e.preventDefault();
  paymentModal.classList.add("show");
});

// Close payment modal
closePaymentBtn.addEventListener("click", function () {
  paymentModal.classList.remove("show");
});

// Close payment modal when clicking outside
paymentModal.addEventListener("click", function (e) {
  if (e.target === paymentModal) {
    paymentModal.classList.remove("show");
  }
});

// Load saved payment method from localStorage on page load
const savedPaymentIndex = localStorage.getItem("selectedPaymentIndex");
if (savedPaymentIndex !== null) {
  paymentRadios[savedPaymentIndex].checked = true;
}

// Save selected payment method, show saved modal, and turn autopay on after modal hides
paymentRadios.forEach((radio, index) => {
  radio.addEventListener("click", function () {
    localStorage.setItem("selectedPaymentIndex", index); // Save the index of the selected radio
    paymentModal.classList.remove("show"); // Close payment modal
    savedModal.classList.add("show"); // Show saved modal

    setTimeout(() => {
      savedModal.classList.remove("show"); // Hide saved modal after 2 seconds
      // Switch autopay to "On" if it was "Off" after modal disappears
      if (!isAutopayOn) {
        isAutopayOn = true;
        setAutopayState(); // Update UI and save to localStorage
      }
    }, 2000);
  });
});

// Open add-payment.html when "Add new payment method" is clicked
addPaymentBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.href = "/add-payment.html";
});
