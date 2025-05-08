document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded, starting navbar fetch");
  console.log(
    "Checking for #login-popup at load:",
    document.getElementById("login-popup") ? "Found" : "Not found"
  );
  fetch("navbar.html")
    .then((response) => {
      if (!response.ok) throw new Error("Failed to load navbar");
      console.log("Navbar fetched successfully");
      return response.text();
    })
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;
      console.log("Navbar inserted into DOM");
      console.log(
        "Checking #login-popup after insertion:",
        document.getElementById("login-popup") ? "Found" : "Not found"
      );

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
        updateCartCount();
        window.dispatchEvent(new Event("cartUpdated"));
        console.log("Cart saved, event dispatched");
      }
      updateCartCount();

      const addToCartButtons = document.querySelectorAll(".add-to-cart");
      addToCartButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const productId = this.getAttribute("data-product-id");
          console.log("Add to cart clicked, product ID:", productId);
          if (productId === "2" && cartItems.has("3")) {
            console.log(
              "Additional lines are already in your cart, skipping add."
            );
            return;
          }
          if (!cartItems.has(productId)) {
            cartItems.add(productId);
            saveCart();
          } else {
            console.log("Item already in cart, skipping add.");
          }
        });
      });

      const bundleButton = document.getElementById("bundle-button");
      if (bundleButton) {
        bundleButton.addEventListener("click", function () {
          console.log("Bundle button clicked");
          const productsToBundle = ["1", "2"];
          let toAdd = productsToBundle.filter((id) => !cartItems.has(id));
          if (cartItems.has("3")) {
            toAdd = toAdd.filter((id) => id !== "2");
          }
          if (toAdd.length === 0) {
            console.log("All bundle items already in cart.");
          } else {
            toAdd.forEach((id) => cartItems.add(id));
            saveCart();
          }
        });
      }

      window.addEventListener("cartUpdated", () => {
        cartItems = new Set(
          JSON.parse(localStorage.getItem("cartItems")) || []
        );
        updateCartCount();
        console.log("Cart updated event received");
      });

      const searchData = [
        {
          terms: ["about us", "about", "ceo", "aobut"],
          displayText: "About Us",
          url: "about-us.html",
        },
        {
          terms: ["add payment", "add a new card", "new payment"],
          displayText: "Add Payment Method",
          url: "#login-popup",
        },
        {
          terms: ["careers", "jobs", "carreers"],
          displayText: "Careers",
          url: "careers.html",
        },
        {
          terms: ["customer service", "phone number", "repair", "support"],
          displayText: "Customer Service",
          url: "customer-service.html",
        },
        {
          terms: ["forgot password", "reset password", "password"],
          displayText: "Forgot Password",
          url: "forgot-password.html",
        },
        { terms: ["home", "homepage"], displayText: "Home", url: "index.html" },
        {
          terms: [
            "modify subscriptions",
            "change plan",
            "update subscription",
            "subscriptions",
          ],
          displayText: "Modify Subscriptions",
          url: "#login-popup",
        },
        {
          terms: ["cart", "my cart", "shopping cart"],
          displayText: "My Cart",
          url: "my-orders.html",
        },
        {
          terms: ["payment-shipping", "payment and shipping", "shipping info"],
          displayText: "Payment & Shipping",
          url: "#login-popup",
        },
        {
          terms: ["tracking orders", "track order", "order status"],
          displayText: "Tracking Orders",
          url: "#login-popup",
        },
        {
          terms: ["my account", "profile", "account", "acount"],
          displayText: "My Account",
          url: "#login-popup",
          postLoginUrl: "user-profile.html",
        },
      ];

      const isSmallScreen = () =>
        window.matchMedia("(max-width: 950px)").matches;

      function showSearchSvg() {
        const searchSvg = document.querySelector(".search-svg");
        if (searchSvg) {
          if (isSmallScreen()) {
            searchSvg.style.display = "block";
            console.log(
              "Showed search SVG (small screen), display set to block"
            );
          } else {
            searchSvg.style.display = "none";
            console.log("Kept search SVG hidden (large screen)");
          }
        } else {
          console.error("Search SVG element not found when trying to show");
        }
      }

      function hideSearchSvg() {
        const searchSvg = document.querySelector(".search-svg");
        if (searchSvg && isSmallScreen()) {
          searchSvg.style.display = "none";
          console.log("Hid search SVG (small screen), display set to none");
        } else if (!searchSvg) {
          console.error("Search SVG element not found when trying to hide");
        }
      }

      function closeSearchPopup() {
        const searchPopup = document.getElementById("search-popup");
        const popupInput = document.querySelector(
          "#popup-search-form .search-input"
        );
        const popupSuggestions = document.querySelector("#popup-suggestions");
        if (searchPopup) {
          searchPopup.style.display = "none";
          console.log("Closed search popup");
        } else {
          console.error("Search popup element not found when trying to close");
        }
        if (popupInput) {
          popupInput.value = "";
          console.log("Cleared popup search input");
        }
        if (popupSuggestions) {
          popupSuggestions.innerHTML = "";
          popupSuggestions.style.display = "none";
          console.log("Cleared and hid popup suggestions");
        }
        showSearchSvg();
      }

      function setupSearch(input, form, suggestionsContainer) {
        console.log("Setting up search for:", form.id);
        input.addEventListener("input", () => {
          const query = input.value.toLowerCase().trim();
          console.log("Search input changed, query:", query);
          suggestionsContainer.innerHTML = "";
          if (query) {
            const matches = searchData.filter((item) =>
              item.terms.some((term) => term.toLowerCase().includes(query))
            );
            console.log(
              "Search matches found:",
              matches.map((item) => ({
                displayText: item.displayText,
                terms: item.terms,
                url: item.url,
              }))
            );
            matches.forEach((item) => {
              const div = document.createElement("div");
              div.textContent = item.displayText;
              div.classList.add("suggestion-item");
              div.addEventListener("click", () => {
                console.log("Suggestion clicked:", item.displayText);
                input.value = item.terms[0];
                suggestionsContainer.innerHTML = "";
                suggestionsContainer.style.display = "none";
                navigateTo(item);
                if (form.id === "popup-search-form") {
                  closeSearchPopup();
                }
              });
              suggestionsContainer.appendChild(div);
              console.log("Added suggestion:", item.displayText);
            });
            suggestionsContainer.style.display = matches.length
              ? "block"
              : "none";
            suggestionsContainer.style.visibility = "visible";
            suggestionsContainer.style.opacity = "1";
            console.log(
              "Suggestions container display:",
              suggestionsContainer.style.display
            );
          } else {
            suggestionsContainer.style.display = "none";
            console.log("No query, hiding suggestions");
          }
        });
        form.addEventListener("submit", (e) => {
          e.preventDefault();
          console.log("Search form submitted, form ID:", form.id);
          const query = input.value.toLowerCase().trim();
          const exactMatch = searchData.find((item) =>
            item.terms.some((term) => term.toLowerCase() === query)
          );
          const partialMatch = searchData.find((item) =>
            item.terms.some((term) => term.toLowerCase().includes(query))
          );
          const match = exactMatch || partialMatch;
          console.log(
            "Search query:",
            query,
            "Exact match:",
            exactMatch ? exactMatch.displayText : null,
            "Partial match:",
            partialMatch ? partialMatch.displayText : null
          );
          if (match) {
            navigateTo(match);
            input.value = "";
            suggestionsContainer.innerHTML = "";
            suggestionsContainer.style.display = "none";
            if (form.id === "popup-search-form") {
              closeSearchPopup();
            }
          } else {
            console.log("No match found for query:", query);
          }
        });
        const searchIcon = form.querySelector(".search-icon");
        if (searchIcon) {
          searchIcon.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("Search icon clicked for form:", form.id);
            form.dispatchEvent(new Event("submit"));
          });
        }
      }

      function navigateTo(item) {
        console.log("Navigating to:", {
          displayText: item.displayText,
          url: item.url,
        });

        const mainInput = document.querySelector("#search-form .search-input");
        const mainSuggestions = document.querySelector("#suggestions");
        if (mainInput && mainSuggestions) {
          mainInput.value = "";
          mainSuggestions.innerHTML = "";
          mainSuggestions.style.display = "none";
          console.log("Cleared and hid main search");
        }

        closeSearchPopup();

        if (item.url.startsWith("#")) {
          const popup = document.getElementById("login-popup");
          if (popup) {
            popup.style.display = "flex";
            console.log("Showing login popup:", item.url);
          } else {
            console.error(
              "Login popup (#login-popup) not found in DOM. Ensure #sign-in-placeholder is transformed by sign-in.js."
            );
          }
          if (item.postLoginUrl) {
            setTimeout(() => {
              window.location.href = item.postLoginUrl;
              console.log("Redirecting to post-login URL:", item.postLoginUrl);
            }, 1000);
          }
        } else {
          window.location.href = item.url;
          console.log("Redirecting to:", item.url);
        }
      }

      const mainInput = document.querySelector("#search-form .search-input");
      const mainForm = document.querySelector("#search-form");
      const mainSuggestions = document.querySelector("#suggestions");
      console.log("Main search elements:", {
        mainInput: !!mainInput,
        mainForm: !!mainForm,
        mainSuggestions: !!mainSuggestions,
      });
      if (mainInput && mainForm && mainSuggestions) {
        setupSearch(mainInput, mainForm, mainSuggestions);
      } else {
        console.error("Main search elements missing:", {
          mainInput: !!mainInput,
          mainForm: !!mainForm,
          mainSuggestions: !!mainSuggestions,
        });
      }

      const popupInput = document.querySelector(
        "#popup-search-form .search-input"
      );
      const popupForm = document.querySelector("#popup-search-form");
      let popupSuggestions = document.querySelector("#popup-suggestions");
      console.log("Popup search elements:", {
        popupInput: !!popupInput,
        popupForm: !!popupForm,
        popupSuggestions: !!popupSuggestions,
      });
      if (!popupSuggestions) {
        console.warn("Popup suggestions div missing, creating one");
        popupSuggestions = document.createElement("div");
        popupSuggestions.id = "popup-suggestions";
        popupSuggestions.classList.add("search-suggestions");
        popupForm.appendChild(popupSuggestions);
      }
      if (popupInput && popupForm && popupSuggestions) {
        setupSearch(popupInput, popupForm, popupSuggestions);
      } else {
        console.error("Popup search elements missing:", {
          popupInput: !!popupInput,
          popupForm: !!popupForm,
          popupSuggestions: !!popupSuggestions,
        });
      }

      const searchSvgElement = document.querySelector(".search-svg");
      if (searchSvgElement) {
        searchSvgElement.addEventListener("click", () => {
          console.log("Search SVG clicked, opening popup");
          const searchPopup = document.getElementById("search-popup");
          if (searchPopup && isSmallScreen()) {
            searchPopup.style.display = "flex";
            hideSearchSvg();
          } else if (!searchPopup) {
            console.error("Search popup element not found");
          } else {
            console.log("Search SVG click ignored (large screen)");
          }
        });
      } else {
        console.error("Search SVG element not found on page load");
      }

      const searchPopupElement = document.getElementById("search-popup");
      if (searchPopupElement) {
        searchPopupElement.addEventListener("click", (e) => {
          if (e.target === searchPopupElement) {
            console.log("Search popup closed via background click");
            closeSearchPopup();
          }
        });
      } else {
        console.error("Search popup element not found for click event");
      }

      showSearchSvg();

      const mediaQuery = window.matchMedia("(max-width: 950px)");
      mediaQuery.addEventListener("change", () => {
        console.log("Screen size changed, updating search SVG");
        showSearchSvg();
      });
    })
    .catch((error) => {
      console.error("Error loading navbar:", error);
    });
});
