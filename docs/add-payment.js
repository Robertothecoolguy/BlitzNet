document.addEventListener("DOMContentLoaded", function () {
  const creditCardWrapper = document.querySelector(".credit-card-layout");
  const body = creditCardWrapper.parentNode;

  const bankWrapper = document.createElement("div");
  const googlePayWrapper = document.createElement("div");
  const applePayWrapper = document.createElement("div");

  bankWrapper.className = "wrapper bank-layout";
  bankWrapper.innerHTML = `

      <h2>Add Payment Method</h2>
    
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
        <button class="pay-now-button" type="submit">Add & Turn On Autopay</button>

  `;

  googlePayWrapper.className = "wrapper google-pay-layout";
  googlePayWrapper.innerHTML = `
   
      <h2>Add Payment Method</h2>

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
    Add with
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/2560px-Google_Pay_Logo.svg.png">
          </span>
        </a>
        <button class="pay-now-button" type="submit">Add & Turn On Autopay</button>
  `;

  applePayWrapper.className = "wrapper apple-pay-layout";
  applePayWrapper.innerHTML = `

      <h2>Add Payment Method</h2>

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
    Add with
            <img class="apple" src="https://banner2.cleanpng.com/20180403/dww/avhobgfm3.webp">
          </span>
        </a>
        <button class="pay-now-button" type="submit">Add & Turn On Autopay</button>
   
  `;

  body.insertBefore(bankWrapper, creditCardWrapper.nextSibling);
  body.insertBefore(googlePayWrapper, bankWrapper.nextSibling);
  body.insertBefore(applePayWrapper, googlePayWrapper.nextSibling);

  const savedMethod = localStorage.getItem("paymentMethod") || "credit";
  const savedCreditData =
    JSON.parse(localStorage.getItem("creditCardData")) || {};
  const savedBankData = JSON.parse(localStorage.getItem("bankData")) || {};

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
    creditCardWrapper.classList.remove("active");
    bankWrapper.classList.remove("active");
    googlePayWrapper.classList.remove("active");
    applePayWrapper.classList.remove("active");
  }

  function setupRadioButtons(wrapper) {
    const radioButtons = wrapper.querySelectorAll(".radio");
    radioButtons.forEach((radio) => {
      const label = radio.nextElementSibling;

      label.addEventListener("click", function () {
        document.querySelectorAll("label").forEach((l) => {
          l.classList.remove("radio-label-active");
        });

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

  setupRadioButtons(creditCardWrapper);
  setupRadioButtons(bankWrapper);
  setupRadioButtons(googlePayWrapper);
  setupRadioButtons(applePayWrapper);

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
