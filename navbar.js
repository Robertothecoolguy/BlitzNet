document.addEventListener("DOMContentLoaded", () => {
  fetch("navbar.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load navbar");
      return response.text();
    })
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      let cartItems = new Set(
        JSON.parse(localStorage.getItem("cartItems")) || []
      );
      const cartCountElement = document.getElementById("cart-count");

      function updateCartCount() {
        if (cartCountElement) {
          cartCountElement.textContent = cartItems.size;
          console.log("Cart count updated to:", cartItems.size);
        }
      }

      function saveCart() {
        localStorage.setItem("cartItems", JSON.stringify([...cartItems]));
        console.log(
          "Saved to localStorage:",
          localStorage.getItem("cartItems")
        );
        updateCartCount();
        window.dispatchEvent(new Event("cartUpdated")); // Add this to notify my-orders.js
      }

      updateCartCount();

      const addToCartButtons = document.querySelectorAll(".add-to-cart");
      addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-product-id");
          if (!cartItems.has(productId)) {
            cartItems.add(productId);
            saveCart();
          } else {
            alert("This item is already in your cart.");
          }
        });
      });

      const bundleButton = document.getElementById("bundle-button");
      if (bundleButton) {
        bundleButton.addEventListener("click", function () {
          const productsToBundle = ["1", "2"];
          let toAdd = productsToBundle.filter((id) => !cartItems.has(id));
          if (toAdd.length === 0) {
            alert("Both items are now bundled in your cart.");
          } else {
            toAdd.forEach((id) => cartItems.add(id));
            saveCart();
          }
        });
      }

      // Listen for cart updates from other scripts
      window.addEventListener("cartUpdated", () => {
        cartItems = new Set(
          JSON.parse(localStorage.getItem("cartItems")) || []
        );
        updateCartCount();
      });
    })
    .catch((error) => {
      console.error("Error loading navbar:", error);
    });
});
