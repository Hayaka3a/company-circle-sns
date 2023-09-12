import styles from "../../../styles/menubar.module.css";
import { Link, useParams } from "react-router-dom";
import PartUseEffect from "./partUseEffect";

export default function MenubarEvent() {
  const { isJoined, event, eventImage } = PartUseEffect();

  const params = useParams();
  const paramsID = parseInt(params.id);

  return (
    <>
      <div className={styles.menubar}>
        {event && (
          <Link to={`/event/${paramsID}`} className={styles.link}>
            <img
              className={styles.icon}
              src={eventImage}
              alt="Event Thumbnail"
            />
          </Link>
        )}
        <h3 className={styles.title}>{event && event.eventName}</h3>
        {/* ユーザーがイベントに参加している場合 */}
        {isJoined && (
          <div className={styles.menuContents}>
            <div>
              <Link to={`/event/thread/${paramsID}`} className={styles.link}>
                掲示板
              </Link>
            </div>
            <div>
              <Link to={`/event/post/${paramsID}`} className={styles.link}>
                ポスト
              </Link>
            </div>
            <div>
              <Link to={`/event/members/${paramsID}`} className={styles.link2}>
                参加者一覧
              </Link>
            </div>
            <div>
              <Link to={`/event/${paramsID}`} className={styles.link2}>
                イベント詳細
              </Link>
            </div>
          </div>
        )}
        {/* ユーザーがイベントに参加してないとき */}
        {!isJoined && (
          <div className={styles.menuContents}>
            <div>
              <Link to={`/event/members/${paramsID}`} className={styles.link}>
                参加者一覧
              </Link>
            </div>
            <div>
              <Link to={`/event/${paramsID}`} className={styles.link}>
                イベント詳細
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
