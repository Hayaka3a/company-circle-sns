import { render, screen } from "@testing-library/react";
import EntryPermit from "../../../components/entryPermit/entryPermit";
import { MemoryRouter } from "react-router-dom";

describe("EntryPermit component", () => {
  // test("住民申請がある場合の表示", () => {
  //   const user = [
  //     {
  //       id: 1,
  //       users: {
  //         icon: "user-icon.jpg",
  //         familyName: "Smith",
  //         firstName: "John",
  //       },
  //       applications: [
  //         {
  //           message: "Sample message",
  //         },
  //       ],
  //     },
  //   ];
  //   // useNavigateのモック実装
  //   const mockNavigate = jest.fn();
  //   jest.mock("react-router-dom", () => ({
  //     ...jest.requireActual("react-router-dom"),
  //     useNavigate: () => mockNavigate,
  //   }));

  //   render(
  //     <MemoryRouter>
  //       <EntryPermit table="island" user={user} />
  //     </MemoryRouter>,
  //   );

  //   expect(screen.queryByText(/Smith.*John/)).toBeInTheDocument();
  //   expect(screen.queryByText("Sample message")).toBeInTheDocument();
  // });

  test("住民申請がない場合の表示", () => {
    // useNavigateのモック実装
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <EntryPermit table="island" user={[]} />
      </MemoryRouter>,
    );

    // user data is not present
    expect(screen.getByText("住民申請はありません")).toBeInTheDocument();

    // Check if user data is not rendered
    expect(screen.queryByText("SmithJohn")).not.toBeInTheDocument();
    expect(screen.queryByText("Sample message")).not.toBeInTheDocument();
  });
});
