document.addEventListener("DOMContentLoaded", () => {
  function handleSubscription(containerSelector, type) {
    const container = document.querySelector(containerSelector);
    const storageKey = `${type}Subscriptions`;

    loadSavedState(container, type, storageKey);

    container.addEventListener("click", (e) => {
      // Handle pause/unpause
      if (
        e.target.classList.contains("bi-pause-btn-fill") ||
        e.target.classList.contains("bi-pause-circle")
      ) {
        console.log(`Pausing ${type} row`);
        const row = e.target.closest(".table-row");
        const ownerCell = row.querySelector("td:nth-child(2)");
        const owner = ownerCell.textContent.split(" (")[0];

        if (!row.classList.contains("paused")) {
          row.classList.add("paused");
          const overlay = document.createElement("tr");
          overlay.className =
            type === "modem"
              ? "sub-set-turn-on-modem"
              : "sub-set-turn-on-phone";
          overlay.innerHTML = `
            <td><i class="bi bi-${
              type === "modem" ? "play-btn-fill" : "arrow-up-circle"
            }"></i></td>
            <td><p>Turn on ${
              type === "modem" ? "subscription" : "line"
            } for ${owner}</p></td>
            <td></td>
            <td></td>
            <td></td>
          `;
          row.appendChild(overlay);
          saveState(container, storageKey);
        }
      }

      if (
        e.target.classList.contains("bi-play-btn-fill") ||
        e.target.classList.contains("bi-arrow-up-circle")
      ) {
        console.log(`Unpausing ${type} row`);
        const row = e.target.closest(".table-row");
        const overlay = row.querySelector(
          ".sub-set-turn-on-modem, .sub-set-turn-on-phone"
        );
        if (row && row.classList.contains("paused")) {
          row.classList.remove("paused");
          if (overlay) overlay.remove();
          saveState(container, storageKey);
        } else {
          console.warn("Row not found or not paused:", row);
        }
      }

      // Handle cancel
      if (
        e.target.classList.contains("cancel") ||
        e.target.classList.contains("bi-x")
      ) {
        console.log(`Canceling ${type} row`);
        const row = e.target.closest(".table-row");
        const owner = row
          .querySelector("td:nth-child(2)")
          .textContent.split(" (")[0];
        const detail = row
          .querySelector("td:nth-child(3)")
          .textContent.split(" (")[0];

        const subSetAdd = document.createElement("tr");
        subSetAdd.className = "sub-set-add";
        subSetAdd.innerHTML = `
          <td><button class="add">Add</button></td>
          <td colspan="4"><p>Add back ${owner}'s ${
          type === "modem" ? "modem" : "line"
        } (${detail}) to the ${
          type === "modem" ? "subscription" : "data plan"
        }?</p></td>
        `;

        row.remove();
        const tbody = container.querySelector(".subscription-table tbody");
        tbody.appendChild(subSetAdd);
        reorderRows(container);
        saveState(container, storageKey);
      }

      // Handle add back
      if (e.target.className === "add") {
        console.log(`Adding back ${type} row`);
        const subSetAdd = e.target.closest(".sub-set-add");
        const text = subSetAdd.querySelector("p").textContent.trim();
        console.log("Raw text:", text);

        // Improved regex to match owner and detail
        const ownerMatch = text.match(
          /^Add back (.+?)'s (modem|line) \((.*?)\) to the/
        );
        let owner, detail;

        if (ownerMatch) {
          owner = ownerMatch[1].trim(); // e.g., "Susan Baker"
          detail = ownerMatch[3].trim(); // e.g., "CafeConnect"
          console.log("Matched owner:", owner, "detail:", detail);
        } else {
          console.error("Regex failed to match, attempting fallback:", text);
          // Fallback: Split text manually
          const parts = text.split(" ");
          const ownerIndex = parts.indexOf("back") + 1;
          const detailStart = text.indexOf("(") + 1;
          const detailEnd = text.indexOf(")");
          if (
            ownerIndex > 0 &&
            detailStart > 0 &&
            detailEnd > detailStart &&
            (parts.includes("modem") || parts.includes("line"))
          ) {
            owner = parts
              .slice(ownerIndex, parts.indexOf("'s"))
              .join(" ")
              .trim();
            detail = text.slice(detailStart, detailEnd).trim();
            console.log("Fallback matched owner:", owner, "detail:", detail);
          } else {
            console.error("Fallback parsing failed:", text);
            alert("Failed to restore subscription. Please try again.");
            return; // Exit if parsing fails
          }
        }

        try {
          const row = document.createElement("tr");
          row.className = "table-row";
          row.innerHTML = `
            <td>1</td>
            <td>${owner}${
            type === "modem"
              ? ' <span class="span-wifi change-owner">(change)</span>'
              : ""
          }</td>
            <td>${detail}${
            type === "modem"
              ? ' <span class="span-wifi change-wifi">(change name)</span>'
              : ""
          }</td>
            <td><i class="bi bi-pause-${
              type === "modem" ? "btn-fill" : "circle"
            }"></i></td>
            <td>${
              type === "modem"
                ? '<button class="cancel">Cancel</button>'
                : '<i class="bi bi-x"></i>'
            }</td>
          `;
          console.log("Created row:", row.outerHTML);

          const tbody = container.querySelector(".subscription-table tbody");
          if (tbody) {
            console.log("Found tbody, inserting row");
            tbody.insertBefore(row, tbody.firstChild);
            console.log("Row inserted, removing sub-set-add");
            subSetAdd.remove();
            reorderRows(container);
            saveState(container, storageKey);
            console.log("Row added and state saved");
          } else {
            console.error("tbody not found in .subscription-table");
            alert("Error restoring subscription. Please refresh the page.");
          }
        } catch (error) {
          console.error("Error adding back row:", error);
          alert("Error restoring subscription. Please try again.");
        }
      }

      // Handle change owner
      if (e.target.classList.contains("change-owner")) {
        console.log(`Changing owner for ${type}`);
        const row = e.target.closest(".table-row");
        const ownerCell = row.querySelector("td:nth-child(2)");
        const currentOwner = ownerCell.textContent.split(" (")[0];
        const newOwner = prompt("Enter new owner name:", currentOwner);
        if (newOwner && newOwner.trim()) {
          ownerCell.innerHTML = `${newOwner} <span class="span-wifi change-owner">(change)</span>`;
          saveState(container, storageKey);
        }
      }

      // Handle change WiFi name
      if (e.target.classList.contains("change-wifi")) {
        console.log(`Changing WiFi name for ${type}`);
        const row = e.target.closest(".table-row");
        const wifiCell = row.querySelector("td:nth-child(3)");
        const currentWifi = wifiCell.textContent.split(" (")[0];
        const newWifi = prompt("Enter new WiFi name:", currentWifi);
        if (newWifi && newWifi.trim()) {
          wifiCell.innerHTML = `${newWifi} <span class="span-wifi change-wifi">(change name)</span>`;
          saveState(container, storageKey);
        }
      }
    });
  }

  function reorderRows(container) {
    const rows = container.querySelectorAll(".table-row");
    rows.forEach((row, index) => {
      const cell = row.querySelector("td:first-child");
      if (cell) cell.textContent = index + 1;
    });
  }

  function saveState(container, storageKey) {
    const tbody = container.querySelector(".subscription-table tbody");
    const items = Array.from(tbody.children)
      .map((child) => {
        if (child.classList.contains("table-row")) {
          return {
            type: "table-row",
            owner: child
              .querySelector("td:nth-child(2)")
              .textContent.split(" (")[0],
            detail: child
              .querySelector("td:nth-child(3)")
              .textContent.split(" (")[0],
            paused: child.classList.contains("paused"),
          };
        } else if (child.classList.contains("sub-set-add")) {
          return {
            type: "sub-set-add",
            text: child.querySelector("td:nth-child(2) p").textContent,
          };
        }
        return null;
      })
      .filter((item) => item);
    localStorage.setItem(storageKey, JSON.stringify(items));
  }

  function loadSavedState(container, type, storageKey) {
    const savedItems = localStorage.getItem(storageKey);
    const customerContainer = container.querySelector(".customer-container");

    if (savedItems) {
      try {
        const items = JSON.parse(savedItems);
        if (items && Array.isArray(items) && items.length > 0) {
          customerContainer.innerHTML = `<table class="subscription-table">
            <thead>
              <tr class="table-head">
                <th>#</th>
                <th>Owner</th>
                <th>${type === "modem" ? "WiFi Name" : "Phone"}</th>
                <th>Pause</th>
                <th>${
                  type === "modem" ? "Cancel Subscription" : "Cancel Line"
                }</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>`;

          const tbody = customerContainer.querySelector("tbody");

          items.forEach((item, index) => {
            if (item.type === "table-row") {
              const row = document.createElement("tr");
              row.className = `table-row${item.paused ? " paused" : ""}`;
              row.innerHTML = `
                <td>${index + 1}</td>
                <td>${item.owner}${
                type === "modem"
                  ? ' <span class="span-wifi change-owner">(change)</span>'
                  : ""
              }</td>
                <td>${item.detail}${
                type === "modem"
                  ? ' <span class="span-wifi change-wifi">(change name)</span>'
                  : ""
              }</td>
                <td><i class="bi bi-pause-${
                  type === "modem" ? "btn-fill" : "circle"
                }"></i></td>
                <td>${
                  type === "modem"
                    ? '<button class="cancel">Cancel</button>'
                    : '<i class="bi bi-x"></i>'
                }</td>
              `;

              if (item.paused) {
                const overlay = document.createElement("tr");
                overlay.className =
                  type === "modem"
                    ? "sub-set-turn-on-modem"
                    : "sub-set-turn-on-phone";
                overlay.innerHTML = `
                  <td><i class="bi bi-${
                    type === "modem" ? "play-btn-fill" : "arrow-up-circle"
                  }"></i></td>
                  <td><p>Turn on ${
                    type === "modem" ? "subscription" : "line"
                  } for ${item.owner}</p></td>
                  <td></td>
                  <td></td>
                  <td></td>
                `;
                row.appendChild(overlay);
              }
              tbody.appendChild(row);
            } else if (item.type === "sub-set-add") {
              const element = document.createElement("tr");
              element.className = "sub-set-add";
              element.innerHTML = `
                <td><button class="add">Add</button></td>
                <td colspan="4"><p>${item.text}</p></td>
              `;
              tbody.appendChild(element);
            }
          });
        }
      } catch (e) {
        console.error(`Failed to parse ${storageKey}:, e`);
      }
    }
  }

  let cartItems = new Set(JSON.parse(localStorage.getItem("cartItems")) || []);

  function saveCart() {
    localStorage.setItem("cartItems", JSON.stringify([...cartItems]));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  const addModemButton = document.querySelector(".add-member-box-2");
  if (addModemButton) {
    console.log("Modem button found, attaching listener");
    addModemButton.addEventListener("click", (e) => {
      console.log("Modem button clicked");
      const productId = "1";
      if (cartItems.has(productId)) {
        alert("Open your cart to see if you want to add more modems");
      } else {
        cartItems.add(productId);
        saveCart();
        alert("Modem added to cart");
      }
    });
  } else {
    console.warn("Modem button not found");
  }

  const addPhoneButton = document.querySelector(".add-member-box .add-button");
  if (addPhoneButton) {
    console.log("Phone button found, attaching listener");
    addPhoneButton.addEventListener("click", (e) => {
      console.log("Phone button clicked");
      const productId = "2";
      if (cartItems.has(productId)) {
        alert("Open your cart to see if you want to add more lines");
      } else {
        cartItems.add(productId);
        saveCart();
        alert("Line added to cart");
      }
    });
  } else {
    console.warn("Phone button not found");
  }

  window.addEventListener("cartUpdated", () => {
    cartItems = new Set(JSON.parse(localStorage.getItem("cartItems")) || []);
  });

  handleSubscription(".modem.sub", "modem");
  handleSubscription(".phone.sub", "phone");
});
