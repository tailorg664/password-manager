import React, { useEffect, useState } from "react";

function Popup() {
  const [passwords, setPasswords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFromBackground = async () => {
      try {
        const response = await chrome.runtime.sendMessage({
          type: "GET_CREDENTIALS",
        });
        console.log("Popup received:", response);

        if (response?.data && Array.isArray(response.data)) {
          setPasswords(response.data);
        } else {
          setPasswords([]);
        }
      } catch (err) {
        console.error("Error fetching passwords from background:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFromBackground();
  }, []);

  return (
    <div className="h-[400px] w-[400px] bg-gray-900 text-blue-300 p-6 overflow-y-auto rounded-2xl shadow-lg border border-gray-800">
      {/* Header */}
      <h1 className="text-3xl font-extrabold text-blue-400 mb-8 text-center tracking-wide">
        🔐 Saved Passwords
      </h1>

      {/* Conditional Rendering */}
      {loading ? (
        <p className="text-center text-blue-200 animate-pulse text-lg">
          Loading...
        </p>
      ) : passwords.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No passwords found</p>
      ) : (
        <ul className="space-y-5">
          {passwords.map((item, index) => (
            <li
              key={index}
              className="bg-gray-800 rounded-xl shadow-md p-5 hover:bg-gray-700 transition duration-200 ease-in-out border border-gray-700"
            >
              <h2 className="text-xl font-semibold text-blue-300 mb-2">
                {item.name}
              </h2>
              <p className="text-sm mb-1">
                <span className="font-medium text-blue-400">Username:</span>{" "}
                {item.username || "N/A"}
              </p>
              <p className="text-sm mb-1">
                <span className="font-medium text-blue-400">URL:</span>{" "}
                {item.url || "N/A"}
              </p>
              <p className="text-sm">
                <span className="font-medium text-blue-400">Password:</span>{" "}
                {item.password || "N/A"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Popup;
