// 画像ファイル選択したら、表示画像に反映

import { supabase } from "../../createClient";

export default async function HandleFileChange(
  event: React.ChangeEvent<HTMLInputElement>,
  setImageUrl: React.Dispatch<React.SetStateAction<string>>,
) {
  if (!event.target.files || event.target.files.length === 0) {
    // 画像が選択されていないのでreturn
    return;
  }

  const file = event.target.files?.[0];
  const random = Math.floor(Math.random() * 10000);
  const filePath = `${file.name}${random}`; // 画像の保存先のpathを指定
  const { error } = await supabase.storage
    .from("islandIcon")
    .upload(filePath, file);
  if (error) {
    console.log(error, "画像追加エラー", filePath);
  }

  const { data } = await supabase.storage
    .from("islandIcon")
    .getPublicUrl(filePath);
  setImageUrl(data.publicUrl);
}
