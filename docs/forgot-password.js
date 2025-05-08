const continueBtn = document.getElementById("continue-btn");
const hero = document.getElementById("hero");

const originalCredBox = `
    <div class="cred-box" id="cred-box">
      <div class="login-header2">
        <div class="first-line2">
          <header>Forgot Password?</header>
        </div>
        <p>Enter an email address or phone number associated with your account.</p>
      </div>
      <div class="sinput-box2">
        <input
          type="text"
          class="sinput-field2"
          id="email"
          autocomplete="off"
          required />
        <label for="email">Email or phone</label>
      </div>
      <div class="sinput-box2 sub-button2">
        <input
          type="submit"
          class="input-submit2"
          id="continue-btn"
          value="Continue" />
      </div>
    </div>
  `;

const showResetConfirmation = () => {
  hero.innerHTML = `
      <div class="login-header2 reset-1">
        <div class="first-line2">
          <header>Password reset instructions sent</header>
        </div>
        <p>Check your email address or phone you entered to continue.</p>
        <p class="login-p2">Didn't receive anything? <span class="try-again">(try again)</span></p>
      </div>
    `;

  const tryAgain = hero.querySelector(".try-again");
  tryAgain.addEventListener("click", () => {
    hero.innerHTML = originalCredBox;

    const newContinueBtn = hero.querySelector("#continue-btn");
    newContinueBtn.addEventListener("click", showResetConfirmation);
  });
};

continueBtn.addEventListener("click", showResetConfirmation);
