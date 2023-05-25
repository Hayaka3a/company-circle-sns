import MenubarIsland from "../../components/menubarIsland";
import EntryPermit from "../../components/post/entryPermit";
import styles from "../../styles/entryPermit.module.css";
export default function EntryPermitPage() {
  return (
    <div className={styles.display}>
      <MenubarIsland thumbnail="a" />
      <EntryPermit />
    </div>
  );
}
