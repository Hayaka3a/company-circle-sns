import { render, fireEvent, screen } from "@testing-library/react";
import ConvertKanaJ from "../../components/changeKana";

describe("changeKana", () => {
  test("カタカナがひらがなに変換されること", () => {
    const nameKana = "タロウ";
    const converted = ConvertKanaJ(nameKana);
    expect(converted).toBe("たろう");
  });

  test("カタカナ以外の文字は変換されないこと", () => {
    const nameKana = "タロウabc123";
    const converted = ConvertKanaJ(nameKana);
    expect(converted).toBe("たろうabc123");
  });

  test("空文字の場合は空文字を返す", () => {
    const nameKana = "";
    const converted = ConvertKanaJ(nameKana);
    expect(converted).toBe("");
  });
});
