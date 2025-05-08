const seeMoreButton = document.querySelector(".see-more-button");
const hiddenVideos = document.querySelectorAll(".hidden-video");
const buttonBox = document.querySelector(".see-more-button-box");

seeMoreButton.addEventListener("click", () => {
  const screenWidth = window.innerWidth;

  if (screenWidth >= 2115 && screenWidth <= 2800) {
    hiddenVideos.forEach((video, index) => {
      if (index >= 2) {
        video.classList.add("visible");
      }
    });
  } else {
    hiddenVideos.forEach((video) => {
      video.classList.add("visible");
    });
  }

  buttonBox.classList.add("hidden");
});
