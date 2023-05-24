import { supabase } from "../../createClient.js";

const OwnerTransferButton = ({
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
    //オーナーIDを上書き
    const { data, error } = await supabase
      .from(`${table}s`)
      .update({ ownerID: user })
      .eq("id", params);

    if (!data) return;
    if (error) {
      console.log("エラーです", error);
    }
    close();
  }

  return <button onClick={onClick}>はい</button>;
};

export default OwnerTransferButton;
