// Password Toggle
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePassword.textContent = type === "password" ? "👁" : "🙈";
});

// Dark Mode
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  darkToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀";
});

// Signup Form Validation
const form = document.getElementById("signupForm");
const errorDiv = document.getElementById("formError");

form.addEventListener("submit", (e) => {
  errorDiv.textContent = "";
  const email = form.email.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;
  const aadhar = form.aadhar.value.trim();

  if (!email.includes("@")) {
    e.preventDefault();
    errorDiv.textContent = "Please enter a valid email.";
  } else if (password.length <= 5) {
    e.preventDefault();
    errorDiv.textContent = "Password must be at least 5 characters.";
  } else if (password !== confirmPassword) {
    e.preventDefault();
    errorDiv.textContent = "Passwords do not match.";
  } else if (!/^\d{12}$/.test(aadhar)) {
    e.preventDefault();
    errorDiv.textContent = "Enter a valid 12-digit Aadhar number.";
  }
});