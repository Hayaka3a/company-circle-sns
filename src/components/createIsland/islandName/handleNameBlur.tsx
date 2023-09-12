import { useEffect } from "react";
import { supabase } from "../../../createClient";

export default function HandleNameBlur({
  Name,
  setNameError,
  setNameAlreadyError,
  type,
}) {
  useEffect(() => {
    async function handleNameBlur() {
      let error = "";
      let duplicateError = "";
      if (type === "island") {
        if (Name.trim() === "") {
          error = "※島名は入力必須項目です";
        } else {
          // クエリを実行してislandNameの重複チェック
          const { data, error: queryError } = await supabase
            .from("islands")
            .select("*")
            .eq("islandName", Name)
            .eq("status", false);
          if (queryError) {
            console.error("クエリエラー:", queryError.message);
          } else {
            if (data.length > 0) {
              duplicateError = "※島名が既に存在します";
            }
          }
        }
      } else if (type === "event") {
        if (Name.trim() === "") {
          error = "※イベント名は入力必須項目です";
        } else {
          // クエリを実行してeventNameの重複チェック
          const { data, error: queryError } = await supabase
            .from("events")
            .select("*")
            .eq("eventName", Name)
            .eq("status", false);
          if (queryError) {
            console.error("クエリエラー:", queryError.message);
          } else {
            if (data.length > 0) {
              duplicateError = "※イベント名が既に存在します";
            }
          }
        }
      }

      setNameError(error);
      setNameAlreadyError(duplicateError);
    }

    handleNameBlur();
  }, [Name, setNameError, setNameAlreadyError, type]);

  return null;
}
