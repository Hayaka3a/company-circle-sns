// カーソル外したときに未入力だったらエラー表示
//　新規イベント入力画面でも使用

import React, { useEffect } from "react";
import { supabase } from "../../../createClient";

export default function HandleNameBlur({
  Name,
  setNameError,
  setNameAlreadyError,
  type,
}) {
  useEffect(() => {
    async function handleNameBlur() {
      if (type === "island") {
        if (Name.trim() === "") {
          setNameError("※島名は入力必須項目です");
        } else {
          setNameError("");
          // クエリを実行してislandNameの重複チェック
          const { data, error } = await supabase
            .from("islands")
            .select("*")
            .eq("islandName", Name)
            .eq("status", false);
          if (error) {
            console.error("クエリエラー:", error.message);
          } else {
            if (data.length > 0) {
              setNameAlreadyError("※島名が既に存在します");
            }
          }
        }
      } else if (type === "event") {
        if (Name.trim() === "") {
          setNameError("※イベント名は入力必須項目です");
        } else {
          setNameError("");
          // クエリを実行してislandNameの重複チェック
          const { data, error } = await supabase
            .from("events")
            .select("*")
            .eq("eventName", Name)
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
    }

    handleNameBlur();
  }, [Name, setNameError, setNameAlreadyError]);

  return null;
}
