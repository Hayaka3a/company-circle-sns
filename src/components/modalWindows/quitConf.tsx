import { useState } from "react";
import styles from "../../styles/modalWindows/quit.module.css";
import GetCookieID from "../cookie/getCookieId";
import { supabase } from "../../createClient";

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
  const userId = GetCookieID();
  const [emptyChara, setEmptyChara] = useState("");
  const [notExist, setNotExist] = useState("");

  const nextHandler = async () => {
    if (inputValue) {
      const { data } = await supabase
        .from("users")
        .select("familyName, firstName")
        .eq("id", userId)
        .eq("status", false);

      if (data && data.length > 0) {
        const familyName = data[0].familyName;
        const firstName = data[0].firstName;

        const fullName = familyName + firstName;

        if (fullName !== inputValue) {
          setNotExist("入力された名前が間違っています");
        } else {
          nextOpen2();
        }
      }
    }
  };

  const handleInputChange = async (event) => {
    const value = event.target.value;
    if (/\s/.test(value)) {
      // 空白文字（\s）を入れようとした場合、エラーメッセージを表示
      setEmptyChara("空白文字は入力できません");
      setNotExist("");
    } else {
      setInputValue(value);
      setEmptyChara("");
    }
  };

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
                  value={inputValue}
                  onChange={handleInputChange}
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

            <div>
              <button onClick={nextHandler} disabled={!inputValue.trim()}>
                アカウントを削除する
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
