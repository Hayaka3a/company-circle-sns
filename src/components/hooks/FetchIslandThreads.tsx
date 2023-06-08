import React, { useEffect, useState } from "react";
import { supabase } from "../../createClient";
import { thread } from "../../types/thread";

function FetchIslandThreads(id: number, eqName: string) {
  const [threads, setThreads] = useState<thread[]>([]);
  useEffect(() => {
    const fetchThread = async () => {
      let { data: threads, error } = await supabase
        .from("threads")
        .select(`id, threadTitle,  islands(thumbnail)`)
        .eq(eqName, id)
        .eq("status", false);
      setThreads(threads as thread[]);
    };
    fetchThread();
  }, []);
  return threads;
}

export default FetchIslandThreads;
