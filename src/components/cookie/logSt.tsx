import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import CheckLoginStatus from "./checkLoginStatus";

export default function LogSt() {
  const [loginStatus] = useCookies(["loginSt"]);
  const navigate = useNavigate();

  // 未ログイン時、ログイン画面にリダイレクト
  useEffect(() => {
    CheckLoginStatus(loginStatus, navigate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
