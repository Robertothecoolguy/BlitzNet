const productTemplates = {
  1: `
    <div class="order-product-container" data-product-id="1">
      <div class="img-product-container">
        <img class="order-product-img" src="/Layer 1.svg" alt="BlitzNet Modem">
      </div>
      <div class="order-product-text">
        <h3 class="order-product-name">BlitzNet Modem & Home Internet</h3>
        <h2 class="productnqty-price">$90 one-time payment</h2>
        <h3 class="sub-price">$30/month <span class="span-1">subscription</span></h3>
        <div class="quantity-controls">
          <label for="quantity-1">Quantity:</label>
          <div class="quantity-box">
            <button class="qty-decrease">-</button>
            <span class="quantity">1</span>
            <button class="qty-increase">+</button>
          </div>
        </div>
      </div>
      <img class="order-product-delete" src="/close-button.svg" alt="Remove">
    </div>
  `,
  2: `
    <div class="order-product-container-2" data-product-id="2">
      <div class="img-product-container">
        <img class="order-product-img" src="/image 1.png" alt="Global Cellular">
      </div>
      <div class="order-product-text">
        <h3 class="order-product-name">Global Cellular Data</h3>
        <h2 class="sub-price-cell">$30/month <span class="span-2">subscription</span></h2>
        <h3 class="add-sub-price">$20/month additional lines</h3>
        <div class="quantity-controls">
          <label for="quantity-2">Lines:</label>
          <div class="quantity-box">
            <button class="qty-decrease">-</button>
            <span class="quantity">1</span>
            <button class="qty-increase">+</button>
          </div>
        </div>
      </div>
      <img class="order-product-delete" src="/close-button.svg" alt="Remove">
    </div>
  `,
};

const productPricing = {
  1: { oneTime: 90, monthly: 30 },
  2: { oneTime: 0, monthly: 30, additionalLine: 20 },
};

let productQuantities = { 1: 1, 2: 1 };

function updatePriceDetails(cartItems) {
  const totalProductPriceEl = document.querySelector(".total-product-price");
  const totalSubscriptionsEl = document.querySelector(".total-subscriptions");
  const totalSavingsEl = document.querySelector(".total-savings");
  const orderTotalEl = document.querySelector(".order-total");

  if (
    !totalProductPriceEl ||
    !totalSubscriptionsEl ||
    !totalSavingsEl ||
    !orderTotalEl
  ) {
    console.error("Price detail elements not found in DOM");
    return;
  }

  let totalOneTime = 0;
  let totalMonthly = 0;
  let totalSavings = 0;

  cartItems.forEach((productId) => {
    const pricing = productPricing[productId];
    const qty = productQuantities[productId] || 1;

    if (pricing) {
      totalOneTime += pricing.oneTime * qty;
      if (productId === "1") {
        totalMonthly += pricing.monthly * qty;
      } else if (productId === "2") {
        totalMonthly += pricing.monthly;
        if (qty > 1) totalMonthly += pricing.additionalLine * (qty - 1);
      }
    }
  });

  if (cartItems.size === 2) totalSavings = 20;

  totalProductPriceEl.textContent = "$" + totalOneTime;
  totalSubscriptionsEl.textContent = "$" + totalMonthly + "/month";
  totalSavingsEl.textContent = "$" + totalSavings;
  orderTotalEl.textContent = "$" + (totalOneTime + totalMonthly - totalSavings);
}

function renderCartItems() {
  const orderContainer = document.getElementById("order-container");
  if (!orderContainer) {
    console.error("Order container not found in DOM");
    return;
  }

  let cartItems;
  try {
    const storedItems = localStorage.getItem("cartItems");
    cartItems = new Set(storedItems ? JSON.parse(storedItems) : []);
    const storedQuantities = localStorage.getItem("productQuantities");
    productQuantities = storedQuantities
      ? JSON.parse(storedQuantities)
      : { 1: 1, 2: 1 };
    console.log(
      "Cart items:",
      [...cartItems],
      "Quantities:",
      productQuantities
    );
  } catch (e) {
    console.error("Error parsing cart items:", e);
    cartItems = new Set();
    productQuantities = { 1: 1, 2: 1 };
  }

  orderContainer.innerHTML = "";

  cartItems.forEach((productId) => {
    if (productTemplates[productId]) {
      orderContainer.innerHTML += productTemplates[productId];
      const container = orderContainer.querySelector(
        `[data-product-id="${productId}"]`
      );
      if (container) {
        const qtyElement = container.querySelector(".quantity");
        if (qtyElement)
          qtyElement.textContent = productQuantities[productId] || 1;
      } else {
        console.error(`Container for product ${productId} not found`);
      }
    } else {
      console.error(`No template for product ${productId}`);
    }
  });

  updatePriceDetails(cartItems);

  document.querySelectorAll(".qty-increase").forEach((button) => {
    button.addEventListener("click", () => {
      const container = button.closest(
        ".order-product-container, .order-product-container-2"
      );
      if (container) {
        const productId = container.getAttribute("data-product-id");
        productQuantities[productId] = (productQuantities[productId] || 1) + 1;
        localStorage.setItem(
          "productQuantities",
          JSON.stringify(productQuantities)
        );
        console.log(
          `Increased quantity for ${productId} to ${productQuantities[productId]}`
        );
        renderCartItems();
      }
    });
  });

  document.querySelectorAll(".qty-decrease").forEach((button) => {
    button.addEventListener("click", () => {
      const container = button.closest(
        ".order-product-container, .order-product-container-2"
      );
      if (container) {
        const productId = container.getAttribute("data-product-id");
        if (productQuantities[productId] > 1) {
          productQuantities[productId]--;
          localStorage.setItem(
            "productQuantities",
            JSON.stringify(productQuantities)
          );
          console.log(
            `Decreased quantity for ${productId} to ${productQuantities[productId]}`
          );
          renderCartItems();
        }
      }
    });
  });

  document.querySelectorAll(".order-product-delete").forEach((button) => {
    button.addEventListener("click", () => {
      const container = button.closest(
        ".order-product-container, .order-product-container-2"
      );
      if (container) {
        const productId = container.getAttribute("data-product-id");
        cartItems.delete(productId);
        delete productQuantities[productId];
        localStorage.setItem("cartItems", JSON.stringify([...cartItems]));
        localStorage.setItem(
          "productQuantities",
          JSON.stringify(productQuantities)
        );
        console.log(`Deleted product ${productId}, new cart:`, [...cartItems]);
        renderCartItems();
        window.dispatchEvent(new Event("cartUpdated"));
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
});

window.addEventListener("cartUpdated", () => {
  renderCartItems();
});

let intervalId = null;
function startPolling() {
  if (!intervalId) intervalId = setInterval(renderCartItems, 1000);
}
startPolling();

window.addEventListener("unload", () => {
  if (intervalId) clearInterval(intervalId);
});
