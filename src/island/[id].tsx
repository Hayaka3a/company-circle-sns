import { useEffect, useState } from "react";
import MenubarIsland from "../components/menubarIsland";
import styles from "../styles/island/islandDetail.module.css";
import CreateSendingMessage from "../components/modalWindows/createSendingMessage";
import CreateResidentApplication from "../components/modalWindows/createResidentApplication";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import LogSt from "../components/cookie/logSt";
import GetCookieID from "../components/cookie/getCookieId";

export default function IslandDetail() {
  LogSt();
  const [isOpen, setIsOpen] = useState(false);
  const [alreadyError, setAlreadyError] = useState("");
  const [isResidentOpen, setIsResidentOpen] = useState(false);
  const navigate = useNavigate();
  const islandId = useParams();
  const userId = GetCookieID();
  const [button, setButton] = useState(true);
  const [islandDetail, setIslandDetail] = useState(null); // 取得した島の詳細情報を保持する状態変数
  const [islandImage, setIslandImage] = useState(
    "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
  );
  const [tags, setTags] = useState([]);

  useEffect(() => {
    fetchIslandDetail();
    fetchIslandPost();
    fetchTags();
  }, []);

  const fetchIslandDetail = async () => {
    const { data, error } = await supabase
      .from("islands")
      .select("*")
      .eq("id", islandId.id) // 島のIDに応じてフィルタリングする（islandId.idは該当する島のID）
      .eq("status", false);

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id")
      .eq("id", data[0].ownerID);

    const owner = user[0].id.toString();

    // ownerじゃない人には「編集・削除」ボタン機能を表示させない
    if (owner !== userId) {
      setButton(false);
    }
    if (userError) {
      console.error("owner情報の取得に失敗しました:", error);
    }

    if (error) {
      console.error("島の詳細情報の取得に失敗しました:", error);
      return;
    }
    if (data.length === 0) {
      console.warn("該当する島の詳細情報が見つかりませんでした。");
      return;
    }

    const islandDetail = data[0]; // 最初のデータを取得（仮定）
    setIslandDetail(islandDetail); // 島の詳細情報を状態変数にセット
    if (islandDetail.thumbnail) {
      setIslandImage(islandDetail.thumbnail);
    }
  };

  // すでに住民申請を送っているか確認確認
  const fetchIslandPost = async () => {
    // ユーザーのポスト番号取得
    const { data, error } = await supabase
      .from("posts")
      .select("id")
      .eq("userID", userId)
      .eq("status", false);

    if (error) {
      console.log("ユーザーポスト番号取得失敗");
    }
    // ユーザーが送信したメッセージ取得
    const { data: message, error: messageError } = await supabase
      .from("messages")
      .select("*")
      .eq("postedBy", data[0].id)
      .eq("isAnswered", false)
      .eq("status", false);

    const appMsg = message.filter((msg) => msg.message === "参加申請");

    // 島ポスト番号取得
    if (appMsg.length > 0) {
      const { data: island, error: islandError } = await supabase
        .from("posts")
        .select("*")
        .eq("islandID", Number(islandId.id))
        .eq("status", false);

      if (islandError) {
        console.log("島ポスト番号取得失敗");
      }

      // 島ポスト番号が送信済みの参加申請のpostIDと同じだった場合に「住民申請」ボタンをグレーアウトし、「すでに申請済みです」のエラーを表示させる
      const matchingAppMsg = appMsg.find((msg) => msg.postID === island[0].id);
      if (matchingAppMsg) {
        setAlreadyError("すでに住民許可申請を送っています");
      }
    }
    if (messageError) {
      console.log("ユーザー送信メッセージ一覧取得失敗");
    }
  };

  const fetchTags = async () => {
    const { data: tag, error: tagError } = await supabase
      .from("tagStatus")
      .select("*,tags(*)")
      .eq("islandID", Number(islandId.id));
    if (tagError) {
      console.log(tagError, "タグの取得に失敗しました");
    }
    if (!tag) {
      console.log("タグは見つかりませんでした");
    } else {
      setTags(tag);
    }
  };

  // 住民申請を押した際の小窓画面（モーダルウィンドウ）の開閉
  // isResidentOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openResindentModal = () => {
    setIsResidentOpen(true);
  };

  const closeResidentModal = () => {
    setIsResidentOpen(false);
    window.location.reload();
  };

  // メッセージを送るを押した際の小窓画面（モーダルウィンドウ）の開閉
  // isOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const Handler = () => {
    navigate(`/island/edit/${islandId.id}`);
    window.location.reload();
  };
  return (
    <div className={styles.flex}>
      <MenubarIsland />
      <div className={styles.back}>
        <div className={styles.detail}>
          {islandDetail && (
            <img
              src={islandImage}
              alt="サークルアイコン"
              className={styles.icon}
            />
          )}
          <h2 className={styles.title}>
            {islandDetail && islandDetail.islandName}島
          </h2>
          <div className={styles.tagArea}>
            {tags.map((tag) => {
              return (
                <div className={styles.ribbon3} key={tag.id}>
                  <h3>{tag.tags.tagName}</h3>
                </div>
              );
            })}
          </div>
          <p className={styles.textDetail}>
            {islandDetail && islandDetail.detail}
          </p>
          <div>
            {alreadyError && (
              <div>
                <span className={styles.span}>{alreadyError}</span>
              </div>
            )}
            <button
              onClick={openResindentModal}
              className={`${styles.btn1} ${
                alreadyError || button ? styles.disabled : ""
              }`}
              disabled={alreadyError ? true : false}
            >
              住民申請
            </button>
            {isResidentOpen && (
              <CreateResidentApplication
                closeModal={closeResidentModal}
                table="island"
              />
            )}
            <button onClick={openModal} className={styles.btn2}>
              メッセージを送る
            </button>
            {isOpen && (
              <CreateSendingMessage closeModal={closeModal} table="island" />
            )}
          </div>
          {button && (
            <div className={styles.editbox}>
              <button id={styles.edit_btn} onClick={Handler}>
                編集・削除
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
