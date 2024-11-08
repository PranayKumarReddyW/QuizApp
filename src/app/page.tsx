"use client";
import React, { useState, useEffect } from "react";
import { FaShareAlt } from "react-icons/fa";
import { MdGTranslate, MdOutlineReportProblem } from "react-icons/md";
import Header from "./components/Header";
import SubmitModal from "./components/SubmitModal";
import ReportModel from "./components/ReportModal";
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md"; // Import icons

import ResultModel from "./components/ResultModal"; // Import the ResultModel component
import { questions } from "./data/questions"; // Import questions from data folder
import "./styles.css";

const Page: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [timeLeft, setTimeLeft] = useState<number>(59);
  const [openSubmitModal, setOpenSubmitModal] = useState<boolean>(false);
  const [openReportModal, setOpenReportModal] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0); // Track the current question
  const [answers, setAnswers] = useState<(number | undefined)[]>([]); // Store the selected answers
  const [isHindi, setIsHindi] = useState<boolean>(false); // Track language selection
  const [showResult, setShowResult] = useState<boolean>(false); // State to show result modal
  const [correctAnswersCount, setCorrectAnswersCount] = useState<number>(0); // Track correct answers count
  const [wrongAnswersCount, setWrongAnswersCount] = useState<number>(0); // Track wrong answers count

  // Timer logic

  const handleTimelineClick = (index: number) => {
    setCurrentQuestion(index);
  };
  // Handle answer selection
  const handleAnswer = (index: number) => {
    const updatedAnswers = [...answers];

    // Toggle the selected answer for the current question
    updatedAnswers[currentQuestion] =
      updatedAnswers[currentQuestion] === index ? undefined : index;

    setAnswers(updatedAnswers);
  };

  // Handle moving to the next question
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setOpenSubmitModal(true); // Open the submit modal when quiz ends
      calculateResults();
    }
  };

  // Handle moving to the previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Handle report modal opening
  const handleReportClick = () => {
    setOpenReportModal(true);
  };

  // Calculate results based on answers
  const calculateResults = () => {
    let correct = 0;
    let wrong = 0;

    answers.forEach((answer, index) => {
      if (answer === undefined) {
      } else if (answer === questions[index].correctAnswer) {
        correct++;
      } else {
        wrong++;
      }
    });

    setCorrectAnswersCount(correct);
    setWrongAnswersCount(wrong);
  };
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      calculateResults();
      setShowResult(true);
    }
  }, [timeLeft, calculateResults]);
  return (
    <div
      className={
        darkMode ? "bg-customDarkGray text-white" : "bg-white text-black"
      }
    >
      {showResult ? (
        <ResultModel
          darkMode={darkMode}
          correctAnswersCount={correctAnswersCount}
          wrongAnswersCount={wrongAnswersCount}
          unattemptedCount={
            questions.length -
            answers.filter((answer) => answer !== undefined).length
          }
        />
      ) : (
        <div>
          <div
            className={`${
              darkMode ? "bg-white text-black" : "bg-customDarkGray text-white"
            } min-h-screen`}
          >
            <Header
              darkMode={darkMode}
              setDarkMode={setDarkMode}
              timeLeft={timeLeft}
            />

            <div className="flex items-center justify-between w-full pt-4 mb-4">
              <h2 className="text-[18px] font-bold ml-3">Quiz by Quiz20</h2>
              <button
                className="bg-blue-700 px-4 sm:px-12 md:px-36 lg:px-48 py-2 mr-3 rounded-lg text-white"
                onClick={() => {
                  setOpenSubmitModal(true);
                  calculateResults();
                }}
              >
                Submit
              </button>
            </div>

            {/* Timeline */}
            <div className="flex items-center space-x-4 mb-4 ml-4 relative">
              {questions.map((_, index) => {
                const isAnswered = answers[index] !== undefined;
                const isSkipped =
                  !isAnswered &&
                  answers[index] === undefined &&
                  index < currentQuestion;
                const isCurrent = currentQuestion === index;
                const isNotVisited =
                  answers[index] === undefined && index > currentQuestion;

                return (
                  <div key={index} className="relative flex items-center">
                    {/* Circle */}
                    <div
                      className={`w-8 h-8 flex justify-center items-center rounded-full cursor-pointer relative z-10 ${
                        isCurrent
                          ? "bg-green-500 text-white"
                          : isAnswered
                          ? "bg-blue-500 text-white"
                          : isSkipped
                          ? "bg-yellow-500 text-white"
                          : isNotVisited
                          ? "bg-gray-300 text-white"
                          : "bg-transparent"
                      }`}
                      onClick={() => handleTimelineClick(index)}
                    >
                      {isCurrent ? (
                        <div className="w-4 h-4 border-1 border-t-2 border-white border-solid rounded-full animate-spin transform rotate-180"></div>
                      ) : isAnswered ? (
                        <span className="text-xl font-bold">✓</span> // Show tick only if answered
                      ) : (
                        <div
                          className={`w-4 h-4 rounded-full ${
                            isCurrent ? "bg-green-500" : "bg-white"
                          }`}
                        ></div>
                      )}
                    </div>

                    {/* Question number below the circle */}
                    <div className="absolute top-full mt-1 ml-3 text-center text-xs text-gray-500">
                      {index + 1} {/* Display question number */}
                    </div>

                    {/* Line connecting the circles */}
                    {/* Ensure line only shows between circles and not after the last question */}
                    {index < questions.length - 2 && (
                      <div className="absolute top-1/2 left-full transform -translate-y-1/2 w-16 h-0.5 bg-gray-300 z-0"></div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Question Section */}
            <div className="p-5">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-blue-400 text-lg">
                  Question {currentQuestion + 1} of {questions.length}
                </h4>
                <div className="flex gap-3 items-center">
                  <button className="cursor-pointer">
                    <FaShareAlt className="text-xl" />
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={() => setIsHindi(!isHindi)}
                  >
                    <MdGTranslate className="text-xl" />
                  </button>
                  <button
                    className="cursor-pointer"
                    onClick={handleReportClick}
                  >
                    <MdOutlineReportProblem className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Question */}
              <p className="text-[15px] mb-3">
                {isHindi
                  ? questions[currentQuestion].questionHindi
                  : questions[currentQuestion].question}
              </p>

              {/* Options */}
              <div className="space-y-2 flex flex-col text-[12px]">
                {(isHindi
                  ? questions[currentQuestion].optionsHindi
                  : questions[currentQuestion].options
                ).map((option, index) => {
                  const isSelected = answers[currentQuestion] === index;
                  return (
                    <button
                      key={index}
                      className={`w-full p-3 text-left flex items-center rounded-xl ${
                        isSelected
                          ? "border-2 border-blue-500"
                          : darkMode
                          ? " text-black"
                          : "text-white"
                      } ${isSelected ? "text-blue" : ""}`}
                      onClick={() => handleAnswer(index)}
                    >
                      <span
                        className={`font-bold flex justify-center items-center mr-3 w-8 h-8 rounded-full 
    ${isSelected ? "bg-blue-500" : darkMode ? "bg-gray-700" : "bg-gray-300"} 
    ${isSelected ? "text-white" : darkMode ? "text-white" : "text-black"}`} // Adjust text color based on darkMode
                      >
                        {["A", "B", "C", "D"][index]}
                      </span>

                      {option}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation Buttons */}

            <div
              className="flex justify-between absolute bottom-5 w-full gap-2"
              style={{ paddingLeft: "10px", paddingRight: "10px" }}
            >
              {/* Previous Button */}
              {currentQuestion === 0 ? (
                <span
                  className={`flex-1 px-6 py-2 rounded-lg text-center ${
                    darkMode
                      ? "bg-black text-white opacity-50"
                      : "bg-customLightGreen text-black opacity-50"
                  }`}
                >
                  <MdOutlineKeyboardArrowLeft className="inline-block mr-2 text-xl" />{" "}
                  {/* Add left arrow icon */}
                  Previous
                </span>
              ) : (
                <button
                  onClick={handlePrevQuestion}
                  className={`flex-1 px-6 py-2 rounded-lg flex items-center justify-center ${
                    darkMode
                      ? "bg-black text-white"
                      : "bg-customLightGreen text-black"
                  }`}
                >
                  <MdOutlineKeyboardArrowLeft className="inline-block mr-2 text-xl" />{" "}
                  {/* Add left arrow icon */}
                  Previous
                </button>
              )}

              {/* Next Button */}
              {currentQuestion === questions.length - 1 ? (
                <span
                  className={`flex-1 px-6 py-2 rounded-lg text-center ${
                    darkMode
                      ? "bg-black text-white opacity-50"
                      : "bg-customLightGreen text-black opacity-50"
                  }`}
                >
                  Next
                  <MdOutlineKeyboardArrowRight className="inline-block ml-2 text-xl" />{" "}
                  {/* Add right arrow icon */}
                </span>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className={`flex-1 px-6 py-2 rounded-lg flex items-center justify-center ${
                    darkMode
                      ? "bg-black text-white"
                      : "bg-customLightGreen text-black"
                  }`}
                >
                  Next
                  <MdOutlineKeyboardArrowRight className="inline-block ml-2 text-xl" />{" "}
                  {/* Add right arrow icon */}
                </button>
              )}
            </div>
          </div>

          {/* Submit Modal */}
          <SubmitModal
            open={openSubmitModal}
            unanswered={
              questions.length -
              answers.filter((answer) => answer !== undefined).length
            }
            onSubmit={() => {
              setOpenSubmitModal(false);
              setShowResult(true);
            }}
            onClose={() => {
              setOpenSubmitModal(false);
            }}
          />

          {/* Report Modal */}
          <ReportModel
            open={openReportModal}
            onClose={() => setOpenReportModal(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
