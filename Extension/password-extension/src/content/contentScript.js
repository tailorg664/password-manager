function isLoginPage() {
  const passwordInput = document.querySelector('input[type="password"]');
  const usernameInput = document.querySelector(
    'input[type="text"], input[type="email"]'
  );
  return passwordInput && usernameInput;
}
function getDomain() {
  return window.location.hostname;
}
function autofill({ username, password }) {
  const passwordInput = document.querySelector('input[type="password"]');
  const usernameInput = document.querySelector(
    'input[type="text"], input[type="email"]'
  );
  if (usernameInput) usernameInput.value = username;
  if (passwordInput) passwordInput.value = password;
}
if (isLoginPage()) {
  chrome.runtime.sendMessage(
    { type: "REQUEST_CREDENTIALS", domain: getDomain() },
    (response) => {
      if (response && response.credentials) {
        autofill(response.credentials);
      }
    }
  );
}