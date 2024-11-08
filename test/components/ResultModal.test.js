import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResultModel from "../../src/app/components/ResultModal";

// Mock the Doughnut component from react-chartjs-2 to avoid rendering the actual chart
jest.mock("react-chartjs-2", () => ({
  Doughnut: jest.fn(() => <div>Mock Doughnut Chart</div>),
}));

describe("ResultModel Component", () => {
  const defaultProps = {
    correctAnswersCount: 5,
    wrongAnswersCount: 2,
    unattemptedCount: 3,
    darkMode: false,
  };

  test("renders without crashing", () => {
    render(<ResultModel {...defaultProps} />);
    expect(screen.getByText("Quiz by Quiz20")).toBeInTheDocument();
    expect(screen.getByText("Score: 3")).toBeInTheDocument(); // score = correct - wrong (5 - 2)
    expect(screen.getByText("Positive: 5 | Negative: 2")).toBeInTheDocument();
  });

  test("displays score and counts correctly", () => {
    render(<ResultModel {...defaultProps} />);
    expect(screen.getByText("Score: 3")).toBeInTheDocument();
    expect(screen.getByText("Positive: 5 | Negative: 2")).toBeInTheDocument();
  });

  test("renders Leaderboard section with correct text", () => {
    render(<ResultModel {...defaultProps} />);
    expect(screen.getByText("Leaderboard")).toBeInTheDocument();
  });

  test("renders Share and Answers buttons", () => {
    render(<ResultModel {...defaultProps} />);
    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText("Answers")).toBeInTheDocument();
  });

  test("renders correct colors and icons in dark mode", () => {
    render(<ResultModel {...defaultProps} darkMode={true} />);
    const shareButton = screen.getByText("Share").closest("div");
    const answersButton = screen.getByText("Answers").closest("div");

    expect(shareButton).toHaveClass("bg-slate-700 text-white");
    expect(answersButton).toHaveClass("bg-slate-700 text-white");
  });

  test("renders correct colors and icons in light mode", () => {
    render(<ResultModel {...defaultProps} darkMode={false} />);
    const shareButton = screen.getByText("Share").closest("div");
    const answersButton = screen.getByText("Answers").closest("div");

    expect(shareButton).toHaveClass("bg-slate-500 text-black");
    expect(answersButton).toHaveClass("bg-slate-500 text-black");
  });
});
