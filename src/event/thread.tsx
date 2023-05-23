import Thread from "../components/Thread";
import FetchEventThreads from "../components/hooks/FetchEventThreads";

export default function EventThread() {
  // イベントID仮置き
  const eventID = 2;
  // スレッドデータの取得
  const thread = FetchEventThreads(eventID, "eventID");

  return (
    <>
      <Thread thread={thread} />
    </>
  );
}
