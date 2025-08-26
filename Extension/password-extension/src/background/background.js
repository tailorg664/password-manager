let credentialsCache = null;

async function fetchCredentials() {
  const my_token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODRkODZmMTIyYjQzMWJkZWU5YmUwMzQiLCJpYXQiOjE3NTYxMTg0NjAsImV4cCI6MTc1NjIwNDg2MH0.DhaG5YZOXh15Hl0v_QPGYqXdIwKjolfngq-3I2SfcOM";

  try {
    const res = await fetch(
      "https://password-manager-hv6x.onrender.com/api/home/show-password",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${my_token}`,
        },
      }
    );

    const result = await res.json();
    credentialsCache = result;
    return result;
  } catch (err) {
    console.error("Error fetching credentials:", err);
    return { data: [] };
  }
}

// Listener for messages from content or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "GET_CREDENTIALS") {
    if (credentialsCache) {
      sendResponse(credentialsCache);
    } else {
      fetchCredentials().then((data) => sendResponse(data));
    }
    return true; // async response
  }
});
