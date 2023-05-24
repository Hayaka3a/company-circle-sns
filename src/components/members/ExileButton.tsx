import { supabase } from "../../createClient.js";

const ExileButton = ({ table, params, text, user }) => {
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
  }

  return <button onClick={onClick}>{text}</button>;
};

export default ExileButton;
