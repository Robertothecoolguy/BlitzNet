document.addEventListener("DOMContentLoaded", () => {
  fetch("footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load footer");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("footer-placeholder").innerHTML = data;

      const overlay = document.createElement("div");
      overlay.className = "overlay";
      document.body.appendChild(overlay);

      const hasAcceptedTerms = () =>
        localStorage.getItem("termsAccepted") === "true";
      const setTermsAccepted = () =>
        localStorage.setItem("termsAccepted", "true");

      const safetyLink = document.querySelector(".safety-link");
      const safetyModal = document.getElementById("safety-modal");
      const safetyCloseBtn = safetyModal?.querySelector(".closebtn");
      const safetyWhiteContainer =
        safetyModal?.querySelector(".white-container");
      const safetyFinishButton = safetyModal?.querySelector(".finish-button");

      if (safetyLink && safetyModal) {
        safetyLink.addEventListener("click", (e) => {
          e.preventDefault();
          safetyModal.style.display = "block";
          overlay.style.display = "block";
          document.body.style.overflow = "hidden";
        });
      }

      if (safetyCloseBtn) {
        safetyCloseBtn.addEventListener("click", (e) => {
          e.preventDefault();
          if (!safetyCloseBtn.disabled) {
            safetyModal.style.display = "none";
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
          }
        });
      }

      if (safetyWhiteContainer && safetyFinishButton && safetyCloseBtn) {
        safetyFinishButton.disabled = true;
        safetyCloseBtn.disabled = true;

        safetyWhiteContainer.addEventListener("scroll", () => {
          const scrollPosition =
            safetyWhiteContainer.scrollTop + safetyWhiteContainer.clientHeight;
          const scrollHeight = safetyWhiteContainer.scrollHeight;
          if (scrollPosition >= scrollHeight - 10) {
            safetyFinishButton.disabled = false;
            safetyCloseBtn.disabled = false;
            safetyFinishButton.style.background = "#620182";
          }
        });

        safetyFinishButton.addEventListener("click", () => {
          if (!safetyFinishButton.disabled) {
            safetyModal.style.display = "none";
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
          }
        });
      }

      const termsLink = document.getElementById("termsLink");
      const termsModal = document.getElementById("termsModal");
      const closeTerms = termsModal?.querySelector("#closeTerms");
      const checkbox = termsModal?.querySelector("#checkbox1");
      const termsContent = termsModal?.querySelector("#termsContent");
      const termsFinishButton = termsModal?.querySelector(".finish-button");

      if (termsLink && termsModal) {
        termsLink.addEventListener("click", (e) => {
          e.preventDefault();
          termsModal.style.display = "flex";
          overlay.style.display = "block";
          document.body.style.overflow = "hidden";

          if (hasAcceptedTerms()) {
            termsFinishButton.disabled = false;
            closeTerms.disabled = false;
            termsFinishButton.style.background = "#620182";
            if (checkbox) checkbox.checked = true;
          } else {
            termsFinishButton.disabled = true;
            closeTerms.disabled = true;
            termsFinishButton.style.background = "#5c5c5c00";
            if (checkbox) checkbox.checked = false;
          }
        });
      }

      if (closeTerms) {
        closeTerms.addEventListener("click", (e) => {
          e.preventDefault();
          if (!closeTerms.disabled) {
            termsModal.style.display = "none";
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
          }
        });
      }

      if (termsContent && termsFinishButton && closeTerms) {
        if (hasAcceptedTerms()) {
          termsFinishButton.disabled = false;
          closeTerms.disabled = false;
          termsFinishButton.style.background = "#620182";
        } else {
          termsFinishButton.disabled = true;
          closeTerms.disabled = true;
          termsFinishButton.style.background = "#5c5c5c00";
        }

        termsContent.addEventListener("scroll", () => {
          const scrollPosition =
            termsContent.scrollTop + termsContent.clientHeight;
          const scrollHeight = termsContent.scrollHeight;
          if (
            scrollPosition >= scrollHeight - 10 &&
            termsFinishButton.disabled
          ) {
            termsFinishButton.disabled = false;
            closeTerms.disabled = false;
            termsFinishButton.style.background = "#620182";
            setTermsAccepted();
          }
        });

        if (checkbox) {
          checkbox.addEventListener("change", function () {
            if (this.checked) {
              termsContent.scrollTo({
                top: termsContent.scrollHeight,
                behavior: "smooth",
              });
              setTimeout(() => {
                termsFinishButton.disabled = false;
                closeTerms.disabled = false;
                termsFinishButton.style.background = "#620182";
                setTermsAccepted();
              }, 600);
            }
          });
        }

        termsFinishButton.addEventListener("click", () => {
          if (!termsFinishButton.disabled) {
            termsModal.style.display = "none";
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
          }
        });
      }

      const privacyLink = document.getElementById("privacyLink");
      const privacyModal = document.getElementById("privacyModal");
      const closePrivacy = privacyModal?.querySelector("#closePrivacy");

      if (privacyLink && privacyModal) {
        privacyLink.addEventListener("click", (e) => {
          e.preventDefault();
          privacyModal.style.display = "flex";
          overlay.style.display = "block";
          document.body.style.overflow = "hidden";
        });
      }

      if (closePrivacy) {
        closePrivacy.addEventListener("click", (e) => {
          e.preventDefault();
          privacyModal.style.display = "none";
          overlay.style.display = "none";
          document.body.style.overflow = "auto";
        });
      }

      const cookieLink = document.getElementById("cookieLink");
      const cookieModal = document.getElementById("cookieModal");
      const closeCookie = cookieModal?.querySelector("#closeCookie");

      if (cookieLink && cookieModal) {
        cookieLink.addEventListener("click", (e) => {
          e.preventDefault();
          cookieModal.style.display = "flex";
          overlay.style.display = "block";
          document.body.style.overflow = "hidden";
        });
      }

      if (closeCookie) {
        closeCookie.addEventListener("click", (e) => {
          e.preventDefault();
          cookieModal.style.display = "none";
          overlay.style.display = "none";
          document.body.style.overflow = "auto";
        });
      }

      overlay.addEventListener("click", () => {
        if (safetyModal) safetyModal.style.display = "none";
        if (termsModal) termsModal.style.display = "none";
        if (privacyModal) privacyModal.style.display = "none";
        if (cookieModal) cookieModal.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "auto";
      });
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });
});
