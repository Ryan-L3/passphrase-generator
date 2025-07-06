// components/PassphraseGenerator.jsx
"use client";
import { useState } from "react";

export default function PassphraseGenerator() {
  const [theme, setTheme] = useState("");
  const [passphrase, setPassphrase] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const generatePassphrase = async () => {
    if (!theme) {
      setError("Please enter a theme");
      return;
    }

    setLoading(true);
    setError("");
    setCopyStatus("");

    try {
      const response = await fetch("/api/generate-passphrase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate passphrase");
      }

      const data = await response.json();
      setPassphrase(data.passphrase);
    } catch (err) {
      console.error("Error generating passphrase:", err);
      setError("Failed to generate passphrase. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Handle the Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      e.preventDefault();
      generatePassphrase();
    }
  };

  // Copy to clipboard function
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(passphrase);
      setCopyStatus("Copied!");

      // Reset the status message after 2 seconds
      setTimeout(() => {
        setCopyStatus("");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
      setCopyStatus("Failed to copy");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Themed Passphrase Generator
      </h1>

      <div className="mb-6">
        <label
          htmlFor="theme"
          className="block text-sm font-semibold text-gray-700 mb-2"
        >
          Enter a theme:
        </label>
        <input
          type="text"
          id="theme"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g., space, ocean, hiking, etc."
          disabled={loading}
          aria-label="Theme input"
        />
        <p className="mt-1 text-sm text-gray-500">
          Press Enter or click the button below to generate
        </p>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-4 font-medium">{error}</p>
      )}

      <button
        onClick={generatePassphrase}
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300 disabled:bg-blue-300 shadow-sm"
        aria-label="Generate passphrase"
      >
        {loading ? "Generating..." : "Generate Passphrase"}
      </button>

      {passphrase && (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
          <h2 className="text-lg font-semibold mb-3 text-gray-800">
            Your Passphrase:
          </h2>

          <div className="flex items-center space-x-2 mb-3">
            <p className="text-xl font-bold break-words text-blue-700 passphrase-result flex-grow">
              {passphrase}
            </p>
            <button
              onClick={copyToClipboard}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-1 px-3 rounded border border-gray-300 transition-all flex items-center"
              aria-label="Copy passphrase to clipboard"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </svg>
              Copy
            </button>
          </div>

          {copyStatus && (
            <p className="text-sm text-green-600 font-medium mb-2">
              {copyStatus}
            </p>
          )}

          <p className="mt-3 text-sm text-gray-600">
            Remember this passphrase or save it in a secure password manager.
          </p>
        </div>
      )}
    </div>
  );
}
