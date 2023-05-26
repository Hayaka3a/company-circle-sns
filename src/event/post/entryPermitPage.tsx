import MenubarIsland from "../../components/menubarIsland";
import EntryPermit from "../../components/post/entryPermit";
import styles from "../../styles/entryPermit.module.css";
export default function EventEntryPermitPage() {
  return (
    <div className={styles.display}>
      <MenubarIsland thumbnail="a" />
      <EntryPermit table={"event"} />
    </div>
  );
}
