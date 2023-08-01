import { render, screen } from "@testing-library/react";
import EventName from "../../../../components/createEvent/eventName/eventName";

test("renders text box", () => {
  render(<EventName eventName="" setName={() => {}} />);

  const textBoxElement = screen.getByRole("textbox");
  expect(textBoxElement).toBeInTheDocument();
});
