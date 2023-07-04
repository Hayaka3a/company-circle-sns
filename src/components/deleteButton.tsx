import { useState } from "react";
import styles from "../styles/user/userEdit.module.css";
import LogSt from "./cookie/logSt";
import QuitUser from "./modalWindows/quitUser";
import QuitConf from "./modalWindows/quitConf";
import { useNavigate } from "react-router-dom";
import QuitDone from "./modalWindows/quitDone";
import GetCookieID from "./cookie/getCookieId";
import { supabase } from "../createClient";

export default function DeleteButton() {
  LogSt();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [confOpen, setConfOpen] = useState(false);
  const [lastOpen, setLastOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const userId = GetCookieID();

  // アカウントを削除しますか？ウィンドウを開く
  const openModal = () => {
    setIsOpen(true);
  };
  // アカウント削除しますか？ウィンドウで×ボタンを押したら画面が閉じる
  const closeModal = () => {
    setIsOpen(false);
  };

  //アカウント削除しますか？ウィンドウを閉じて、入力ウィンドウを表示する
  const nextOpen = () => {
    setIsOpen(false);
    setConfOpen(true);
  };

  // 入力のウィンドウを閉じて、削除完了のウィンドウを表示する
  const nextOpen2 = () => {
    setConfOpen(false);
    setLastOpen(true);
  };

  // 入力ウィンドウで×ボタンを押したら画面が閉じる
  const close2Modal = () => {
    setConfOpen(false);
  };

  // 削除完了ウィンドウを閉じると、データが論理削除されて新規登録画面に遷移する
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
          // cookie情報の削除
          if (document.cookie !== "") {
            let expirationDate = new Date("1999-12-31T23:59:59Z");
            document.cookie = `id=; expires=${expirationDate.toUTCString()}; path=/;`;
            document.cookie = `loginSt=; expires=${expirationDate.toUTCString()}; path=/;`;
          }
        }
        navigate("/user/newUser");
        window.location.reload();
      }
    }
  };

  return (
    <>
      <div>
        <button onClick={openModal} className={styles.unsubButton}>
          退会
        </button>
        {isOpen && <QuitUser closeModal={closeModal} nextOpen={nextOpen} />}
        {confOpen && (
          <QuitConf
            close2Modal={close2Modal}
            nextOpen2={nextOpen2}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        )}
        {lastOpen && <QuitDone done={done} />}
      </div>
    </>
  );
}
