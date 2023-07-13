import { useEffect, useState } from "react";
import MembersList from "../components/menberList/MembersList";
import MenubarIsland from "../components/menubar/menubarIsland";
import styles from "../styles/membersList.module.css";
import { Island } from "../types/members";
import { useParams } from "react-router-dom";
import LogSt from "../components/cookie/logSt";
import { fetchAllIsEve } from "../components/fetchAllIsEve";

export default function IslandMembers() {
  LogSt();
  const [islandData, setIslandData] = useState<Island>();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  // DBからデータを取得
  const params = useParams();
  const paramsID = parseInt(params.id);

  const table = "island";

  useEffect(() => {
    fetchAllIsEve({ table, paramsID, setIslandData });
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

  return (
    <>
      {islandData && (
        <div className={styles.display}>
          <MenubarIsland />
          <MembersList
            table="island"
            displayData={islandData}
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
