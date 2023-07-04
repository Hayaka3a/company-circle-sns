import { render } from "@testing-library/react";
import MembersList from "../../components/menberList/MembersList";
import styles from "../../styles/membersList.module.css";

jest.mock("../../components/menberList/ButtonSwiching.tsx", () => ({
  ButtonSwitching: jest.fn(() => <div data-testid="mocked-button-switching" />),
}));

describe("MembersList component", () => {
  test("returns the exact HTML string", () => {
    const table = "island";
    const displayData = {
      id: 1,
      ownerID: 1,
      islandName: "a",
    };
    const open = jest.fn();
    const close = jest.fn();
    const modal = true;
    const open2 = jest.fn();
    const close2 = jest.fn();
    const modal2 = false;

    const { container } = render(
      <MembersList
        table={table}
        displayData={displayData}
        open={open}
        close={close}
        modal={modal}
        open2={open2}
        close2={close2}
        modal2={modal2}
      />,
    );
    const outputHTML = container.innerHTML;

    // 期待されるHTML文字列
    const expectedHTML = `<div class="${styles.main}"><h2>${
      table === "island" ? "島民" : "参加者"
    }一覧</h2><table class="${styles.table}"><tbody class="${
      styles.tbody
    }"></tbody></table></div>`;

    // HTML文字列が一致することを確認
    expect(outputHTML).toEqual(expectedHTML);
  });
});
