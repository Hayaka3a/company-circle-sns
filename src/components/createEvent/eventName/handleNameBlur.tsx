import { useEffect, useState } from "react";
import { supabase } from "../../../createClient";

export default function HandleNameBlur({
  eventName,
  setNameError,
  setNameAlreadyError,
}) {
  useEffect(() => {
    async function handleNameBlur() {
      if (eventName.trim() === "") {
        setNameError("※イベント名は入力必須項目です");
      } else {
        setNameError("");
        // クエリを実行してislandNameの重複チェック
        const { data, error } = await supabase
          .from("events")
          .select("*")
          .eq("eventName", eventName)
          .eq("status", false);
        if (error) {
          console.error("クエリエラー:", error.message);
        } else {
          if (data.length > 0) {
            setNameAlreadyError("※イベント名が既に存在します");
          }
        }
      }
    }

    handleNameBlur();
  }, [eventName, setNameError, setNameAlreadyError]);

  return null;
}
