window.addEventListener("beforeunload", function () {
  const scrollPosition = window.scrollY || window.pageYOffset;
  sessionStorage.setItem("scrollPosition", scrollPosition);
});

window.addEventListener("load", function () {
  const savedPosition = sessionStorage.getItem("scrollPosition");
  if (savedPosition !== null) {
    window.scrollTo(0, parseInt(savedPosition, 10));
  }
});

function saveState() {
  const elements = document.querySelectorAll("[data-persist]");
  const state = {};

  elements.forEach((el) => {
    const key = el.id;
    if (el.tagName === "TEXTAREA") {
      state[key] = el.value;
    }
  });

  localStorage.setItem("careersFormState", JSON.stringify(state));
}

function restoreState() {
  const savedState = JSON.parse(localStorage.getItem("careersFormState")) || {};
  const elements = document.querySelectorAll("[data-persist]");

  elements.forEach((el) => {
    const key = el.id;
    if (savedState[key]) {
      if (el.tagName === "TEXTAREA") {
        el.value = savedState[key];
      } else if (el.type === "file") {
        const fileNameSpan = document.getElementById(`${key}-file-name`);
        if (fileNameSpan && savedState[key]) {
          fileNameSpan.textContent = `Previously selected: ${savedState[key]}`;
        }
      }
    }
  });
}

document.addEventListener("input", saveState);
document.addEventListener("change", saveState);
window.addEventListener("beforeunload", saveState);

window.addEventListener("load", restoreState);
