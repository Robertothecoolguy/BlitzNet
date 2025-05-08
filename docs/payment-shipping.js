document.addEventListener("DOMContentLoaded", function () {
  const creditCardWrapper = document.querySelector(
    ".wrapper.credit-card-layout"
  );
  if (!creditCardWrapper) {
    console.error(
      "Credit card wrapper (.wrapper.credit-card-layout) not found in DOM! Check HTML class or ID."
    );
    return;
  }
  const body = creditCardWrapper.parentNode;
  console.log("Credit card wrapper found:", creditCardWrapper);

  const bankWrapper = document.createElement("form");
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
        <input type="radio" class="radio" id="bb3" checked />
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
        <input type="text" class="name" placeholder="Bank Name" required />
        <i class="bi bi-bank2"></i>
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

  const googlePayWrapper = document.createElement("form");
  googlePayWrapper.className = "wrapper google-pay-layout";
  googlePayWrapper.innerHTML = `
    <h2>Payment and Shipping</h2>
    <div class="input-group payment-details">
      <div class="input-box">
        <h4>Payment Details</h4>
        <input type="radio" class="radio" id="bg1" />
        <label for="bg1"><span><i class="bi2 bi-credit-card-2-back-fill"></i>Credit Card</span></label>
        <input type="radio" class="radio" id="bg2" checked />
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
        <img src="https:
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

  const applePayWrapper = document.createElement("form");
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
        <input type="radio" class="radio" id="ba4" checked />
        <label for="ba4"><span><i class="bi2 bi-apple"></i>Pay</span></label>
      </div>
    </div>
    <a class="google-pay-button button-41">
      <span class="text">
        Buy with
        <img class="apple" src="https:
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

  try {
    body.appendChild(bankWrapper);
    body.appendChild(googlePayWrapper);
    body.appendChild(applePayWrapper);
    console.log(
      "Appended wrappers. Total .wrapper elements:",
      document.querySelectorAll(".wrapper").length
    );
  } catch (e) {
    console.error("Error appending wrappers:", e);
  }

  const savedMethod = localStorage.getItem("paymentMethod") || "credit";
  const savedCreditData = JSON.parse(
    localStorage.getItem("creditCardData") || "{}"
  );
  const savedBankData = JSON.parse(localStorage.getItem("bankData") || "{}");

  function clearForm(wrapper) {
    const inputs = wrapper.querySelectorAll("input:not(.radio)");
    inputs.forEach((input) => (input.value = ""));
  }

  function saveFormData(wrapper, storageKey) {
    const inputs = wrapper.querySelectorAll("input:not(.radio)");
    const data = {};
    inputs.forEach((input) => {
      data[input.placeholder] = input.value;
    });
    localStorage.setItem(storageKey, JSON.stringify(data));
  }

  function loadFormData(wrapper, data) {
    const inputs = wrapper.querySelectorAll("input:not(.radio)");
    inputs.forEach((input) => {
      if (data[input.placeholder]) {
        input.value = data[input.placeholder];
      }
    });
  }

  function hideAllWrappers() {
    const wrappers = document.querySelectorAll(".wrapper");
    if (wrappers.length === 0) {
      console.error("No .wrapper elements found to hide! Check DOM.");
    }
    wrappers.forEach((wrapper) => wrapper.classList.remove("active"));
  }

  function setupRadioButtons(wrapper, method) {
    const radioButtons = wrapper.querySelectorAll(".radio");
    if (radioButtons.length === 0) {
      console.warn(`No radio buttons found in ${method} wrapper`);
    }
    radioButtons.forEach((radio) => {
      const label = radio.nextElementSibling;
      label.addEventListener("click", function () {
        document
          .querySelectorAll("label")
          .forEach((l) => l.classList.remove("radio-label-active"));
        label.classList.add("radio-label-active");

        if (radio.id.endsWith("1")) {
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

  try {
    setupRadioButtons(creditCardWrapper, "credit");
    setupRadioButtons(bankWrapper, "bank");
    setupRadioButtons(googlePayWrapper, "google");
    setupRadioButtons(applePayWrapper, "apple");
    console.log("Radio buttons set up for all wrappers");
  } catch (e) {
    console.error("Error setting up radio buttons:", e);
  }

  hideAllWrappers();
  try {
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
    console.log("Active wrapper set to:", savedMethod);
  } catch (e) {
    console.error("Error setting active wrapper:", e);
  }

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

  const productPricing = {
    1: { oneTime: 90, monthly: 30 },
    2: { oneTime: 0, monthly: 30, additionalLine: 20 },
  };

  function updatePriceDetails() {
    const wrappers = document.querySelectorAll(".wrapper");
    if (wrappers.length === 0) {
      console.error("No .wrapper elements found for price update! Check DOM.");
      return;
    }

    let cartItems;
    try {
      cartItems = new Set(
        JSON.parse(localStorage.getItem("cartItems") || "[]")
      );
      console.log("Cart items for price update:", [...cartItems]);
    } catch (e) {
      console.error("Error parsing cartItems:", e);
      cartItems = new Set();
    }

    let productQuantities;
    try {
      productQuantities = JSON.parse(
        localStorage.getItem("productQuantities") || "{'1': 1, '2': 1}"
      );
      console.log("Product quantities for price update:", productQuantities);
    } catch (e) {
      console.error("Error parsing productQuantities:", e);
      productQuantities = { 1: 1, 2: 1 };
    }

    let totalOneTime = 0;
    let totalMonthly = 0;
    let totalSavings = 0;

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

    wrappers.forEach((wrapper) => {
      const totalProductPriceEl = wrapper.querySelector(".total-product-price");
      const totalSubscriptionsEl = wrapper.querySelector(
        ".total-subscriptions"
      );
      const totalSavingsEl = wrapper.querySelector(".total-savings");
      const orderTotalEl = wrapper.querySelector(".order-total");

      if (
        !totalProductPriceEl ||
        !totalSubscriptionsEl ||
        !totalSavingsEl ||
        !orderTotalEl
      ) {
        console.error("Price elements missing in wrapper:", wrapper);
        return;
      }

      totalProductPriceEl.textContent = `$${totalOneTime}`;
      totalSubscriptionsEl.textContent = `$${totalMonthly}/month`;
      totalSavingsEl.textContent = `$${totalSavings}`;
      orderTotalEl.textContent = `$${
        totalOneTime + totalMonthly - totalSavings
      }`;
    });
  }

  try {
    updatePriceDetails();
    console.log("Initial price update completed");
  } catch (e) {
    console.error("Error during initial price update:", e);
  }
  window.addEventListener("cartUpdated", () => {
    console.log("cartUpdated event received, updating prices");
    updatePriceDetails();
  });
});
