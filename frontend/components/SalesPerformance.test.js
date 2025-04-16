import React from "react";
import { render, screen } from "@testing-library/react";
import SalesPerformance from "./SalesPerformance"; // Adjust path if needed
import "@testing-library/jest-dom";

describe("SalesPerformance component", () => {
  const mockSalesReps = [
    {
      name: "Alice",
      role: "Senior Sales Rep",
      region: "West",
      deals: [{}, {}, {}],
      total_deals: 50000,
      skills: ["Negotiation", "CRM", "Closing"],
    },
    {
      name: "Bob",
      role: "Junior Sales Rep",
      region: "East",
      deals: [{}],
      total_deals: 10000,
      skills: ["Communication"],
    },
  ];

  it("renders the table with sales rep data", () => {
    render(<SalesPerformance salesReps={mockSalesReps} />);

    expect(screen.getByText("Sales Rep Performance")).toBeInTheDocument();

    // Check headers
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Region")).toBeInTheDocument();
    expect(screen.getByText("Total Deals")).toBeInTheDocument();
    expect(screen.getByText("Closed Won & In Progress")).toBeInTheDocument();
    expect(screen.getByText("Skills")).toBeInTheDocument();

    // Check sales rep row values
    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("Senior Sales Rep")).toBeInTheDocument();
    expect(screen.getByText("West")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument(); // deals.length
    expect(screen.getByText("$50000")).toBeInTheDocument();
    expect(screen.getByText("Negotiation")).toBeInTheDocument();
    expect(screen.getByText("CRM")).toBeInTheDocument();
    expect(screen.getByText("Closing")).toBeInTheDocument();

    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("Junior Sales Rep")).toBeInTheDocument();
    expect(screen.getByText("East")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument(); // deals.length
    expect(screen.getByText("$10000")).toBeInTheDocument();
    expect(screen.getByText("Communication")).toBeInTheDocument();
  });
});
