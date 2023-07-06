import { useEffect, useState } from "react";

export default function HandleBlur({ startDate, endDate, setError }) {
  useEffect(() => {
    async function handleBlur() {
      if (startDate.trim() === "" || endDate.trim() === "") {
        setError("※開催時期は開始日時と終了日時の両方入力必須項目です");
      } else {
        setError("");
      }
    }

    handleBlur();
  }, [startDate, endDate, setError]);

  return null;
}
