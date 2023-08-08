import { supabase } from "../createClient";

interface UserData {
    familyName: string;
    firstName: string;
    icon: string;
}

export default async function (userID: string, setUser: React.Dispatch<React.SetStateAction<UserData | undefined>>) {
    const { data: userData } = (await supabase
          .from("users")
          .select("*")
          .eq("status", false)
          .eq("id", userID)) as { data: UserData[] };
  
        setUser(userData[0]);
};