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
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<newUsersData>();
  const [post, setPost] = useState(4);
  const [postedID, setPostedID] = useState(0);

  const params = useParams();
  const paramsID = parseInt(params.id);

  useEffect(() => {
    comboBoxData();
    fetchPost();
  }, []);
  const comboBoxData = async () => {
    //島またはイベントに既に参加している人のIDを取得
    const { data: entryUser, error: entryError } = await supabase
      .from("userEntryStatus")
      .select(`userID`)
      .eq(`${table}ID`, paramsID)
      .eq("status", false);
    if (entryError) {
      console.log(entryError, "エラー");
    }
    const entryArray = entryUser.map((user) => user.userID);

    //コンボボックス用の全ユーザデータ取得
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select(`id,familyName,firstName,familyNameKana,firstNameKana`)
      .eq("status", false);
    if (usersError) {
      console.log(usersError, "エラー");
    }
    //全ユーザデータからすでに参加している人は抜き出して新たな配列を作る
    const newUsersData = users
      .map((user) => ({
        id: user.id,
        Name: user.familyName + user.firstName,
        NameKana: user.familyNameKana + user.firstNameKana,
      }))
      .filter((user) => !entryArray.includes(user.id));
    setUsers(newUsersData);
  };

  const fetchPost = async () => {
    //コンボボックスから返されたUserIDから該当のPostIDを割り出す
    const { data: posts, error: postError } = await supabase
      .from("posts")
      .select("id")
      .eq("userID", 1)
      .eq("status", false);
    if (postError) {
      console.log(postError, "エラー");
    }
    setPost(posts[0].id);

    //スカウトを送る際のPostedByに入れる為、送信する側のPostIDを取得する
    const { data: postedBy, error: postedByError } = await supabase
      .from("posts")
      .select("id")
      .eq(`${table}ID`, paramsID)
      .eq("status", false);
    if (postedByError) {
      console.log(postError, "エラー");
    }
    setPostedID(postedBy[0].id);
  };

  //スカウトを送る
  const addHandler = async () => {
    const { data, error } = await supabase.from("messages").insert({
      postID: post,
      message: message,
      scout: true,
      isRead: false,
      isAnswered: false,
      postedBy: postedID,
      status: false,
    });
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
                <textarea
                  name="text"
                  className={styles.textSending}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                ></textarea>
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
