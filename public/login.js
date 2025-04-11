// Toggle password visibility
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");

togglePassword.addEventListener("click", () => {
  const type = passwordInput.type === "password" ? "text" : "password";
  passwordInput.type = type;
  togglePassword.textContent = type === "password" ? "👁" : "🙈";
});

// Dark mode toggle
const darkToggle = document.getElementById("darkToggle");

darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  darkToggle.textContent = document.body.classList.contains("light") ? "🌙" : "☀";
});

// Basic validation
const form = document.getElementById("loginForm");
const errorDiv = document.getElementById("formError");

form.addEventListener("submit", (e) => {
  errorDiv.textContent = "";
  const email = form.email.value.trim();
  const password = form.password.value;

  if (!email.includes("@")) {
    e.preventDefault();
    errorDiv.textContent = "Please enter a valid email.";
  } else if (password.length <= 5) {
    e.preventDefault();
    errorDiv.textContent = "Password must be at least 5 characters.";
  }
});