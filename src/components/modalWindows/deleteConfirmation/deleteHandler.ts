import { supabase } from "../../../createClient";

export const deleteHandler = async ({
  category,
  user,
  table,
  params,
  closeModal,
}) => {
  if (category === "脱退する") {
    // 自分が脱退する;
    const { error } = await supabase
      .from("userEntryStatus")
      .update({ status: true })
      .eq(`userID`, user)
      .eq(`${table}ID`, params);

    if (error) {
      console.error(error.message);
    } else {
      closeModal();
      window.location.reload();
    }
  } else if (category === "追放") {
    //メンバーを削除
    const { error } = await supabase
      .from("userEntryStatus")
      .update({ status: true })
      .eq(`userID`, user)
      .eq(`${table}ID`, params);

    if (error) {
      console.error(error.message, "追放エラー");
    } else {
      closeModal();
      window.location.reload();
    }
  } else if (category === "譲渡") {
    //オーナー権限を譲渡する
    const { error } = await supabase
      .from(`${table}s`)
      .update({ ownerID: user })
      .eq("id", params);

    if (error) {
      console.error(error.message);
    } else {
      closeModal();
      window.location.reload();
    }
  }
};
