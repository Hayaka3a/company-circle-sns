// タグ名： 一文字でも入力されたら、エラー表示を解除
import { Dispatch, SetStateAction, useState } from "react";

export default function HandleChangeNameKana({
  tagNameKanaError,
  setInputValueK,
  setTagNameKanaError,
}: {
  tagNameKanaError: string;
  setInputValueK: Dispatch<SetStateAction<string>>;
  setTagNameKanaError: Dispatch<SetStateAction<string>>;
}) {
  const handleChangeNameKana = (e) => {
    setInputValueK(e.target.value);
    if (tagNameKanaError) {
      setTagNameKanaError("");
    }
  };

  return handleChangeNameKana;
}
