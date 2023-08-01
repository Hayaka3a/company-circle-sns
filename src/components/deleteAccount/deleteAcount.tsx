import { useState } from "react";
import styles from "../../styles/user/userEdit.module.css";
import LogSt from "../cookie/logSt";
import QuitUser from "../modalWindows/quitUser";
import QuitConf from "../modalWindows/quitConf/quitConf";
import QuitDone from "../modalWindows/quitDone";
import GetCookieID from "../cookie/getCookieId";
import DeleteDone from "./deleteDone";

export default function DeleteAcount() {
  LogSt();

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

  const { done } = DeleteDone({ userId, inputValue });

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
