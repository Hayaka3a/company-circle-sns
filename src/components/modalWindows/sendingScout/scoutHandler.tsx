import { supabase } from "../../../createClient";

//スカウトを送る
export const scoutHandler = async ({
  islandMembers,
  setEmpty,
  post,
  message,
  postBy,
  closeModal,
}) => {
  if (!islandMembers || islandMembers.length === 0) {
    setEmpty("「追加」ボタンを押下してユーザーを選択してください");
  } else {
    const { error } = await supabase.from("messages").insert({
      postID: post,
      message: message,
      scout: true,
      isRead: false,
      isAnswered: false,
      postedBy: postBy,
      status: false,
    });
    if (error) {
      console.log(error, "エラー");
    } else {
      closeModal();
    }
  }
};
