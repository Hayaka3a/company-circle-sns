// カーソル外したときに一文字も入力されていなかったらエラー表示

import { useEffect } from "react";

export default function HandleDetailBlur({ detail, setError }) {
  useEffect(() => {
    async function handleNameBlur() {
      if (detail.trim() === "") {
        setError("※詳細内容は入力必須項目です");
      } else {
        setError("");
      }
    }

    handleNameBlur();
  }, [detail, setError]);

  return null;
}
