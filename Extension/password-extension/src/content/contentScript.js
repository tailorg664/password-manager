import { matchCredential } from "../utils/urlMatcher.js";

(async function () {
  const domain = window.location.hostname;

  try {
    // Ask background for credentials
    chrome.runtime.sendMessage({ type: "GET_CREDENTIALS" }, (result) => {
      if (!result || !Array.isArray(result.data)) {
        console.warn("No credentials received from background for:", domain);
        return;
      }

      const matched = matchCredential(domain, result.data);

      if (!matched || matched.length === 0) {
        console.log("No matching credentials found for:", domain);
        return;
      }

      const { username, password } = matched[0] || {};

      // Safely look for input fields
      const userField =
        document.querySelector("input[type='email']") ||
        document.querySelector("input[name*='user' i]") || // case-insensitive match
        document.querySelector("input[name*='email' i]") ||
        document.querySelector("input[type='text']");

      const passField =
        document.querySelector("input[type='password']") ||
        document.querySelector("input[name*='pass' i]");

      if (userField && username) {
        userField.value = username;
        userField.dispatchEvent(new Event("input", { bubbles: true })); // trigger frameworks
      } else {
        console.log("Username field not found on:", domain);
      }

      if (passField && password) {
        passField.value = password;
        passField.dispatchEvent(new Event("input", { bubbles: true }));
      } else {
        console.log("Password field not found on:", domain);
      }

      console.log("✅ Autofilled credentials for", domain);
    });
  } catch (err) {
    console.error("❌ Error in contentScript:", err);
  }
})();
