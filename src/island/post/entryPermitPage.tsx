import MenubarIsland from "../../components/menubarIsland";
import EntryPermit from "../../components/entryPermit";
import styles from "../../styles/entryPermit.module.css";
export default function IslandEntryPermitPage() {
  return (
    <div className={styles.display}>
      <MenubarIsland thumbnail="a" />
      <EntryPermit table={"island"} />
    </div>
  );
}
