// payment-shipping.js
document.addEventListener("DOMContentLoaded", function () {
  const creditCardWrapper = document.querySelector(".credit-card-layout");
  const body = creditCardWrapper.parentNode;

  // Create additional wrappers
  const bankWrapper = document.createElement("div");
  const googlePayWrapper = document.createElement("div");
  const applePayWrapper = document.createElement("div");

  // Bank wrapper HTML (keeping your existing bank layout)
  bankWrapper.className = "wrapper bank-layout";
  bankWrapper.innerHTML = `
    <h2>Payment and Shipping</h2>
    <h4>Account</h4>
    <div class="input-group">
      <div class="input-box">
        <input type="text" placeholder="Full Name" required class="name" />
        <i class="bi bi-person-fill"></i>
      </div>
    </div>
    <div class="input-group">
      <div class="input-box">
        <input type="text" placeholder="Address" required class="name" />
        <i class="bi bi-house-door-fill"></i>
      </div>
    </div>
    <div class="input-group">
      <div class="input-box">
        <input type="text" placeholder="City" required class="name" />
        <i class="bi bi-geo-alt-fill"></i>
      </div>
    </div>
    <div class="input-group payment-details">
      <div class="input-box">
        <h4>Payment Details</h4>
        <input type="radio" class="radio" id="bb1" />
        <label for="bb1"><span><i class="bi2 bi-credit-card-2-back-fill"></i>Credit Card</span></label>
        <input type="radio" class="radio" id="bb2" />
        <label for="bb2"><span><i class="bi2 bi-google"></i>Pay</span></label>
        <input type="radio" class="radio" id="bb3" />
        <label for="bb3"><span><i class="bi2 bi-bank2"></i>Bank</span></label>
        <input type="radio" class="radio" id="bb4" />
        <label for="bb4"><span><i class="bi2 bi-apple"></i>Pay</span></label>
      </div>
    </div>
    <div class="input-group">
      <div class="input-box">
        <input type="tel" class="name" placeholder="Account Number" required />
        <i class="bi bi-credit-card-2-back"></i>
      </div>
    </div>
    <div class="input-group">
      <div class="input-box">
        <input type="tel" class="name" placeholder="Routing Number" required />
        <i class="bi bi-credit-card-2-front-fill"></i>
      </div>
    </div>
    <div class="input-group">
      <div class="input-box">
        <input type="number" class="name" placeholder="Bank Name" required />
        <i class="bi bi-calendar3"></i>
      </div>
    </div>
    <div class="price-wrapper">
      <div class="price-nav">
        <a href="/my-orders.html">Modify order</a>
        <h2 class="price-details-title">Price Details</h2>
      </div>
      <div class="price-details">
        <div class="total-product-container">
          <p class="total-product-price-title">Total Product Price</p>
          <p class="total-product-price">$0</p>
        </div>
        <div class="total-sub-container">
          <div class="total-subscriptions-title">Total Subscriptions</div>
          <div class="total-subscriptions">$0/month</div>
        </div>
        <div class="total-savings-container">
          <p class="total-savings-title">Bundle Savings</p>
          <p class="total-savings">$0</p>
        </div>
        <div class="shipping-container">
          <p class="shipping-title">Shipping</p>
          <p class="shipping">$0</p>
        </div>
        <div class="total-order-container">
          <h2 class="order-total-title">Order Total</h2>
          <h2 class="order-total">$0</h2>
        </div>
        <div class="month-starts">(month starts when activated)</div>
      </div>
      <button class="pay-now-button" type="submit">Pay Now</button>
    </div>
  `;

  // Google Pay wrapper HTML
  googlePayWrapper.className = "wrapper google-pay-layout";
  googlePayWrapper.innerHTML = `
    <h2>Payment and Shipping</h2>
    <div class="input-group payment-details">
      <div class="input-box">
        <h4>Payment Details</h4>
        <input type="radio" class="radio" id="bg1" />
        <label for="bg1"><span><i class="bi2 bi-credit-card-2-back-fill"></i>Credit Card</span></label>
        <input type="radio" class="radio" id="bg2" />
        <label for="bg2"><span><i class="bi2 bi-google"></i>Pay</span></label>
        <input type="radio" class="radio" id="bg3" />
        <label for="bg3"><span><i class="bi2 bi-bank2"></i>Bank</span></label>
        <input type="radio" class="radio" id="bg4" />
        <label for="bg4"><span><i class="bi2 bi-apple"></i>Pay</span></label>
      </div>
    </div>
    <a class="google-pay-button button-41">
      <span class="text">
        Buy with
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/1200px-Google_Pay_Logo.svg.png" alt="Google Pay" />
      </span>
    </a>
    <div class="price-wrapper">
      <div class="price-nav">
        <a href="/my-orders.html">Modify order</a>
        <h2 class="price-details-title">Price Details</h2>
      </div>
      <div class="price-details">
        <div class="total-product-container">
          <p class="total-product-price-title">Total Product Price</p>
          <p class="total-product-price">$0</p>
        </div>
        <div class="total-sub-container">
          <div class="total-subscriptions-title">Total Subscriptions</div>
          <div class="total-subscriptions">$0/month</div>
        </div>
        <div class="total-savings-container">
          <p class="total-savings-title">Bundle Savings</p>
          <p class="total-savings">$0</p>
        </div>
        <div class="shipping-container">
          <p class="shipping-title">Shipping</p>
          <p class="shipping">$0</p>
        </div>
        <div class="total-order-container">
          <h2 class="order-total-title">Order Total</h2>
          <h2 class="order-total">$0</h2>
        </div>
        <div class="month-starts">(month starts when activated)</div>
      </div>
      <button class="pay-now-button" type="submit">Pay Now</button>
    </div>
  `;

  // Apple Pay wrapper HTML
  applePayWrapper.className = "wrapper apple-pay-layout";
  applePayWrapper.innerHTML = `
    <h2>Payment and Shipping</h2>
    <div class="input-group payment-details">
      <div class="input-box">
        <h4>Payment Details</h4>
        <input type="radio" class="radio" id="ba1" />
        <label for="ba1"><span><i class="bi2 bi-credit-card-2-back-fill"></i>Credit Card</span></label>
        <input type="radio" class="radio" id="ba2" />
        <label for="ba2"><span><i class="bi2 bi-google"></i>Pay</span></label>
        <input type="radio" class="radio" id="ba3" />
        <label for="ba3"><span><i class="bi2 bi-bank2"></i>Bank</span></label>
        <input type="radio" class="radio" id="ba4" />
        <label for="ba4"><span><i class="bi2 bi-apple"></i>Pay</span></label>
      </div>
    </div>
    <a class="google-pay-button button-41">
      <span class="text">
        Buy with
        <img class="apple" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Apple_Pay_logo.svg/768px-Apple_Pay_logo.svg.png" alt="Apple Pay" />
      </span>
    </a>
    <div class="price-wrapper">
      <div class="price-nav">
        <a href="/my-orders.html">Modify order</a>
        <h2 class="price-details-title">Price Details</h2>
      </div>
      <div class="price-details">
        <div class="total-product-container">
          <p class="total-product-price-title">Total Product Price</p>
          <p class="total-product-price">$0</p>
        </div>
        <div class="total-sub-container">
          <div class="total-subscriptions-title">Total Subscriptions</div>
          <div class="total-subscriptions">$0/month</div>
        </div>
        <div class="total-savings-container">
          <p class="total-savings-title">Bundle Savings</p>
          <p class="total-savings">$0</p>
        </div>
        <div class="shipping-container">
          <p class="shipping-title">Shipping</p>
          <p class="shipping">$0</p>
        </div>
        <div class="total-order-container">
          <h2 class="order-total-title">Order Total</h2>
          <h2 class="order-total">$0</h2>
        </div>
        <div class="month-starts">(month starts when activated)</div>
      </div>
      <button class="pay-now-button" type="submit">Pay Now</button>
    </div>
  `;

  // Insert all wrappers
  body.insertBefore(bankWrapper, creditCardWrapper.nextSibling);
  body.insertBefore(googlePayWrapper, bankWrapper.nextSibling);
  body.insertBefore(applePayWrapper, googlePayWrapper.nextSibling);

  // Load saved state
  const savedMethod = localStorage.getItem("paymentMethod") || "credit";
  const savedCreditData =
    JSON.parse(localStorage.getItem("creditCardData")) || {};
  const savedBankData = JSON.parse(localStorage.getItem("bankData")) || {};

  // Function to clear form
  function clearForm(wrapper) {
    const inputs = wrapper.querySelectorAll("input:not(.radio)");
    inputs.forEach((input) => (input.value = ""));
  }

  // Function to save form data
  function saveFormData(wrapper, storageKey) {
    const inputs = wrapper.querySelectorAll("input:not(.radio)");
    const data = {};
    inputs.forEach((input) => {
      data[input.placeholder] = input.value;
    });
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  // Function to load form data
  function loadFormData(wrapper, data) {
    const inputs = wrapper.querySelectorAll("input:not(.radio)");
    inputs.forEach((input) => {
      if (data[input.placeholder]) {
        input.value = data[input.placeholder];
      }
    });
  }

  // Function to hide all wrappers
  function hideAllWrappers() {
    creditCardWrapper.classList.remove("active");
    bankWrapper.classList.remove("active");
    googlePayWrapper.classList.remove("active");
    applePayWrapper.classList.remove("active");
  }

  // Function to setup radio buttons
  function setupRadioButtons(wrapper, method) {
    const radioButtons = wrapper.querySelectorAll(".radio");
    radioButtons.forEach((radio) => {
      const label = radio.nextElementSibling;

      label.addEventListener("click", function () {
        // Remove active states from all labels
        document.querySelectorAll("label").forEach((l) => {
          l.classList.remove("radio-label-active");
        });

        // Add active state to clicked label
        label.classList.add("radio-label-active");

        // Handle different payment methods
        if (radio.id.endsWith("1")) {
          // Credit Card
          saveFormData(bankWrapper, "bankData");
          clearForm(bankWrapper);
          hideAllWrappers();
          creditCardWrapper.classList.add("active");
          loadFormData(creditCardWrapper, savedCreditData);
          localStorage.setItem("paymentMethod", "credit");
          document
            .querySelectorAll('label[for$="1"]')
            .forEach((l) => l.classList.add("radio-label-active"));
        } else if (radio.id.endsWith("2")) {
          // Google Pay
          saveFormData(bankWrapper, "bankData");
          saveFormData(creditCardWrapper, "creditCardData");
          clearForm(bankWrapper);
          clearForm(creditCardWrapper);
          hideAllWrappers();
          googlePayWrapper.classList.add("active");
          localStorage.setItem("paymentMethod", "google");
          document
            .querySelectorAll('label[for$="2"]')
            .forEach((l) => l.classList.add("radio-label-active"));
        } else if (radio.id.endsWith("3")) {
          // Bank
          saveFormData(creditCardWrapper, "creditCardData");
          clearForm(creditCardWrapper);
          hideAllWrappers();
          bankWrapper.classList.add("active");
          loadFormData(bankWrapper, savedBankData);
          localStorage.setItem("paymentMethod", "bank");
          document
            .querySelectorAll('label[for$="3"]')
            .forEach((l) => l.classList.add("radio-label-active"));
        } else if (radio.id.endsWith("4")) {
          // Apple Pay
          saveFormData(bankWrapper, "bankData");
          saveFormData(creditCardWrapper, "creditCardData");
          clearForm(bankWrapper);
          clearForm(creditCardWrapper);
          hideAllWrappers();
          applePayWrapper.classList.add("active");
          localStorage.setItem("paymentMethod", "apple");
          document
            .querySelectorAll('label[for$="4"]')
            .forEach((l) => l.classList.add("radio-label-active"));
        }
      });
    });
  }

  // Initialize all wrappers
  setupRadioButtons(creditCardWrapper, "credit");
  setupRadioButtons(bankWrapper, "bank");
  setupRadioButtons(googlePayWrapper, "google");
  setupRadioButtons(applePayWrapper, "apple");

  // Set initial state
  hideAllWrappers();
  switch (savedMethod) {
    case "bank":
      bankWrapper.classList.add("active");
      loadFormData(bankWrapper, savedBankData);
      document
        .querySelectorAll('label[for$="3"]')
        .forEach((l) => l.classList.add("radio-label-active"));
      break;
    case "google":
      googlePayWrapper.classList.add("active");
      document
        .querySelectorAll('label[for$="2"]')
        .forEach((l) => l.classList.add("radio-label-active"));
      break;
    case "apple":
      applePayWrapper.classList.add("active");
      document
        .querySelectorAll('label[for$="4"]')
        .forEach((l) => l.classList.add("radio-label-active"));
      break;
    default:
      creditCardWrapper.classList.add("active");
      loadFormData(creditCardWrapper, savedCreditData);
      document
        .querySelectorAll('label[for$="1"]')
        .forEach((l) => l.classList.add("radio-label-active"));
  }

  // Save form data on input
  [creditCardWrapper, bankWrapper].forEach((wrapper) => {
    wrapper.addEventListener("input", function (e) {
      if (
        e.target.classList.contains("name") ||
        e.target.type === "tel" ||
        e.target.type === "number"
      ) {
        const storageKey =
          wrapper === creditCardWrapper ? "creditCardData" : "bankData";
        saveFormData(wrapper, storageKey);
      }
    });
  });
});

// Keep your existing price calculation code
document.addEventListener("DOMContentLoaded", () => {
  const wrappers = document.querySelectorAll(".wrapper");
  const updatePriceDetails = () => {
    wrappers.forEach((wrapper) => {
      const totalProductPriceEl = wrapper.querySelector(".total-product-price");
      const totalSubscriptionsEl = wrapper.querySelector(
        ".total-subscriptions"
      );
      const totalSavingsEl = wrapper.querySelector(".total-savings");
      const orderTotalEl = wrapper.querySelector(".order-total");

      let totalOneTime = 0;
      let totalMonthly = 0;
      let totalSavings = 0;

      const cartItems = new Set(
        JSON.parse(localStorage.getItem("cartItems") || "[]")
      );
      const productQuantities = JSON.parse(
        localStorage.getItem("productQuantities") || "{'1': 1, '2': 1}"
      );
      const productPricing = {
        1: { oneTime: 90, monthly: 30 },
        2: { oneTime: 0, monthly: 30, additionalLine: 20 },
      };

      cartItems.forEach((productId) => {
        const pricing = productPricing[productId];
        const qty = productQuantities[productId] || 1;
        if (pricing) {
          totalOneTime += pricing.oneTime * qty;
          if (productId === "1") totalMonthly += pricing.monthly * qty;
          else if (productId === "2") {
            totalMonthly += pricing.monthly;
            if (qty > 1) totalMonthly += pricing.additionalLine * (qty - 1);
          }
        }
      });

      if (cartItems.size === 2) totalSavings = 20;

      totalProductPriceEl.textContent = "$" + totalOneTime;
      totalSubscriptionsEl.textContent = "$" + totalMonthly + "/month";
      totalSavingsEl.textContent = "$" + totalSavings;
      orderTotalEl.textContent =
        "$" + (totalOneTime + totalMonthly - totalSavings);
    });
  };

  updatePriceDetails();
  window.addEventListener("cartUpdated", updatePriceDetails);
});
