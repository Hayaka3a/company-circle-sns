import { supabase } from "../../createClient.js";

const ExileButton = ({
  table,
  params,
  user,
  close,
}: {
  close: () => void;
  table: string;
  params: number | string;
  user: number;
}) => {
  async function onClick() {
    //メンバーを削除
    const { data, error } = await supabase
      .from("userEntryStatus")
      .update({ status: true })
      .eq(`userID`, user)
      .eq(`${table}ID`, params);

    if (!data) return;
    if (error) {
      console.log("エラーです", error);
    }
    close();
  }

  return <button onClick={onClick}>はい</button>;
};

export default ExileButton;
