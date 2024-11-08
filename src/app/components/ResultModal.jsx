import React from "react";
import PropTypes from "prop-types";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { MdLeaderboard } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { CiShare2 } from "react-icons/ci";

ChartJS.register(ArcElement, Tooltip, Legend);

const ResultModel = ({
  correctAnswersCount,
  wrongAnswersCount,
  unattemptedCount,
  darkMode,
}) => {
  const score = correctAnswersCount - wrongAnswersCount; // Positive score - Negative score

  const data = {
    labels: ["Correct", "Wrong", "Unattempted"],
    datasets: [
      {
        data: [correctAnswersCount, wrongAnswersCount, unattemptedCount],
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
    cutout: "60%",
    elements: {
      arc: {
        borderWidth: 1,
      },
    },
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-start items-center px-4 sm:px-8 ${
        darkMode ? "bg-white text-black " : "bg-gray-900 text-white"
      }`}
    >
      <div className="flex flex-col justify-center items-center w-full overflow-hidden mt-10">
        <h1 className="text-center text-3xl sm:text-4xl font-semibold">
          Quiz by Quiz20
        </h1>
        <h3 className="font-bold text-2xl mt-3">Quiz20</h3>

        <div className="w-full max-w-[300px] sm:max-w-[400px] h-[40vh] sm:max-h-[350px] mt-4">
          <Doughnut data={data} options={options} />
        </div>
      </div>

      <div className="mt-6 text-center">
        <p className="text-xl sm:text-2xl font-semibold">Score: {score}</p>
        <p className="text-md sm:text-lg text-gray-700">
          Positive: {correctAnswersCount} | Negative: {wrongAnswersCount}
        </p>
      </div>

      {/* Leaderboard section now takes the full width */}
      <div
        className={`w-full mt-6 px-4 sm:px-8 ${
          darkMode ? "bg-customPink" : "bg-customPink"
        } p-3 text-center rounded-br-[40px] flex justify-center items-center gap-8 sm:gap-24`}
      >
        <span className="text-white">Leaderboard</span>
        <MdLeaderboard className="text-blue" />
      </div>

      {/* Flex container for Share and Answers buttons */}
      <div className="flex flex-row justify-between items-center w-full mt-6 px-4 sm:px-8 gap-4 sm:gap-8">
        <div
          className={`${
            darkMode ? "bg-slate-700 text-white" : "bg-slate-500 text-black"
          } flex-1 p-3 rounded-2xl text-center flex justify-center items-center gap-4 sm:gap-8`}
        >
          <CiShare2 />
          Share
        </div>
        <div
          className={`${
            darkMode ? "bg-slate-700 text-white" : "bg-slate-500 text-black"
          } flex-1 p-3 rounded-2xl text-center flex justify-center items-center gap-4 sm:gap-8`}
        >
          <IoMdEye className="text-white font-bold text-xl" />
          Answers
        </div>
      </div>
    </div>
  );
};

ResultModel.propTypes = {
  correctAnswersCount: PropTypes.number.isRequired, // Ensures it's a number and is required
  wrongAnswersCount: PropTypes.number.isRequired, // Ensures it's a number and is required
  unattemptedCount: PropTypes.number.isRequired, // Ensures it's a number and is required
  darkMode: PropTypes.bool.isRequired, // Ensures it's a boolean and is required
};

export default ResultModel;
