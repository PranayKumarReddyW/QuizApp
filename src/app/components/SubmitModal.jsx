"use client";
import React from "react";
import PropTypes from "prop-types";

const SubmitModal = ({ open, unanswered, onSubmit, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[90%] sm:w-[400px] h-auto max-w-sm mx-auto my-auto border border-white rounded-xl p-6 shadow-lg focus:outline-none">
        <h1 className="text-red-500 text-2xl font-bold text-center">
          Submit Quiz
        </h1>
        <p className="mt-4 text-black text-left">
          Unattempted Questions: {unanswered}
        </p>
        <p className="mt-4 text-black text-left">
          Once submitted, you will not be able to modify your answers.
        </p>
        <p className="mt-4 font-semibold text-left text-black">
          Are you sure you want to submit?
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="bg-purple-500 hover:bg-purple-700 text-white w-20 h-10 rounded-lg font-semibold transition-colors duration-300"
            onClick={onSubmit}
          >
            Yes
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 text-black w-20 h-10 rounded-lg font-semibold transition-colors duration-300"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

SubmitModal.propTypes = {
  open: PropTypes.bool.isRequired,
  unanswered: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SubmitModal;
