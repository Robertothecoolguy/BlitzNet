document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load footer");
      }
      return response.text();
    })
    .then((data) => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, "text/html");

      // Insert the footer HTML into the placeholder
      document.getElementById("footer-placeholder").innerHTML = data;

      // Now select elements from the loaded content
      const safetyLink = document.querySelector(".safety-link");
      const modal = document.getElementById("safety-modal");
      const closeBtn = document.querySelector(".closebtn");
      const whiteContainer = document.querySelector(".white-container");
      const finishButton = document.querySelector(".finish-button");

      // Modal functionality
      if (safetyLink) {
        safetyLink.addEventListener("click", (e) => {
          e.preventDefault();
          if (modal) {
            modal.style.display = "block";
          } else {
            console.error("Modal not found");
          }
        });
      } else {
        console.error("Safety link not found");
      }

      if (closeBtn) {
        closeBtn.addEventListener("click", (e) => {
          e.preventDefault();
          modal.style.display = "none";
        });
      }

      if (whiteContainer && finishButton) {
        whiteContainer.addEventListener("scroll", () => {
          const scrollPosition =
            whiteContainer.scrollTop + whiteContainer.clientHeight;
          const scrollHeight = whiteContainer.scrollHeight;
          if (scrollPosition >= scrollHeight - 10) {
            finishButton.disabled = false;
            finishButton.style.background = "#ff0000";
          }
        });

        finishButton.addEventListener("click", () => {
          if (!finishButton.disabled) {
            modal.style.display = "none";
          }
        });
      }

      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
        }
      });
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });
});
