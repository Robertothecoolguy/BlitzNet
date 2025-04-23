const inputs = document.querySelectorAll(".input-box input");
const titleParagraph = document.querySelector(".logo-title p");
const nextButton = document.querySelector(".next-button");
const confirmModal = document.getElementById("confirmModal");
const wrapper = document.querySelector(".wrapper");
const wrapperConfirm = document.querySelector(".wrapper.confirm");
const codeInputs = document.querySelectorAll("input.code-input");
const nextButton2 = document.querySelector(".next-button-2");
const goBackLink = document.querySelector(".go-back");

let formData = {};

inputs.forEach((input) => {
  input.addEventListener("focus", function () {
    const placeholder = this.getAttribute("placeholder");
    if (placeholder === "Email Address") {
      titleParagraph.textContent = "Enter an email address";
    } else if (placeholder === "Username") {
      titleParagraph.textContent = "Enter a desired username";
    } else {
      titleParagraph.textContent = `Enter a ${placeholder.toLowerCase()}`;
    }
  });

  input.addEventListener("blur", function () {
    titleParagraph.textContent = "Be a part of excellence";
  });
});

nextButton.addEventListener("click", function (e) {
  e.preventDefault();

  formData.fullName = document.querySelector(
    'input[placeholder="Full Name"]'
  ).value;
  formData.username = document.querySelector(
    'input[placeholder="Username"]'
  ).value;
  formData.email = document.querySelector(
    'input[placeholder="Email Address"]'
  ).value;
  formData.password = document.querySelector(
    'input[placeholder="Password"]'
  ).value;
  formData.rememberMe = document.querySelector("#check").checked;

  confirmModal.classList.add("show");

  setTimeout(() => {
    confirmModal.classList.remove("show");
    wrapper.classList.add("hidden");
    wrapperConfirm.classList.add("active");
  }, 1900);
});

codeInputs.forEach((elem, index) => {
  elem.addEventListener("keydown", (e) => {
    if (e.keyCode === 8 && e.target.value === "") {
      codeInputs[Math.max(0, index - 1)].focus();
    }
  });

  elem.addEventListener("input", (e) => {
    const value = e.target.value;
    if (value.length > 1) {
      distributeCode(value.slice(0, 6), index);
    } else {
      e.target.value = value.slice(0, 1);
      if (value && index < codeInputs.length - 1) {
        codeInputs[index + 1].focus();
      }
    }
    updateNextButtonStyle();
  });

  elem.addEventListener("paste", (e) => {
    e.preventDefault();
    const pastedData = (e.clipboardData || window.clipboardData)
      .getData("text")
      .trim();
    if (pastedData.length > 0) {
      distributeCode(pastedData.slice(0, 6), index);
      updateNextButtonStyle();
    }
  });
});

function distributeCode(code, startIndex) {
  const chars = code.split("");
  for (let i = 0; i < chars.length && startIndex + i < codeInputs.length; i++) {
    codeInputs[startIndex + i].value = chars[i];
  }

  const nextFocusIndex = Math.min(
    startIndex + chars.length,
    codeInputs.length - 1
  );
  codeInputs[nextFocusIndex].focus();
}

function updateNextButtonStyle() {
  const allFilled = Array.from(codeInputs).every(
    (input) => input.value.length === 1
  );
  if (allFilled) {
    nextButton2.classList.remove("next-button-2");
    nextButton2.classList.add("next-button");
  } else {
    nextButton2.classList.remove("next-button");
    nextButton2.classList.add("next-button-2");
  }
}

nextButton2.addEventListener("click", function (e) {
  e.preventDefault();
  if (this.classList.contains("next-button")) {
    window.location.href = "user-profile.html";
  }
});

goBackLink.addEventListener("click", (e) => {
  e.preventDefault();
  wrapperConfirm.classList.remove("active");
  wrapper.classList.remove("hidden");

  document.querySelector('input[placeholder="Full Name"]').value =
    formData.fullName || "";
  document.querySelector('input[placeholder="Username"]').value =
    formData.username || "";
  document.querySelector('input[placeholder="Email Address"]').value =
    formData.email || "";
  document.querySelector('input[placeholder="Password"]').value =
    formData.password || "";
  document.querySelector("#check").checked = formData.rememberMe || false;
});
