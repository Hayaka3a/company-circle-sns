import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import EventCreate from "../../../event/create/create";

describe("IslandCreateコンポーネント", () => {
  test("新しいイベントを作成が表示されること", () => {
    render(
      <MemoryRouter>
        <EventCreate />{" "}
      </MemoryRouter>,
    );
    const eventLabel = screen.getByText("新しいイベントを作成");

    expect(eventLabel).toBeInTheDocument();
  });

  test("イベント名が表示されること", () => {
    render(
      <MemoryRouter>
        <EventCreate />{" "}
      </MemoryRouter>,
    );
    const eventNameLabel = screen.getByText("イベント名");

    expect(eventNameLabel).toBeInTheDocument();
  });

  test("詳細が表示されること", () => {
    render(
      <MemoryRouter>
        <EventCreate />{" "}
      </MemoryRouter>,
    );
    const detailLabel = screen.getByText("詳細");
    expect(detailLabel).toBeInTheDocument();
  });

  test("開催期間が表示されること", () => {
    render(
      <MemoryRouter>
        <EventCreate />{" "}
      </MemoryRouter>,
    );
    const periodLabel = screen.getByText("開催期間");
    expect(periodLabel).toBeInTheDocument();
  });

  test("サムネイルが表示されること", () => {
    render(
      <MemoryRouter>
        <EventCreate />{" "}
      </MemoryRouter>,
    );
    const thumbnailLabel = screen.getByText("サムネイル");
    expect(thumbnailLabel).toBeInTheDocument();
  });

  test("ファイルを選択されること", () => {
    render(
      <MemoryRouter>
        <EventCreate />{" "}
      </MemoryRouter>,
    );
    const fileLabel = screen.getByText("ファイルを選択");
    expect(fileLabel).toBeInTheDocument();
  });

  test("共同開催島が表示されること", () => {
    render(
      <MemoryRouter>
        <EventCreate />{" "}
      </MemoryRouter>,
    );
    const withIslandLabel = screen.getByText("共同開催島");
    expect(withIslandLabel).toBeInTheDocument();
  });

  test("新しいイベントを開催するボタンが表示されること", () => {
    render(
      <MemoryRouter>
        <EventCreate />{" "}
      </MemoryRouter>,
    );
    const startButton = screen.getByText("新しいイベントを開催する");
    expect(startButton).toBeInTheDocument();
  });
});
