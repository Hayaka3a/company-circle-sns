import { supabase } from "../../createClient";

export default async function LoginHandler({
  email,
  password,
  setVisible,
  navigate,
}) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("mailAddress", email)
      .eq("password", password)
      .eq("status", false);

    if (error) {
      console.log("データベースエラー:", error.message);
      return null;
    }

    // ユーザーが見つかった場合
    if (data && data.length > 0) {
      const userId = data[0].id;

      // Cookieの有効期限1日
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 1);

      // Cookie設定
      document.cookie = `id=${userId};  expires=${expirationDate.toUTCString()}; path=/`;
      document.cookie = `loginSt=true;  expires=${expirationDate.toUTCString()}; path=/`;

      navigate("/");
      window.location.reload();
      // ユーザーが見つからなかった場合
    } else {
      setVisible(true);
      document.cookie =
        "loginSt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
  } catch (error) {
    console.log("エラー:", error);
  }
}
