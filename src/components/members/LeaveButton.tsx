import { supabase } from "../../createClient.js";

const LeaveButton = ({
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
  console.log(user);
  async function onClick() {
    //自分が脱退する
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

export default LeaveButton;
