// DeleteAccountLogic.js

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../createClient";

export default function DeleteDone({ userId, inputValue }) {
  const navigate = useNavigate();
  const [lastOpen, setLastOpen] = useState(false);

  const done = async () => {
    setLastOpen(false);

    // posts・users・userEntryStatusテーブルのstatusをtrueに変更
    const { data, error } = await supabase
      .from("users")
      .select("familyName, firstName")
      .eq("id", userId)
      .eq("status", false);

    if (error) {
      console.error("Error fetching user data:", error);
    }
    if (data && data.length > 0) {
      const familyName = data[0].familyName;
      const firstName = data[0].firstName;

      const fullName = familyName + firstName;

      if (fullName === inputValue) {
        const { error: usersError } = await supabase
          .from("users")
          .update({ status: "true" })
          .eq("id", userId);

        const { error: userEnError } = await supabase
          .from("userEntryStatus")
          .update({ status: "true" })
          .eq("userID", userId);

        const { error: postsError } = await supabase
          .from("posts")
          .update({ status: "true" })
          .eq("userID", userId);

        if (usersError || userEnError || postsError) {
          console.error(
            "Error changing status :",
            usersError || userEnError || postsError,
          );
        }
        // cookie情報の削除
        if (document.cookie !== "") {
          let expirationDate = new Date("1999-12-31T23:59:59Z");
          document.cookie = `id=; expires=${expirationDate.toUTCString()}; path=/;`;
          document.cookie = `loginSt=; expires=${expirationDate.toUTCString()}; path=/;`;
        }
        navigate("/user/login");
        window.location.reload();
      }
    }
  };

  return { done, lastOpen };
}
