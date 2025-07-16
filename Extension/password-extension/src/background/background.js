chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "REQUEST_CREDENTIALS") {
    const domain = request.domain;

    chrome.storage.local.get("authToken", (result) => {
      const token = result.authToken;
      if (!token) {
        sendResponse({ error: "Not logged in" });
        return;
      }

      // Call your backend to get saved credentials
      fetch(`https://localstorage:3000/api/auth/login`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          // Assuming data = { username, password }
          sendResponse({ credentials: data });
        })
        .catch((err) => {
          console.error(err);
          sendResponse({ error: err.message });
        });
    });

    return true; // Required for async response
  }
});
