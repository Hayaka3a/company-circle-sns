import styles from "../../styles/createSendingScout.module.css";
import { supabase } from "../../createClient";
import { useEffect, useState } from "react";
import { newUsersData } from "../../types/sendScout";
import { useParams } from "react-router-dom";
import ComboBoxUser from "../comboBoxUser";
import ConvertKanaJ from "../changeKana";
import { isReturnStatement } from "typescript";

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
  const [islandMembers, setIslandMembers] = useState<newUsersData>();

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
    if (islandMembers) {
      //コンボボックスから返されたUserIDから該当のPostIDを割り出す
      const { data: posts, error: postError } = await supabase
        .from("posts")
        .select("id")
        .eq("userID", islandMembers[0].id)
        .eq("status", false);
      if (postError) {
        console.log(postError, "エラー");
      }
      setPost(posts[0].id);
    } else {
      return;
    }
  };

  //スカウトを送る
  const addHandler = async () => {
    const { data, error } = await supabase.from("messages").insert({
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
                <ComboBoxUser
                  nameOptions={users}
                  htmlFor={"sedUser"}
                  setIslandMembers={setIslandMembers}
                />
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
              <button onClick={addHandler}>送信</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
