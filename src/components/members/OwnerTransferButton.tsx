import { supabase } from "../../createClient.js";

const OwnerTransferButton = ({ table, params, text, user, onclick }) => {
  async function onClick() {
    //オーナーIDを上書き
    const { data, error } = await supabase
      .from(`${table}s`)
      .update({ ownerID: user })
      .eq("id", params);

    if (!data) return;
    if (error) {
      console.log("エラーです", error);
    }
    onClick();
  }

  return <button onClick={onClick}>{text}</button>;
};

export default OwnerTransferButton;
