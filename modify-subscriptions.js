document.addEventListener("DOMContentLoaded", () => {
  function handleSubscription(containerSelector, type) {
    const container = document.querySelector(containerSelector);
    const storageKey = `${type}Subscriptions`;

    loadSavedState(container, type, storageKey);

    container.addEventListener("click", (e) => {
      // Pause button handling
      if (
        e.target.classList.contains("bi-pause-btn-fill") ||
        e.target.classList.contains("bi-pause-circle")
      ) {
        const subSet = e.target.closest(".sub-set");
        const content = subSet.querySelector(".sub-set-content");
        const owner = content
          .querySelector("p:nth-child(2)")
          .textContent.split(" (")[0];

        if (!subSet.classList.contains("paused")) {
          subSet.classList.add("paused");
          const overlay = document.createElement("div");
          overlay.className =
            type === "modem"
              ? "sub-set-turn-on-modem"
              : "sub-set-turn-on-phone";
          overlay.innerHTML = `
            <div class="${type === "modem" ? "on-modem" : "on-phone"}">
              <p>Turn on ${
                type === "modem" ? "subscription" : "line"
              } for ${owner}</p>
              <p><i class="bi bi-${
                type === "modem" ? "play-btn-fill" : "arrow-up-circle"
              }"></i></p>
            </div>
          `;
          subSet.appendChild(overlay);
          saveState(container, storageKey);
        }
      }

      // Turn on button handling
      if (
        e.target.classList.contains("bi-play-btn-fill") || // Updated from bi-arrow-up-square-fill
        e.target.classList.contains("bi-arrow-up-circle")
      ) {
        const subSet = e.target.closest(".sub-set");
        const overlay = subSet.querySelector(
          ".sub-set-turn-on-modem, .sub-set-turn-on-phone"
        );
        subSet.classList.remove("paused");
        if (overlay) overlay.remove();
        saveState(container, storageKey);
      }

      // Cancel handling
      if (
        e.target.classList.contains("cancel") ||
        e.target.classList.contains("bi-x")
      ) {
        const subSet = e.target.closest(".sub-set");
        const content = subSet.querySelector(".sub-set-content");
        const owner = content
          .querySelector("p:nth-child(2)")
          .textContent.split(" (")[0];
        const detail = content
          .querySelector("p:nth-child(3)")
          .textContent.split(" (")[0];

        const subSetAdd = document.createElement("div");
        subSetAdd.className = "sub-set-add";
        subSetAdd.innerHTML = `
          <p>Add back ${owner}'s ${
          type === "modem" ? "modem" : "line"
        } (${detail}) to the ${
          type === "modem" ? "subscription" : "data plan"
        }?</p>
          <p><button class="add">Add</button></p>
        `;

        subSet.remove();
        container.querySelector(".customer-container").appendChild(subSetAdd);
        reorderSubSets(container);
        saveState(container, storageKey);
      }

      // Add handling
      if (e.target.className === "add") {
        const subSetAdd = e.target.closest(".sub-set-add");
        const text = subSetAdd.querySelector("p:first-child").textContent;
        const ownerMatch = text.match(/Add back (.*?)'s/);
        const detailMatch = text.match(/\((.*?)\)/);

        if (ownerMatch && detailMatch) {
          const owner = ownerMatch[1];
          const detail = detailMatch[1];

          const subSet = document.createElement("div");
          subSet.className = "sub-set";
          subSet.innerHTML = `
            <div class="sub-set-content">
              <p>1</p>
              <p>${owner}${
            type === "modem"
              ? ' <span class="span-wifi change-owner">(change)</span>'
              : ""
          }</p>
              <p>${detail}${
            type === "modem"
              ? ' <span class="span-wifi change-wifi">(change name)</span>'
              : ""
          }</p>
              <p><i class="bi bi-pause-${
                type === "modem" ? "btn-fill" : "circle"
              }"></i></p>
              <p>${
                type === "modem"
                  ? '<button class="cancel">Cancel</button>'
                  : '<i class="bi bi-x"></i>'
              }</p>
            </div>
          `;

          subSetAdd.remove();
          const customerContainer = container.querySelector(
            ".customer-container"
          );
          customerContainer.insertBefore(subSet, customerContainer.firstChild);
          reorderSubSets(container);
          saveState(container, storageKey);
        }
      }

      // Change owner handling
      if (e.target.classList.contains("change-owner")) {
        const subSet = e.target.closest(".sub-set");
        const content = subSet.querySelector(".sub-set-content");
        const ownerP = content.querySelector("p:nth-child(2)");
        const currentOwner = ownerP.textContent.split(" (")[0];
        const newOwner = prompt("Enter new owner name:", currentOwner);
        if (newOwner && newOwner.trim()) {
          ownerP.innerHTML = `${newOwner} <span class="span-wifi change-owner">(change)</span>`;
          saveState(container, storageKey);
        }
      }

      // Change wifi handling
      if (e.target.classList.contains("change-wifi")) {
        const subSet = e.target.closest(".sub-set");
        const content = subSet.querySelector(".sub-set-content");
        const wifiP = content.querySelector("p:nth-child(3)");
        const currentWifi = wifiP.textContent.split(" (")[0];
        const newWifi = prompt("Enter new WiFi name:", currentWifi);
        if (newWifi && newWifi.trim()) {
          wifiP.innerHTML = `${newWifi} <span class="span-wifi change-wifi">(change name)</span>`;
          saveState(container, storageKey);
        }
      }
    });
  }

  function reorderSubSets(container) {
    const subSets = container.querySelectorAll(".sub-set");
    subSets.forEach((subSet, index) => {
      subSet.querySelector(".sub-set-content p:first-child").textContent =
        index + 1;
    });
  }

  function saveState(container, storageKey) {
    const customerContainer = container.querySelector(".customer-container");
    const items = Array.from(customerContainer.children).map((item) => {
      if (item.classList.contains("sub-set")) {
        const content = item.querySelector(".sub-set-content");
        return {
          type: "sub-set",
          owner: content
            .querySelector("p:nth-child(2)")
            .textContent.split(" (")[0],
          detail: content
            .querySelector("p:nth-child(3)")
            .textContent.split(" (")[0],
          paused: item.classList.contains("paused"),
        };
      } else if (item.classList.contains("sub-set-add")) {
        return {
          type: "sub-set-add",
          text: item.querySelector("p:first-child").textContent,
        };
      }
    });
    localStorage.setItem(storageKey, JSON.stringify(items));
  }

  function loadSavedState(container, type, storageKey) {
    const savedItems = localStorage.getItem(storageKey);
    const customerContainer = container.querySelector(".customer-container");

    if (savedItems) {
      const items = JSON.parse(savedItems);
      customerContainer.innerHTML = "";

      items.forEach((item, index) => {
        const element = document.createElement("div");
        if (item.type === "sub-set") {
          element.className = `sub-set${item.paused ? " paused" : ""}`;
          element.innerHTML = `
            <div class="sub-set-content">
              <p>${index + 1}</p>
              <p>${item.owner}${
            type === "modem"
              ? ' <span class="span-wifi change-owner">(change)</span>'
              : ""
          }</p>
              <p>${item.detail}${
            type === "modem"
              ? ' <span class="span-wifi change-wifi">(change name)</span>'
              : ""
          }</p>
              <p><i class="bi bi-pause-${
                type === "modem" ? "btn-fill" : "circle"
              }"></i></p>
              <p>${
                type === "modem"
                  ? '<button class="cancel">Cancel</button>'
                  : '<i class="bi bi-x"></i>'
              }</p>
            </div>
          `;

          if (item.paused) {
            const overlay = document.createElement("div");
            overlay.className =
              type === "modem"
                ? "sub-set-turn-on-modem"
                : "sub-set-turn-on-phone";
            overlay.innerHTML = `
              <div class="${type === "modem" ? "on-modem" : "on-phone"}">
                <p>Turn on ${type === "modem" ? "subscription" : "line"}for ${
              item.owner
            }</p>
                <p><i class="bi bi-${
                  type === "modem" ? "play-btn-fill" : "arrow-up-circle"
                }"></i></p>
              </div>
            `;
            element.appendChild(overlay);
          }
          customerContainer.appendChild(element);
        } else if (item.type === "sub-set-add") {
          element.className = "sub-set-add";
          element.innerHTML = `<p>${item.text}</p><p><button class="add">Add</button></p>`;
          customerContainer.appendChild(element);
        }
      });
    }
  }

  // Cart functionality
  let cartItems = new Set(JSON.parse(localStorage.getItem("cartItems")) || []);

  function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify([...cartItems]));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  const addModemButton = document.querySelector(".add-member-box-2");
  if (addModemButton) {
    addModemButton.addEventListener("click", () => {
      const productId = "1";
      if (cartItems.has(productId)) {
        alert("Open your cart to see if you want to add more modems");
      } else {
        cartItems.add(productId);
        saveCart();
        alert("Modem added to cart");
      }
    });
  }

  const addPhoneButton = document.querySelector(".add-member-box .add-button");
  if (addPhoneButton) {
    addPhoneButton.addEventListener("click", () => {
      const productId = "2";
      if (cartItems.has(productId)) {
        alert("Open your cart to see if you want to add more lines");
      } else {
        cartItems.add(productId);
        saveCart();
        alert("Line added to cart");
      }
    });
  }

  window.addEventListener("cartUpdated", () => {
    cartItems = new Set(JSON.parse(localStorage.getItem("cartItems")) || []);
  });

  // Initialize subscriptions
  handleSubscription(".modem.sub", "modem");
  handleSubscription(".phone.sub", "phone");
});
