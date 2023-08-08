import { useEffect, useState } from "react";
import MenubarIsland from "../components/menubar/menubarIsland/menubarIsland";
import styles from "../styles/island/islandDetail.module.css";
import CreateSendingMessage from "../components/modalWindows/createSendingMessage";
import CreateResidentApplication from "../components/modalWindows/createResidentApplication";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../createClient";
import LogSt from "../components/cookie/logSt";
import GetCookieID from "../components/cookie/getCookieId";
import FetchIslandDetail from "../components/fetchIslandDetail";
import FetchIslandPosts from "../components/fetchIslandPost";
import FetchTags from "../components/fetchTags";

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
    fetchIslandDetailData();
    fetchIslandPostData();
    fetchTagsData();
  }, []);

  const fetchIslandDetailData = async () => {
    await FetchIslandDetail(islandId, userId, setButton, setIslandDetail, setIslandImage);
  };

  // すでに住民申請を送っているか確認確認
  const fetchIslandPostData = async () => {
    await FetchIslandPosts(userId, islandId, setAlreadyError);
  };

  const fetchTagsData = async () => {
    await FetchTags(islandId, setTags);
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
