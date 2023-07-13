import { render, screen } from "@testing-library/react";
import { ButtonSwitching } from "../../../components/menberList/ButtonSwiching";

describe("ButtonSwiching", () => {
  const entryUsers = [
    {
      id: 165,
      userID: 1,
      islandID: 98,
      eventID: null,
      status: false,
      users: {
        id: 1,
        familyName: "山田",
        firstName: "次郎",
        familyNameKana: "ヤマダ",
        firstNameKana: "ジロウ",
        mailAddress: "yamada@example.com",
        password: "Yamada01",
        icon: "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
        employeeCode: 2,
        department: "営業",
        createdAt: "2023-05-24T06:17:22.589142",
        creratedBy: "システム",
        updatedAt: null,
        updatedBy: null,
        status: false,
      },
    },
  ];

  const newEntryUsers = [];

  const anotherUser = jest.fn();
  const open = jest.fn();
  const open2 = jest.fn();
  const modal = jest.fn();
  const modal2 = jest.fn();
  const close = jest.fn();
  const close2 = jest.fn();
  const table = "island";

  test("オーナーの場合の表示", () => {
    const displayData = {
      id: 98,
      islandName: "山田6/22作成２",
      thumbnail: "",
      detail: "山田ふたつめ",
      ownerID: 1,
      createdAt: "2023-06-22T01:05:45.012555",
      createdBy: null,
      updatedAt: null,
      updatedBy: null,
      status: false,
    };
    const loginUser = {
      createdAt: "2023-05-24T06:17:22.589142",
      creratedBy: "システム",
      department: "営業",
      employeeCode: 2,
      familyName: "山田",
      familyNameKana: "ヤマダ",
      firstName: "次郎",
      firstNameKana: "ジロウ",
      icon: "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
      id: 1,
      mailAddress: "yamada@example.com",
      password: "Yamada01",
      status: false,
      updatedAt: null,
      updatedBy: null,
    };

    render(
      <ButtonSwitching
        loginID={1}
        loginUser={loginUser}
        displayData={displayData}
        newEntryUsers={newEntryUsers}
        anotherUser={anotherUser}
        open={open}
        modal={modal}
        table={table}
        open2={open2}
        modal2={modal2}
        close2={close2}
        entryUsers={entryUsers}
        close={close}
      />,
    );

    const ownerText = screen.getByText(/(オーナー)/);
    expect(ownerText).toBeInTheDocument();

    const buttonElements = screen.queryAllByRole("button");
    expect(buttonElements.length).toBe(0);
  });

  test("一般参加者の場合の表示", () => {
    const displayData = {
      id: 98,
      islandName: "山田6/22作成２",
      thumbnail: "",
      detail: "山田ふたつめ",
      ownerID: 2,
      createdAt: "2023-06-22T01:05:45.012555",
      createdBy: null,
      updatedAt: null,
      updatedBy: null,
      status: false,
    };
    const loginUser = {
      createdAt: "2023-05-24T06:17:22.589142",
      creratedBy: "システム",
      department: "営業",
      employeeCode: 2,
      familyName: "山田",
      familyNameKana: "ヤマダ",
      firstName: "次郎",
      firstNameKana: "ジロウ",
      icon: "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
      id: 1,
      mailAddress: "yamada@example.com",
      password: "Yamada01",
      status: false,
      updatedAt: null,
      updatedBy: null,
    };

    render(
      <ButtonSwitching
        loginID={1}
        loginUser={loginUser}
        displayData={displayData}
        newEntryUsers={newEntryUsers}
        anotherUser={anotherUser}
        open={open}
        modal={modal}
        table={table}
        open2={open2}
        modal2={modal2}
        close2={close2}
        entryUsers={entryUsers}
        close={close}
      />,
    );

    const buttonElementText = screen.getByRole("button", {
      name: "島を抜ける",
    });
    expect(buttonElementText).toBeInTheDocument();
  });

  test("参加していない場合の表示", () => {
    const displayData = {
      id: 98,
      islandName: "山田6/22作成２",
      thumbnail: "",
      detail: "山田ふたつめ",
      ownerID: 2,
      createdAt: "2023-06-22T01:05:45.012555",
      createdBy: null,
      updatedAt: null,
      updatedBy: null,
      status: false,
    };
    const loginUser = {
      createdAt: "2023-05-24T06:17:22.589142",
      creratedBy: "システム",
      department: "営業",
      employeeCode: 3,
      familyName: "山田",
      familyNameKana: "ヤマダ",
      firstName: "次郎",
      firstNameKana: "ジロウ",
      icon: "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
      id: 100,
      mailAddress: "yamada@example.com",
      password: "Yamada01",
      status: false,
      updatedAt: null,
      updatedBy: null,
    };

    render(
      <ButtonSwitching
        loginID={100}
        loginUser={loginUser}
        displayData={displayData}
        newEntryUsers={newEntryUsers}
        anotherUser={anotherUser}
        open={open}
        modal={modal}
        table={table}
        open2={open2}
        modal2={modal2}
        close2={close2}
        entryUsers={entryUsers}
        close={close}
      />,
    );

    const ownerText = screen.queryByText(/(オーナー)/);
    expect(ownerText).not.toBeInTheDocument();

    const buttonElements = screen.queryAllByRole("button");
    expect(buttonElements.length).toBe(0);
  });
});
