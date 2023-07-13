import { supabase } from "../../createClient";

export async function OKButton(
  messageID: number,
  userID: number,
  table: string,
  paramsID: number,
) {
  const { error: updateError } = await supabase
    .from("messages")
    .update({
      isRead: true,
      isAnswered: true,
    })
    .eq(`id`, messageID);

  if (updateError) {
    console.log(updateError, "エラー");
  }

  //島の場合
  if (table === "island") {
    const { error: entryPostError } = await supabase
      .from("userEntryStatus")
      .insert({ userID: userID, islandID: paramsID, status: false });

    if (entryPostError) {
      console.log(entryPostError, "エラー");
    } else {
      // 難民のeventIDを取得
      const { data: existingEntryStatus } = await supabase
        .from("userEntryStatus")
        .select("id, eventID")
        .eq("userID", userID)
        .eq("status", false);

      // 島の開催イベントIDを取得
      const { data: islandEvent } = await supabase
        .from("userEntryStatus")
        .select("id, eventID")
        .eq("islandID", paramsID)
        .eq("status", false);

      for (const existingEntry of existingEntryStatus) {
        const matchingEntry = islandEvent.find(
          (event) => event.eventID === existingEntry.eventID,
        );

        if (matchingEntry && matchingEntry.eventID !== null) {
          const { id } = existingEntry;

          // existingEntryデータのidごとにデータを更新
          await supabase
            .from("userEntryStatus")
            .update({ status: true })
            .eq("id", id);
        }
      }

      window.location.reload();
    }
  }

  //イベントの場合
  else {
    const { error: entryPostError } = await supabase
      .from("userEntryStatus")
      .insert({ userID: userID, eventID: paramsID, status: false });
    if (entryPostError) {
      console.log(entryPostError, "エラー");
    } else {
      window.location.reload();
    }
  }
}
