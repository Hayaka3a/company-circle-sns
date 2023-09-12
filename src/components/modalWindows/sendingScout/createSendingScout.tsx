import styles from "../../../styles/createSendingScout.module.css";
import { supabase } from "../../../createClient";
import { useEffect, useState } from "react";
import { newUsersData } from "../../../types/sendScout";
import { useParams } from "react-router-dom";
import ConvertKanaJ from "../../changeKana";
import { scoutHandler } from "./scoutHandler";
import { scoutMessageBlur } from "./scoutMessageBlur";
import ComboBoxUserScout from "../../comboBox/comboBoxUserScout/comboBoxUserScout";

export default function CreateSendingScout({
  closeModal,
  table,
}: {
  closeModal: () => void;
  table: string;
}) {
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState<newUsersData>();
  const [post] = useState();
  const [postBy] = useState(0);
  const [islandName] = useState("");
  const [islandMembers, setIslandMembers] = useState<newUsersData>([]);
  const [empty, setEmpty] = useState("");
  const [messageError, setmessageError] = useState("");

  const params = useParams();
  const paramsID = parseInt(params.id);

  useEffect(() => {
    comboBoxData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [islandMembers]);

  const comboBoxData = async () => {
    const { data: posts, error: postError } = await supabase
      .from("posts")
      .select(`id`)
      .eq(`${table}ID`, paramsID)
      .eq("status", false);

    if (postError) {
      console.log(postError, "postsエラー");
    }
    if (!posts || posts.length === 0) {
      console.log("postByに格納するpostIDが見つかりません", posts);
    } else {
      //島またはイベントに既に参加している人のIDを取得
      const { data: entryUser, error: entryError } = await supabase
        .from("userEntryStatus")
        .select(`userID`)
        .eq(`${table}ID`, paramsID)
        .eq("status", false);
      if (entryError) {
        console.log(entryError, "entryエラー");
      }
      if (!entryUser) {
        console.log("ユーザーが見つかりません");
      } else {
        const entryArray = entryUser.map((user) => user.userID);

        //コンボボックス用の全ユーザデータ取得
        const { data: users, error: usersError } = await supabase
          .from("users")
          .select(`id,familyName,firstName,familyNameKana,firstNameKana`)
          .eq("status", false);
        if (usersError) {
          console.log(usersError, "usersエラー");
        }
        if (!users) {
          console.log("全ユーザーが見つかりません");
        } else {
          // メッセージでここからスカウトを既に送っているものを取得
          const { data: fetchedSentUser } = await supabase
            .from("messages")
            .select("*")
            .eq("scout", true)
            .eq("postedBy", posts[0].id);

          // 既に送っているメッセージのポストの情報を取得
          const postDtArray = [];
          await Promise.all(
            fetchedSentUser.map(async (post) => {
              const { data: postDt } = await supabase
                .from("posts")
                .select("*")
                .eq("id", post.postID);

              postDtArray.push(postDt[0]);
            }),
          );

          // 既に送っているユーザーの情報を取得
          const userDtArray = [];
          await Promise.all(
            postDtArray.map(async (user) => {
              const { data: userDt } = await supabase
                .from("users")
                .select("*")
                .eq("id", user.userID);

              userDtArray.push(userDt[0]);
            }),
          );

          //全ユーザデータからすでに参加している人・スカウトを既にしたことがある人は抜き出して新たな配列を作る
          const newUsersData = users
            .map((user) => ({
              id: user.id,
              Name: user.familyName + user.firstName,
              NameKana: user.familyNameKana + user.firstNameKana,
              NameKanaJ: `${ConvertKanaJ(user.familyNameKana)}+ ${ConvertKanaJ(
                user.firstNameKana,
              )}`,
            }))
            .filter(
              (user) =>
                !entryArray.includes(user.id) &&
                !userDtArray.some((u) => u.id === user.id),
            );

          setUsers(newUsersData);
        }
      }
    }
  };

  const click = async () => {
    scoutHandler({
      islandMembers,
      setEmpty,
      post,
      message,
      postBy,
      closeModal,
    });
  };

  const errorMessage = () => {
    scoutMessageBlur({ message, setmessageError });
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
            <h3 className={styles.title}>{islandName}招待を送る</h3>
            <div className={styles.input}>
              <div>
                <label htmlFor="sendUser" className="label">
                  送るユーザー(1人追加してください)
                  <span className={styles.span}>【必須】</span>
                </label>
                <ComboBoxUserScout
                  nameOptions={users}
                  htmlFor={"sendUser"}
                  setIslandMembers={(data: newUsersData) =>
                    setIslandMembers(data)
                  }
                />
                {empty && (
                  <div>
                    <span className={styles.span}>{empty}</span>
                  </div>
                )}
              </div>
              <div className={styles.box}>
                <label htmlFor="comment" className="label">
                  コメント<span className={styles.span}>【必須】</span>
                </label>
                <br />
                <textarea
                  maxLength={100}
                  name="comment"
                  id="comment"
                  className={`${styles.textSending} ${
                    messageError ? styles.errorInput : ""
                  }`}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  onBlur={errorMessage}
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
                onClick={click}
                disabled={islandMembers.length === 0 || message === ""}
                className={styles.btn}
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
