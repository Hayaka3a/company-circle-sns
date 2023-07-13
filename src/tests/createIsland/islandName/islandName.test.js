import { render, screen } from "@testing-library/react";
import IslandName from "./islandName";

test("renders text box", () => {
  render(<IslandName islandName="" setName={() => {}} />);

  const textBoxElement = screen.getByRole("textbox");
  expect(textBoxElement).toBeInTheDocument();
});
