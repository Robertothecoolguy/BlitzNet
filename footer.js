document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded");

  // Load footer
  fetch("footer.html")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Failed to load footer: ${response.status}`);
      }
      return response.text();
    })
    .then((data) => {
      const footerPlaceholder = document.getElementById("footer-placeholder");
      if (footerPlaceholder) {
        footerPlaceholder.innerHTML = data;
        console.log("Footer loaded successfully");
        initializeSubscription();
      } else {
        console.error("Footer placeholder not found");
      }
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });

  // Mutation observer to detect footer changes
  const footerPlaceholder = document.getElementById("footer-placeholder");
  if (footerPlaceholder) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          console.log("Footer content detected via mutation");
          initializeSubscription();
        }
      });
    });
    observer.observe(footerPlaceholder, { childList: true, subtree: true });
  }

  function initializeSubscription() {
    const subscribeParagraph = document.querySelector(
      ".f-subscribe .subscribe-paragraph"
    );
    const sendImage = document.querySelector(".f-subscribe .send");
    const emailInput = document.querySelector(".f-subscribe .email-input");
    const sendLink = sendImage ? sendImage.closest("a") : null;

    console.log("Subscription elements:", {
      subscribeParagraph,
      sendImage,
      emailInput,
      sendLink,
    });

    if (!subscribeParagraph || !sendImage || !emailInput || !sendLink) {
      console.error(
        "Missing subscription elements. Cannot initialize subscription."
      );
      return;
    }

    // Apply subscribed state from localStorage
    try {
      const subscribed = localStorage.getItem("subscribed");
      console.log("localStorage.subscribed:", subscribed);
      if (subscribed === "true") {
        subscribeParagraph.textContent = "Subscribed!";
        subscribeParagraph.classList.add("subscribed-text");
        console.log("Applied subscribed state from localStorage");
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error);
    }

    // Handle click on the send link
    sendLink.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("Send link clicked, email value:", emailInput.value);
      if (emailInput.value.trim()) {
        try {
          subscribeParagraph.textContent = "Subscribed!";
          subscribeParagraph.classList.add("subscribed-text");
          localStorage.setItem("subscribed", "true");
          emailInput.value = "";
          console.log(
            "Subscribed state saved to localStorage:",
            localStorage.getItem("subscribed")
          );
        } catch (error) {
          console.error("Error setting localStorage:", error);
        }
      } else {
        console.log("Email input is empty, subscription not triggered");
      }
    });
  }
});
