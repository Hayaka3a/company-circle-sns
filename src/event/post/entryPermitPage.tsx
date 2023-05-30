import MenubarIsland from "../../components/menubarIsland";
import EntryPermit from "../../components/entryPermit";
import styles from "../../styles/entryPermit.module.css";
import LogSt from "../../components/cookie/logSt";

export default function EventEntryPermitPage() {
  LogSt();
  return (
    <div className={styles.display}>
      <MenubarIsland thumbnail="a" />
      <EntryPermit table={"event"} />
    </div>
  );
}
