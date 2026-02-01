import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Login = () => {
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  const checkPasscode = () => {
    const secret = "1234"; // your passcode
    if (passcode === secret) {
      window.location.href = "/Home"; // redirect to Home
    } else {
      setError(true);
      setPasscode("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") checkPasscode();
  };

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-[#fdfaf6] overflow-hidden font-sans">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=1350&q=80')",
        }}
      ></div>

      {/* Login Card */}
      <div
        data-aos="zoom-in"
        className="relative z-10 bg-white p-8 sm:p-10 rounded-3xl shadow-lg w-11/12 max-w-sm text-center"
      >
        <h1 className="font-[Dancing Script] text-3xl sm:text-4xl text-[#ff4d6d] mb-2">
          For Your Eyes Only
        </h1>
        <p className="text-sm sm:text-base text-gray-700 mb-6">
          Enter our special passcode to unlock the letter 💌
        </p>

        <input
          type="password"
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter Passcode"
          className="w-full p-4 border-2 border-gray-200 rounded-full text-center text-lg outline-none focus:border-[#ff4d6d] transition mb-2 sm:mb-4"
        />
        {error && (
          <div className="text-[#ff4d6d] text-xs sm:text-sm mb-2">
            Incorrect passcode, try again! ❤️
          </div>
        )}

        <button
          onClick={checkPasscode}
          className="bg-[#ff4d6d] text-white font-bold text-base sm:text-lg w-full py-4 rounded-full shadow-md transform transition active:scale-95 hover:scale-105"
        >
          Open Letter
        </button>
      </div>
    </div>
  );
};

export default Login;
