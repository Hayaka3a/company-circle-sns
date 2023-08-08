import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import IslandCreate from "../../../island/create/create";

describe("IslandCreateコンポーネント", () => {
  test("島名が表示されること", () => {
    render(
      <MemoryRouter>
        <IslandCreate />{" "}
      </MemoryRouter>,
    );
    const islandNameLabel = screen.getByText("島名");
    const islandLabel = screen.getByText("島");

    expect(islandNameLabel).toBeInTheDocument();
    expect(islandLabel).toBeInTheDocument();
  });

  test("活動内容が表示されること", () => {
    render(
      <MemoryRouter>
        <IslandCreate />{" "}
      </MemoryRouter>,
    );
    const activityLabel = screen.getByText("活動内容");
    expect(activityLabel).toBeInTheDocument();
  });

  test("メンバーが表示されること", () => {
    render(
      <MemoryRouter>
        <IslandCreate />{" "}
      </MemoryRouter>,
    );
    const memberLabel = screen.getByText("メンバー");
    expect(memberLabel).toBeInTheDocument();
  });

  test("サムネイルが表示されること", () => {
    render(
      <MemoryRouter>
        <IslandCreate />{" "}
      </MemoryRouter>,
    );
    const thumbnailLabel = screen.getByText("サムネイル");
    expect(thumbnailLabel).toBeInTheDocument();
  });

  test("ファイルを選択が表示されること", () => {
    render(
      <MemoryRouter>
        <IslandCreate />{" "}
      </MemoryRouter>,
    );
    const fileLabel = screen.getByText("ファイルを選択");
    expect(fileLabel).toBeInTheDocument();
  });

  test("タグが表示されること", () => {
    render(
      <MemoryRouter>
        <IslandCreate />{" "}
      </MemoryRouter>,
    );
    const tagLabel = screen.getByText("タグ");
    expect(tagLabel).toBeInTheDocument();
  });

  test("タグ追加が表示されること", () => {
    render(
      <MemoryRouter>
        <IslandCreate />{" "}
      </MemoryRouter>,
    );
    const addTagLabel = screen.getByText("タグ追加");
    expect(addTagLabel).toBeInTheDocument();
  });

  test("新しい島生活を始めるボタンが表示されること", () => {
    render(
      <MemoryRouter>
        <IslandCreate />{" "}
      </MemoryRouter>,
    );
    const startButton = screen.getByText("新しい島生活を始める");
    expect(startButton).toBeInTheDocument();
  });
});
