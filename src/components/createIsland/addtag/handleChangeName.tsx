// タグ名： 一文字でも入力されたら、エラー表示を解除
import { Dispatch, SetStateAction, useState } from "react";

export default function HandleChangeName({
  tagNameError,
  setInputValue,
  setTagNameError,
}: {
  tagNameError: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  setTagNameError: Dispatch<SetStateAction<string>>;
}) {
  const handleChangeName = (e) => {
    setInputValue(e.target.value);
    if (tagNameError) {
      setTagNameError("");
    }
  };

  return handleChangeName;
}
