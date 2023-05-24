import { supabase } from "../../createClient.js";

const LeaveButton = ({ table, params, text, user }) => {
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
  }

  return <button onClick={onClick}>{text}</button>;
};

export default LeaveButton;
