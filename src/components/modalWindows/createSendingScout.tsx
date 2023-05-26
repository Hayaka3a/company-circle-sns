import styles from "../../styles/createSendingScout.module.css";
import ComboBox from "../comboBox";
import { supabase } from "../../createClient";
import { User } from "../../types/members";
import { useEffect, useState } from "react";
import { Message, newUsersData } from "../../types/sendScout";
import { useParams } from "react-router-dom";

export default function CreateSendingScout({
  closeModal,
  table,
}: {
  closeModal: () => void;
  table: string;
}) {
  const [message, setMessage] = useState<Message[]>();
  const [users, setUsers] = useState<newUsersData>();

  const params = useParams();
  const paramsID = parseInt(params.id);

  useEffect(() => {
    comboBoxData();
  }, []);
  const comboBoxData = async () => {
    //島またはイベントに既に参加している人のIDを取得
    const { data: entryUser } = await supabase
      .from("userEntryStatus")
      .select(`userID`)
      .eq(`${table}ID`, paramsID);
    const entryArray = entryUser.map((user) => user.userID);

    //コンボボックス用の全ユーザデータ取得
    const { data: users } = await supabase
      .from("users")
      .select(`id,familyName,firstName`);

    //全ユーザデータからすでに参加している人は抜き出して新たな配列を作る
    const newUsersData = users
      .map((user) => ({
        id: user.id,
        name: user.familyName + user.firstName,
      }))
      .filter((user) => !entryArray.includes(user.id));
    setUsers(newUsersData);
  };

  const addHandler = async () => {
    const { data, error } = await supabase
      .from("messages")
      .insert({ postID: 1, message: "", status: false });
    if (error) {
      console.log(error, "エラー");
    } else {
      closeModal();
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
              onClick={closeModal}
              className={styles.close}
            />
            <h3 className={styles.title}>○○島へ招待する</h3>
            <div className={styles.input}>
              <div>
                <label htmlFor="sendUser" className="label">
                  送るユーザー
                </label>
                {/* <ComboBox
                  Options={}
                  htmlFor="senduser"
                /> */}
              </div>
              <div className={styles.box}>
                <label htmlFor="text" className="label">
                  コメント
                </label>
                <textarea name="text" className={styles.textSending}></textarea>
              </div>
            </div>
            <div className={styles.btn}>
              <button onClick={addHandler}>送信する</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
