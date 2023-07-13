import { supabase } from "../../createClient";

export async function NGButton(messageID: number) {
  const { error: updateError } = await supabase
    .from("messages")
    .update({
      isRead: true,
      isAnswered: true,
      status: false,
    })
    .eq(`id`, messageID);
  if (updateError) {
    console.log(updateError, "エラー");
  } else {
    window.location.reload();
  }
}
