import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import SubmitModal from "../../src/app/components/SubmitModal";

describe("SubmitModal Component", () => {
  const defaultProps = {
    open: true,
    unanswered: 5,
    onSubmit: jest.fn(),
    onClose: jest.fn(),
  };

  test("renders correctly when open", () => {
    render(<SubmitModal {...defaultProps} />);
    expect(screen.getByText("Submit Quiz")).toBeInTheDocument();
    expect(screen.getByText("Unattempted Questions: 5")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Once submitted, you will not be able to modify your answers."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Are you sure you want to submit?")
    ).toBeInTheDocument();
    expect(screen.getByText("Yes")).toBeInTheDocument();
    expect(screen.getByText("No")).toBeInTheDocument();
  });

  test("does not render when open is false", () => {
    render(<SubmitModal {...defaultProps} open={false} />);
    const modal = screen.queryByText("Submit Quiz");
    expect(modal).toBeNull();
  });

  test("calls onSubmit when 'Yes' button is clicked", () => {
    render(<SubmitModal {...defaultProps} />);
    const yesButton = screen.getByText("Yes");
    fireEvent.click(yesButton);
    expect(defaultProps.onSubmit).toHaveBeenCalledTimes(1);
  });

  test("calls onClose when 'No' button is clicked", () => {
    render(<SubmitModal {...defaultProps} />);
    const noButton = screen.getByText("No");
    fireEvent.click(noButton);
    expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
  });

  test("renders correct unanswered count", () => {
    render(<SubmitModal {...defaultProps} unanswered={3} />);
    expect(screen.getByText("Unattempted Questions: 3")).toBeInTheDocument();
  });

  test("applies correct styling for 'Yes' button", () => {
    render(<SubmitModal {...defaultProps} />);
    const yesButton = screen.getByText("Yes");
    expect(yesButton).toHaveClass("bg-purple-500");
    expect(yesButton).toHaveClass("hover:bg-purple-700");
    expect(yesButton).toHaveClass("text-white");
  });

  test("applies correct styling for 'No' button", () => {
    render(<SubmitModal {...defaultProps} />);
    const noButton = screen.getByText("No");
    expect(noButton).toHaveClass("bg-gray-200");
    expect(noButton).toHaveClass("hover:bg-gray-300");
    expect(noButton).toHaveClass("text-black");
  });
});
