import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Hero } from "../components/hero";

describe("Hero", () => {
  it("renders headline", () => {
    render(<Hero />);
    expect(screen.getByText(/Borderless luxury finance/i)).toBeInTheDocument();
  });
});
