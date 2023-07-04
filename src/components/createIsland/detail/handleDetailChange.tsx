// 一文字でも入力されたら、エラー表示を解除
import { Dispatch, SetStateAction, useState } from "react";

export default function HandleDetailChange({
  detail,
  setDetail,
  error,
  setError,
}: {
  detail: string;
  error: string;
  setDetail: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
}) {
  const handleIslandDetailChange = (e) => {
    setDetail(e.target.value);
    if (error) {
      setError("");
    }
  };

  return handleIslandDetailChange;
}
