const portfolioInput = document.getElementById("portfolio-link");
const placeholderText = "https://yourportfolio.com";
let i = 0;
let isDeleting = false;

function typeAnimation() {
  const currentText = portfolioInput.value;

  if (!currentText) {
    if (!isDeleting && i <= placeholderText.length) {
      portfolioInput.setAttribute(
        "placeholder",
        placeholderText.substring(0, i)
      );
      i++;
      if (i > placeholderText.length) {
        setTimeout(() => (isDeleting = true), 3000);
      }
    } else if (isDeleting && i >= 0) {
      portfolioInput.setAttribute(
        "placeholder",
        placeholderText.substring(0, i)
      );
      i--;
      if (i < 0) {
        setTimeout(() => (isDeleting = false), 500);
      }
    }

    const speed = isDeleting ? 50 : 100;
    setTimeout(typeAnimation, speed);
  }
}

window.addEventListener("load", () => {
  if (!portfolioInput.value) {
    typeAnimation();
  }
});

portfolioInput.addEventListener("input", function () {
  if (this.value) {
    this.removeAttribute("placeholder");
  } else {
    i = 0;
    isDeleting = false;
    typeAnimation();
  }
});

const urlDisplay = document.getElementById("portfolio-link-display");
portfolioInput.addEventListener("input", function () {
  const url = portfolioInput.value.trim();
  if (url) {
    const displayUrl = url.match(/^https?:\/\//) ? url : "http://" + url;
    urlDisplay.href = displayUrl;
    urlDisplay.textContent = url;
    urlDisplay.style.display = "block";
  } else {
    urlDisplay.style.display = "none";
  }
});
