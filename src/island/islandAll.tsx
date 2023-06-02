import { useNavigate } from "react-router-dom";
import LogSt from "../components/cookie/logSt";
import styles from "../styles/island/all.module.css";
import { supabase } from "../createClient";
import MenubarIsland from "../components/menubarIsland";

export default function IslandAll() {
  LogSt();
  const navigate = useNavigate();
  return (
    <div className={styles.flex}>
      <MenubarIsland />
      <div className={styles.all}></div>
    </div>
  );
}
