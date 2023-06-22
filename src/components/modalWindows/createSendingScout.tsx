import styles from "../../styles/createSendingScout.module.css";
import { supabase } from "../../createClient";
import { useEffect, useState } from "react";
import { newUsersData } from "../../types/sendScout";
import { useParams } from "react-router-dom";
import ComboBoxUserScout from "../comboBoxUserScout";
import ConvertKanaJ from "../changeKana";

export default function CreateSendingScout({
  closeModal,
  table,
}: {
  closeModal: () => void;
  table: string;
}) {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<newUsersData>();
  const [post, setPost] = useState(0);
  const [postBy, setPostBy] = useState(0);
  const [islandName, setIslandName] = useState("");
  const [islandMembers, setIslandMembers] = useState<newUsersData>([]);
  const [error, setError] = useState("");
  const [empty, setEmpty] = useState("");
  const [messageError, setmessageError] = useState("");

  const params = useParams();
  const paramsID = parseInt(params.id);

  useEffect(() => {
    getPost();
    comboBoxData();
    fetchPost();
  }, [islandMembers]);

  //island(event)のポストIDを取得
  const getPost = async () => {
    const { data: post, error: postError } = await supabase
      .from("posts")
      .select(`id,islands(islandName)`)
      .eq(`${table}ID`, paramsID)
      .eq("status", false);
    if (postError) {
      console.log(postError, "エラー");
    }
    setPostBy(post[0].id);
    const islandN = post[0].islands as { islandName: string };
    setIslandName(islandN.islandName);
  };

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
        NameKanaJ: `${ConvertKanaJ(user.familyNameKana)}+ ${ConvertKanaJ(
          user.firstNameKana,
        )}`,
      }))
      .filter((user) => !entryArray.includes(user.id));
    setUsers(newUsersData);
  };

  const fetchPost = async () => {
    try {
      if (islandMembers && islandMembers.length > 0) {
        const { data: sentUser, error: sentUserError } = await supabase
          .from("messages")
          .select("*")
          .eq("postID", post)
          .eq("scout", true)
          .eq("postedBy", postBy);

        if (sentUserError) {
          console.error("ユーザー情報取得に失敗しました。");
        }

        if (sentUser.length > 0) {
          setError("このユーザーには既に送信済みです。");
        } else {
          // コンボボックスから返されたUserIDから該当のPostIDを割り出す
          const { data: posts, error: postError } = await supabase
            .from("posts")
            .select("id")
            .eq("userID", islandMembers[0].id)
            .eq("status", false);
          if (postError) {
            console.log(postError, "エラー");
          }
          setPost(posts[0].id);
        }
      } else {
        setError("");
      }
    } catch (error) {
      console.error("エラー発生");
    }
  };

  //スカウトを送る
  const addHandler = async () => {
    if (!islandMembers || islandMembers.length === 0) {
      setEmpty("「追加」ボタンを押下してユーザーを選択してください。");
    } else {
      const { error } = await supabase.from("messages").insert({
        postID: post,
        message: message,
        scout: true,
        isRead: false,
        isAnswered: false,
        postedBy: postBy,
        status: false,
      });
      if (error) {
        console.log(error, "エラー");
      } else {
        closeModal();
      }
    }
  };

  const messageBlur = () => {
    if (message.trim() === "") {
      setmessageError("※コメントは入力必須項目です");
    } else {
      setmessageError("");
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
            <h3 className={styles.title}>{islandName}島へ招待する</h3>
            <div className={styles.input}>
              <div>
                <label htmlFor="sendUser" className="label">
                  送るユーザー (1人追加してください)
                </label>
                <ComboBoxUserScout
                  nameOptions={users}
                  htmlFor={"sedUser"}
                  setIslandMembers={setIslandMembers}
                />
                {empty && (
                  <div>
                    <span className={styles.span}>{empty}</span>
                  </div>
                )}
                {error && (
                  <div>
                    <span className={styles.span}>{error}</span>
                  </div>
                )}
              </div>
              <div className={styles.box}>
                <label htmlFor="text" className="label">
                  コメント
                </label>
                <br />
                <textarea
                  maxLength={100}
                  name="text"
                  className={`${styles.textSending} ${
                    messageError ? styles.errorInput : ""
                  }`}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onBlur={messageBlur}
                ></textarea>
                {messageError && (
                  <div>
                    <span className={styles.span}>{messageError}</span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <button
                onClick={addHandler}
                disabled={islandMembers.length === 0 || !message.trim()}
                className={`${styles.btn} ${
                  (islandMembers.length === 0 || !message.trim()) &&
                  styles.disabled
                }`}
              >
                送信
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
