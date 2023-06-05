import MenubarIsland from "../../components/menubarIsland";
import EntryPermit from "../../components/entryPermit";
import styles from "../../styles/entryPermit.module.css";
import LogSt from "../../components/cookie/logSt";

export default function IslandEntryPermitPage() {
  LogSt();
  return (
    <div className={styles.display}>
      <MenubarIsland />
      <EntryPermit table={"island"} />
    </div>
  );
}
