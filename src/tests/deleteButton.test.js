import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import DeleteButton from "../components/deleteButton";
import { supabase } from "../../createClient";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../createClient", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn().mockReturnThis(),
      })),
      update: jest.fn().mockReturnThis(),
    })),
  },
}));

describe("DeleteButton", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders properly", () => {
    const { getByText } = render(<DeleteButton />);

    const deleteButton = getByText("退会");
    expect(deleteButton).toBeInTheDocument();
  });

  test("opens modal window and completes deletion", async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    const { getByText, getByLabelText } = render(<DeleteButton />);

    const deleteButton = getByText("退会");
    fireEvent.click(deleteButton);

    const closeButton = getByLabelText("×ボタン");
    fireEvent.click(closeButton);

    expect(mockNavigate).not.toHaveBeenCalled();

    fireEvent.click(deleteButton);

    const confirmButton = getByText("アカウントを削除する");
    fireEvent.click(confirmButton);

    const confirmInput = getByLabelText("入力");
    fireEvent.change(confirmInput, { target: { value: "John Doe" } });

    const confirmDeleteButton = getByText("削除");
    fireEvent.click(confirmDeleteButton);

    expect(supabase.from("users").update).toHaveBeenCalledWith({
      status: "true",
    });
    expect(supabase.from("userEntryStatus").update).toHaveBeenCalledWith({
      status: "true",
    });
    expect(supabase.from("posts").update).toHaveBeenCalledWith({
      status: "true",
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/user/newUser");
      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
