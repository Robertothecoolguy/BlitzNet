document.addEventListener("DOMContentLoaded", () => {
  fetch("sign-in.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to load sign-in");
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById("sign-in-placeholder").innerHTML = data;

      // Attach event listeners after the HTML is loaded
      const signInIcon = document.querySelector(".sign-in");
      const loginPopup = document.getElementById("loginPopup");

      // Show popup on sign-in click
      signInIcon.addEventListener("click", (e) => {
        e.preventDefault();
        loginPopup.style.display = "flex";
      });

      // Close popup function (called from onclick in HTML)
      window.closePopup = function () {
        loginPopup.style.display = "none";
      };

      // Close popup when clicking outside
      loginPopup.addEventListener("click", (e) => {
        if (e.target === loginPopup) {
          loginPopup.style.display = "none";
        }
      });

      // Google Sign-In button (placeholder for now)
      document.getElementById("googleSignIn").addEventListener("click", () => {
        console.log("Google Sign-In clicked");
        // Add real Google Sign-In logic here later
      });

      // Basic form submission handler
      document.querySelector(".input-submit").addEventListener("click", (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        console.log("Login attempt:", { email, password });
        // Add your login logic here
      });
    })
    .catch((error) => {
      console.error("Error loading sign-in:", error);
    });
});

// Google Sign-In callback (called by Google's API)
function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId());
  console.log("Name: " + profile.getName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());
  // Send this data to your backend for authentication
}
