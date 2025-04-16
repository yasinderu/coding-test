import React from "react";
import { render, screen } from "@testing-library/react";
import Overview from "./Overview";
import "@testing-library/jest-dom";

describe("Overview component", () => {
  const mockProps = {
    salesReps: [{ name: "Alice" }, { name: "Bob" }],
    dealsSummary: {
      closed_won: 5,
      in_progress: 3,
      closed_lost: 2,
    },
    totalSales: 100000,
  };

  it("renders all cards with correct values", () => {
    render(<Overview {...mockProps} />);

    expect(screen.getByText("Total Sales Reps")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();

    expect(
      screen.getByText("Total Deal Value (Closed Won & In Progress)")
    ).toBeInTheDocument();
    expect(screen.getByText("$100000")).toBeInTheDocument();

    expect(screen.getByText("Deals Summary")).toBeInTheDocument();
    expect(
      screen.getByText("Won: 5 / In Progress: 3 / Lost: 2")
    ).toBeInTheDocument();

    expect(screen.getByText("Top Performer")).toBeInTheDocument();
    expect(screen.getByText("Alice")).toBeInTheDocument();
  });
});
