// Get elements for Edit Profile Modal
const editProfileLink = document.getElementById("edit-profile-link");
const editProfileModal = document.getElementById("editProfileModal");
const closeEditBtn = document.getElementById("closeEditModal");

// Edit Profile Modal Enhancements
const changeButtons = document.querySelectorAll(".change-btn");
const generateButton = document.querySelector(".generate-btn");
const inputs = document.querySelectorAll(".einput-box input");
const form = document.querySelector(".edit-sign-up-contents");
const welcomeText = document.querySelector(".hero h2");

// Show Edit Profile Modal and reset states
editProfileLink.addEventListener("click", function (e) {
  e.preventDefault();
  editProfileModal.classList.add("show");
  // Reset all inputs and buttons when modal opens
  inputs.forEach((input) => {
    const changeBtn = input.nextElementSibling.nextElementSibling;
    if (changeBtn.classList.contains("change-btn")) {
      input.disabled = true; // Disable inputs with Change? button
      changeBtn.classList.remove("hidden"); // Show all Change? buttons
      input.value = ""; // Clear any previous input
    }
  });
});

// Hide Edit Profile Modal when close button is clicked
closeEditBtn.addEventListener("click", function () {
  editProfileModal.classList.remove("show");
});

// Close Edit Profile Modal when clicking outside the content
editProfileModal.addEventListener("click", function (e) {
  if (e.target === editProfileModal) {
    editProfileModal.classList.remove("show");
  }
});

changeButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    btn.classList.add("hidden"); // Hide Change? button
    const input = btn.previousElementSibling.previousElementSibling; // Get input
    input.disabled = false; // Enable the input
    input.focus(); // Focus on input for editing
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
  input.placeholder = newUsername; // Set new placeholder
  input.value = ""; // Clear any user-entered value to prioritize placeholder
});

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission for demo
  inputs.forEach((input) => {
    const changeBtn = input.nextElementSibling.nextElementSibling;
    // If it’s a Change? button (not Generate), handle it
    if (changeBtn.classList.contains("change-btn")) {
      if (changeBtn.classList.contains("hidden")) {
        changeBtn.classList.remove("hidden"); // Show Change? again after save (though reset on reopen)
        input.disabled = true; // Disable input again after saving
      }
    }
    // Determine what to save: user input or placeholder
    const newValue =
      input.value.trim() !== "" ? input.value.trim() : input.placeholder;
    input.placeholder = newValue; // Update placeholder to persist
    input.defaultPlaceholder = newValue; // Store as default
    input.value = ""; // Clear input after saving

    // Update h2 if it’s the Username field
    if (input.previousElementSibling.textContent === "Username") {
      welcomeText.textContent = `Welcome, ${newValue}`;
    }
  });
  editProfileModal.classList.remove("show"); // Close modal after save
});

// Set initial default placeholders
inputs.forEach((input) => {
  input.defaultPlaceholder = input.placeholder;
});
