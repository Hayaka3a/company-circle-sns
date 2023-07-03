import { fireEvent, render, screen } from "@testing-library/react";
import Daytime from "../../components/createEvent/daytime";

describe("daytime", () => {
  test("input type='date'要素が2つあること", () => {
    render(
      <Daytime
        startDate=""
        setStartDate={() => {}}
        endDate=""
        setEndDate={() => {}}
      />,
    );

    const element1 = document.getElementById("startDate");
    expect(element1).not.toBeNull();

    const element2 = document.getElementById("endDate");
    expect(element2).not.toBeNull();
  });

  test("カーソルから外れたときに、入力が空だったらエラーが出ること", () => {
    render(
      <Daytime
        startDate=""
        setStartDate={() => {}}
        endDate=""
        setEndDate={() => {}}
      />,
    );

    const element1 = document.getElementById("startDate");
    const element2 = document.getElementById("endDate");

    fireEvent.blur(element1);
    fireEvent.blur(element2);

    const errorElement = screen.getByText(
      "※開催時期は開始日時と終了日時の両方入力必須項目です",
    );

    expect(errorElement).toBeInTheDocument();
  });

  test("入力されている場合にはエラーが表示されないこと", () => {
    render(
      <Daytime
        startDate="2023-06-29"
        setStartDate={() => {}}
        endDate="2023-06-30"
        setEndDate={() => {}}
      />,
    );

    const element1 = document.getElementById("startDate");
    const element2 = document.getElementById("endDate");

    fireEvent.blur(element1);
    fireEvent.blur(element2);

    const errorElements = screen.queryAllByText(
      "※開催時期は開始日時と終了日時の両方入力必須項目です",
    );

    expect(errorElements.length).toBe(0);
  });
});
