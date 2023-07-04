import MembersList from "../components/menberList/MembersList";
import MenubarEvent from "../components/menubarEvent";
import { useEffect, useState } from "react";
import styles from "../styles/membersList.module.css";
import { Event } from "../types/members";
import { useParams } from "react-router-dom";
import LogSt from "../components/cookie/logSt";
import { fetchAllIsEve } from "../components/fetchAllIsEve";

export default function EventMembers() {
  LogSt();
  const [eventData, setEventData] = useState<Event>();
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  // DBからデータを取得
  const params = useParams();
  const paramsID = parseInt(params.id);

  const table = "event";

  useEffect(() => {
    fetchAllIsEve({ table, paramsID, setEventData });
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
      {eventData && (
        <div className={styles.display}>
          <MenubarEvent />
          <MembersList
            table="event"
            displayData={eventData}
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
