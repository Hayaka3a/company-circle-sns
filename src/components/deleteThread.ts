import { supabase } from "../createClient";

export const deleteThread = async (threadId) => {
  try {
    const { error } = await supabase
      .from("threads")
      .update({ status: true })
      .eq("id", threadId);

    if (error) {
      console.error("Error updating thread:", error);
    } else {
      window.location.reload();
    }
  } catch (error) {
    console.error("Error updating thread:", error);
  }
};
