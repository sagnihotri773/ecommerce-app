"use client";

import { useEffect, useState } from "react";

// Fallback for getCookieValue if not already defined in your `commonFunctions`.
const getCookieValue = (name) => {
  const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key] = value;
    return acc;
  }, {});
  return cookies[name] || null;
};

export default function AllowCookies() {
  const [isVisible, setIsVisible] = useState(false);
  const [cookieConsent, setCookieConsent] = useState(null);
  const [isAnimated, setIsAnimated] = useState(false);

  const handleAccept = () => {
    document.cookie = "cookie-consent=true; path=/; max-age=31536000";
    setIsVisible(false);
  };

  useEffect(() => {
    const consent = getCookieValue("cookie-consent");
    setCookieConsent(consent);
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {!cookieConsent ?
        <div
          className={`fixed bottom-4 right-0 z-50 p-4 transition-transform duration-500 ease-out ${isAnimated ? "translate-x-0" : "translate-x-full"
            }`}
          style={{ width: "100%", maxWidth: "400px" }}
        >
          <div className="bg-white rounded-lg shadow-lg w-full p-6 space-y-4">
            <p className="text-center text-gray-700 text-sm">
              We use cookies to enhance your browsing experience, serve
              personalized ads or content, and analyze our traffic. By clicking
              'Allow cookies', you consent to our use of cookies.
            </p>
            <button
              onClick={handleAccept}
              className="w-full bg-primary text-black py-2 px-4 rounded hover:bg-secondary transition-colors"
            >
              Allow cookies
            </button>
          </div>
        </div> : ''}
    </>
  );
}
