import { supabase } from "../createClient";

// 削除完了ウィンドウを閉じると、データが論理削除されてトップ画面に遷移する
export default async function IslandDone(islandID, inputValue, navigate, setIsAfterDeleteOpen) {
    setIsAfterDeleteOpen(false);

    // posts, islands, tagStatusテーブルのstatusをtrueに変更
    const { data, error } = await supabase
      .from("islands")
      .select("islandName,ownerID")
      .eq("id", islandID)
      .eq("status", false);

    if (error) {
      console.log("Error fetching islands data", error);
    }
    if (data && data.length > 0) {
      const islandName = data[0].islandName;
      const owner = data[0].ownerID;

      if (islandName === inputValue) {
        const { error: islandsError } = await supabase
          .from("islands")
          .update({ status: "true" })
          .eq("id", islandID);

        const { error: islandsTagError } = await supabase
          .from("tagStatus")
          .update({ status: "true" })
          .eq("islandID", islandID);

        const { error: islandStatusError } = await supabase
          .from("userEntryStatus")
          .update({ status: "true" })
          .eq("islandID", islandID);

        const { error: postsError } = await supabase
          .from("posts")
          .update({ status: "true" })
          .eq("islandID", islandID);

        const { error: eventError } = await supabase
          .from("events")
          .update({ status: "true" })
          .eq("ownerID", owner);

        if (
          islandsError ||
          islandsTagError ||
          islandStatusError ||
          postsError ||
          eventError
        ) {
          console.error(
            "Error changing status :",
            islandsError || islandsTagError || islandStatusError || postsError,
          );
          // Cookie情報の削除
          if (document.cookie !== "") {
            let expirationDate = new Date("1999-12-31T23:59:59Z");
            document.cookie = `id=; expires=${expirationDate.toUTCString()}; path=/;`;
            document.cookie = `loginSt=; expires=${expirationDate.toUTCString()}; path=/;`;
          }
        }

        console.log("Change status of islands successfully.");
        navigate("/");
        window.location.reload();
      }
    }
};