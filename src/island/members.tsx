import { useEffect, useState } from "react";
import MembersList from "../components/MembersList";
import MenubarIsland from "../components/menubarIsland";
import styles from "../styles/membersList.module.css";
import { supabase } from "../createClient.js";
import { Island } from "../types/members";
import { useParams } from "react-router-dom";
import LogSt from "../components/cookie/logSt";

export default function IslandMembers() {
  LogSt();
  const [displayData, setDisplayData] = useState<Island>();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  // DBからデータを取得
  const params = useParams();
  const paramsID = parseInt(params.id);
  useEffect(() => {
    fetchData();
  }, [paramsID]);

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  const openModal2 = () => {
    setModal2(true);
  };
  const closeModal2 = () => {
    setModal2(false);
  };

  async function fetchData() {
    const { data, error } = await supabase
      .from("islands")
      .select("*")
      .eq(`id`, paramsID)
      .eq(`status`, false);

    // データ取得時のエラー処理
    if (!data) return;
    if (error) {
      console.log(error);
    }

    const island = data[0] as Island;
    setDisplayData(island);
  }
  return (
    <>
      {displayData && (
        <div className={styles.display}>
          <MenubarIsland thumbnail={displayData.thumbnail} />
          <MembersList
            table="island"
            displayData={displayData}
            open={openModal}
            close={closeModal}
            close2={closeModal2}
            open2={openModal2}
            modal={modal}
            modal2={modal2}
          />
        </div>
      )}
    </>
  );
}
