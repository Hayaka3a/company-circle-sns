// カーソル外したときに未入力だったらエラー表示

import React, { useEffect } from "react";
import { supabase } from "../../../createClient";

export default function HandleNameBlur({
  islandName,
  setIslandNameError,
  setNameAlreadyError,
}) {
  useEffect(() => {
    async function handleNameBlur() {
      if (islandName.trim() === "") {
        setIslandNameError("※島名は入力必須項目です");
      } else {
        setIslandNameError("");
        // クエリを実行してislandNameの重複チェック
        const { data, error } = await supabase
          .from("islands")
          .select("*")
          .eq("islandName", islandName)
          .eq("status", false);
        if (error) {
          console.error("クエリエラー:", error.message);
        } else {
          if (data.length > 0) {
            setNameAlreadyError("※島名が既に存在します");
          }
        }
      }
    }

    handleNameBlur();
  }, [islandName, setIslandNameError, setNameAlreadyError]);

  return null;
}
