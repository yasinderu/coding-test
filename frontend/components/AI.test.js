import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AI from "./AI";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ answer: "This is a mocked AI response." }),
  })
);

describe("AI Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("renders input and button", () => {
    render(<AI />);
    expect(
      screen.getByPlaceholderText("Enter your question...")
    ).toBeInTheDocument();
    expect(screen.getByText("Ask")).toBeInTheDocument();
  });

  it("sends a question and displays the response", async () => {
    render(<AI />);

    const input = screen.getByPlaceholderText("Enter your question...");
    fireEvent.change(input, { target: { value: "What is AI?" } });

    const button = screen.getByText("Ask");
    fireEvent.click(button);

    await waitFor(() =>
      expect(screen.getByText(/AI Response:/)).toBeInTheDocument()
    );

    expect(
      screen.getByText("This is a mocked AI response.")
    ).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "What is AI?" }),
    });
  });
});
