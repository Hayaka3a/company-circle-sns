import { supabase } from "../../createClient";

// スレッド名編集「保存」ボタン
export const handleSaveClick = async ({
  newTitle,
  id,
  setThreadTitle,
  setIsEditing,
}) => {
  const { error } = await supabase
    .from("threads")
    .update({ threadTitle: newTitle })
    .eq("id", id)
    .eq("status", false);
  if (error) {
    console.error("Thread title update failed:", error);
  } else {
    setThreadTitle(newTitle);
    setIsEditing(false);
  }
};
