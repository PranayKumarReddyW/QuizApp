import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../src/app/components/Header";

// Mock the icons to avoid issues during rendering
jest.mock("react-icons/fa", () => ({
  FaSun: () => <svg data-testid="sun-icon" />,
  FaMoon: () => <svg data-testid="moon-icon" />,
}));

describe("Header Component", () => {
  const setup = (darkMode = false, timeLeft = 120) => {
    const setDarkMode = jest.fn();
    render(
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        timeLeft={timeLeft}
      />
    );
    return { setDarkMode };
  };

  test("calls setDarkMode function on button click", () => {
    const { setDarkMode } = setup(false);
    fireEvent.click(screen.getByRole("button"));
    expect(setDarkMode).toHaveBeenCalledTimes(1);
  });
});
