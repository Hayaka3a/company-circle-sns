import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import UserRegistration from "../components/UserRegistration";

export default function NewUser() {
  const navigate = useNavigate();
  const [loginStatus] = useCookies(["loginSt"]);

  // ログイン済みの場合、トップページにリダイレクト
  useEffect(() => {
    const status = loginStatus.loginSt;
    if (status === "true") {
      navigate("/");
      window.location.reload();
    }
  }, []);
  return (
    <>
      <UserRegistration />
    </>
  );
}
