import { render, screen } from "@testing-library/react";
import IslandName from "../../../../components/createIsland/islandName/islandName";

test("renders text box", () => {
  render(<IslandName islandName="" setName={() => {}} />);

  const textBoxElement = screen.getByRole("textbox");
  expect(textBoxElement).toBeInTheDocument();
});
