import { useEffect, useState } from "react";
import { supabase } from "../../createClient";

function FetchEventThreads(id: number, eqName: string) {
  const [threads, setThreads] = useState([]);
  useEffect(() => {
    const fetchThread = async () => {
      let { data: threads } = await supabase
        .from("threads")
        .select(`id, threadTitle,  events(*)`)
        .eq(eqName, id)
        .eq("status", false);
      setThreads(threads);
    };
    fetchThread();
  }, []);
  return threads;
}

export default FetchEventThreads;
