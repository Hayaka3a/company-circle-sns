import React, { useEffect, useState } from "react";
import MenubarIsland from "../components/menubarIsland";
import styles from "../styles/island/islandDetail.module.css";
import CreateSendingMessage from "../components/modalWindows/createSendingMessage";
import CreateResidentApplication from "../components/modalWindows/createResidentApplication";
import { Link, useNavigate, useNavigation, useParams } from "react-router-dom";
import { supabase } from "../createClient";

export default function IslandDetail() {
    const [ isOpen, setIsOpen ] = useState(false);
    const [ isResidentOpen, setIsResidentOpen ] = useState(false);
    const navigate = useNavigate();
    const islandId = useParams();
    const [islandDetail, setIslandDetail] = useState(null); // 取得した島の詳細情報を保持する状態変数

    useEffect(() => {
      fetchIslandDetail();
    }, []);
  
    const fetchIslandDetail = async () => {
      const { data, error } = await supabase
        .from('islands')
        .select('*')
        .eq('id', islandId.id); // 島のIDに応じてフィルタリングする（islandId.idは該当する島のID）
  
      if (error) {
        console.error('島の詳細情報の取得に失敗しました:', error);
        return;
      }
  
      if (data.length === 0) {
        console.warn('該当する島の詳細情報が見つかりませんでした。');
        return;
      }
  
      const islandDetail = data[0]; // 最初のデータを取得（仮定）
  
      console.log('島の詳細情報:', islandDetail);
      setIslandDetail(islandDetail); // 島の詳細情報を状態変数にセット
    };


    // 住民申請を押した際の小窓画面（モーダルウィンドウ）の開閉
    // isResidentOpenの値がtrueの時だけ小窓画面をレンダリング（表示）する
    const openResindentModal = () => {
      setIsResidentOpen(true);
    };

    const closeResidentModal = () => {
      setIsResidentOpen(false);
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
      navigate("/island/edit");
      window.location.reload();
    }
  return (
      <div className={styles.flex}>
        <MenubarIsland thumbnail="/login/loginCounter.png" />
        <div className={styles.island_detail}>
          <img src="/island/island_icon.png" alt="サークルアイコン" />
            <h2>{islandDetail && islandDetail.islandName}</h2>
            <p className={styles.textDetail}>{islandDetail && islandDetail.detail}</p>

            <div className={styles.btn}>
              <button onClick={openResindentModal}>住民申請</button>
              {isResidentOpen && <CreateResidentApplication closeResidentModal={closeResidentModal} />}
              <button onClick={openModal}>メッセージを送る</button>
              {isOpen && <CreateSendingMessage closeModal={closeModal} />}
            </div>
            
              <button id={styles.edit_btn} onClick={Handler}>編集・削除</button>
        </div>
      </div>    
  );
}
