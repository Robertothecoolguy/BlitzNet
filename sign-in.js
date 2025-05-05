document.addEventListener("DOMContentLoaded", () => {
  function waitForNavbar() {
    const navbarPlaceholder = document.getElementById("navbar-placeholder");
    if (navbarPlaceholder && navbarPlaceholder.innerHTML.trim() !== "") {
      loadSignIn();
    } else {
      console.log("Waiting for navbar to load...");
      const observer = new MutationObserver((mutations, obs) => {
        if (navbarPlaceholder.innerHTML.trim() !== "") {
          console.log("Navbar loaded, proceeding with sign-in setup");
          loadSignIn();
          obs.disconnect();
        }
      });
      observer.observe(navbarPlaceholder, { childList: true, subtree: true });
    }
  }

  function loadSignIn() {
    const signInPlaceholder = document.getElementById("sign-in-placeholder");
    if (!signInPlaceholder) {
      console.error("Sign-in placeholder not found");
      return;
    }

    fetch("sign-in.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load sign-in");
        }
        return response.text();
      })
      .then((data) => {
        signInPlaceholder.id = "login-popup";
        signInPlaceholder.innerHTML = data;
        console.log("Sign-in content loaded into #login-popup");

        const signInIcon = document.querySelector(".sign-in");
        const loginPopup = document.getElementById("login-popup");

        if (signInIcon && loginPopup) {
          signInIcon.addEventListener("click", (e) => {
            e.preventDefault();
            loginPopup.style.display = "flex";
            console.log("Sign-in icon clicked, opened login popup");
          });
        } else {
          console.error("Sign-in icon or login popup not found", {
            signInIcon: !!signInIcon,
            loginPopup: !!loginPopup,
          });
        }

        window.closePopup = function () {
          loginPopup.style.display = "none";
          console.log("Login popup closed via closePopup");
        };

        loginPopup.addEventListener("click", (e) => {
          if (e.target === loginPopup) {
            loginPopup.style.display = "none";
            console.log("Login popup closed via background click");
          }
        });

        const closePopupButton = loginPopup.querySelector(".close-popup");
        if (closePopupButton) {
          closePopupButton.addEventListener("click", () => {
            loginPopup.style.display = "none";
            console.log("Login popup closed via close button");
          });
        }

        const googleSignInButton = document.getElementById("googleSignIn");
        if (googleSignInButton) {
          googleSignInButton.addEventListener("click", () => {
            console.log("Google Sign-In clicked");
          });
        }

        const loginFormSubmit = document.querySelector(".input-submit");
        if (loginFormSubmit) {
          loginFormSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            console.log("Login attempt:", { email, password });
          });
        }
      })
      .catch((error) => {
        console.error("Error loading sign-in:", error);
      });
  }

  waitForNavbar();
});

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log("Google Sign-In successful:", {
    ID: profile.getId(),
    Name: profile.getName(),
    ImageURL: profile.getImageUrl(),
    Email: profile.getEmail(),
  });
}
