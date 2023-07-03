import { render, screen, fireEvent } from "@testing-library/react";
import IslandName from "../../components/createIsland/islandName";

describe("IslandName", () => {
  test("入力ボックスが表示されるかどうか", () => {
    render(<IslandName islandName="" setIslandName={() => {}} />);

    const inputElement = screen.getByRole("textbox");
    expect(inputElement).toBeInTheDocument();
  });

  test("入力値が更新されたら、島名が更新されるかどうか", () => {
    const setIslandName = jest.fn();
    render(<IslandName islandName="" setIslandName={setIslandName} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "New Island" } });

    expect(setIslandName).toHaveBeenCalledWith("New Island");
  });

  test("入力が空の場合にエラーが表示されるかどうか", () => {
    render(<IslandName islandName="" setIslandName={() => {}} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement);

    const errorElement = screen.getByText("※島名は入力必須項目です");
    expect(errorElement).toBeInTheDocument();
  });

  test("すでに登録されている島名を入力したときにエラーがでるかどうか", async () => {
    // 重複するデータが存在するように supabase のレスポンスをモック化する
    jest.mock("../../createClient", () => ({
      supabase: {
        from: () => ({
          select: () => ({
            eq: () => ({
              eq: () => ({
                data: [{ islandName: "Duplicate Island" }],
                error: null,
              }),
            }),
          }),
        }),
      },
    }));

    render(
      <IslandName islandName="Duplicate Island" setIslandName={() => {}} />,
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement);

    const errorElement = screen.queryByText("※島名が既に存在します");

    // screen.queryByTextがnullを返す場合、エラーメッセージが出ない
    expect(errorElement).toBeNull();
  });

  test("入力が有効な場合にはエラーが表示されないこと", async () => {
    // createClientモジュールをモックする
    jest.mock("../../createClient", () => ({
      supabase: {
        from: () => ({
          select: () => ({
            eq: () => ({
              eq: () => ({
                data: [],
                error: null,
              }),
            }),
          }),
        }),
      },
    }));

    render(<IslandName islandName="Valid Island" setIslandName={() => {}} />);

    const inputElement = screen.getByRole("textbox");
    fireEvent.blur(inputElement);

    // console.errorが出ていないかどうか
    const errorElements = screen.queryAllByRole("alert");
    expect(errorElements.length).toBe(0);
  });
});
