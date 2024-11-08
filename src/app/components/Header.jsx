import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import PropTypes from "prop-types";

const Header = ({ darkMode, setDarkMode, timeLeft }) => {
  const formatTime = (timeLeft) => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  return (
    <div>
      <header
        className={`p-2 ${
          darkMode
            ? "bg-customDarkGray text-white"
            : "bg-customLightGreen text-black"
        }`}
      >
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Quiz20</h1>

          <div
            className={`${
              darkMode ? "bg-white text-black" : "bg-black text-white"
            } rounded-r-3xl px-5 py-1 rounded-l-3xl font-bold text-2xl`}
          >
            {formatTime(timeLeft)}
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="mt-2 px-4 py-2 text-white rounded flex items-center gap-2"
          >
            {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
          </button>
        </div>
      </header>
    </div>
  );
};

Header.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  setDarkMode: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
};

export default Header;
