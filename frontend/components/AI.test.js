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
    fetch.mockClear(); // Reset mock before each test
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

    // Type into the input
    const input = screen.getByPlaceholderText("Enter your question...");
    fireEvent.change(input, { target: { value: "What is AI?" } });

    // Click the "Ask" button
    const button = screen.getByText("Ask");
    fireEvent.click(button);

    // Wait for the response to appear
    await waitFor(() =>
      expect(screen.getByText(/AI Response:/)).toBeInTheDocument()
    );

    expect(
      screen.getByText("This is a mocked AI response.")
    ).toBeInTheDocument();

    // Assert fetch was called correctly
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: "What is AI?" }),
    });
  });
});
