import { supabase } from "../../createClient";
// データベースから全ユーザー名前取得

export default function FetchUsers(ConvertKanaJ, setUserOptions) {
  const fetchUsers = async () => {
    let { data, error } = await supabase
      .from("users")
      .select()
      .eq("status", false);
    if (error) {
      console.error("Error fetching users:", error.message);
    } else {
      const users: {
        id: number;
        Name: string;
        NameKana: string;
        NameKanaJ: string;
      }[] = data?.map((user) => ({
        id: user.id,
        Name: `${user.familyName} ${user.firstName}`,
        NameKana: `${user.familyNameKana} ${user.firstNameKana}`,
        NameKanaJ: `${ConvertKanaJ(user.familyNameKana)} ${ConvertKanaJ(
          user.firstNameKana,
        )}`,
      }));
      setUserOptions(users);
    }
  };
  fetchUsers();
}
