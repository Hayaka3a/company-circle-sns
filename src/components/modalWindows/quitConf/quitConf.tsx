import { useEffect, useState } from "react";
import styles from "../../../styles/modalWindows/quit.module.css";
import HandleIslandNameChange from "./handleInputChange";
import NextHandler from "./nextHandler";
import GetCookieID from "../../cookie/getCookieId";

export default function QuitConf({
  close2Modal,
  nextOpen2,
  inputValue,
  setInputValue,
}: {
  close2Modal: () => void;
  nextOpen2: () => void;
  inputValue: string;
  // React.Dispatch<>は、<>の値を引数として受け取る
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [emptyChara, setEmptyChara] = useState("");
  const [notExist, setNotExist] = useState("");
  const userId = GetCookieID();

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.allContents}>
            <img
              src="/modalWindow/close.png"
              alt="×ボタン"
              onClick={close2Modal}
              className={styles.close}
            />
            <div className={styles.main}>
              <div className={styles.title}>
                アカウントを本当に削除してもよろしいですか？
              </div>
              <div>
                <p>
                  削除するために下記のテキストボックスに名前をフルネームで入力してください
                </p>
                <p>※姓と名の間にスペースを入れずに入力してください</p>
              </div>
              <div>
                <input
                  type="text"
                  id="inputText"
                  value={inputValue}
                  onChange={HandleIslandNameChange({
                    setEmptyChara,
                    setNotExist,
                    setInputValue,
                  })}
                ></input>

                {emptyChara && (
                  <div>
                    <span className={styles.spanB}>{emptyChara}</span>
                  </div>
                )}
                {notExist && (
                  <div>
                    <span className={styles.span}>{notExist}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.btn}>
              <button
                onClick={() => {
                  NextHandler({
                    inputValue,
                    nextOpen2,
                    setNotExist,
                    userId,
                  });
                }}
                disabled={!inputValue.trim()}
              >
                アカウントを削除する
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
