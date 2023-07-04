// カーソル外したときに未入力だったらエラー表示

import React, { useEffect } from "react";
import { supabase } from "../../../createClient";

export default function HandleNameBlur({ detail, setError }) {
  useEffect(() => {
    async function handleNameBlur() {
      if (detail.trim() === "") {
        setError("※活動内容は入力必須項目です");
      } else {
        setError("");
      }
    }

    handleNameBlur();
  }, [detail, setError]);

  return null;
}
