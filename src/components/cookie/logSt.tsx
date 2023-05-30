import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function LogSt() {
  const [loginStatus] = useCookies(["loginSt"]);
  const navigate = useNavigate();

  // 未ログイン時、ログイン画面にリダイレクト
  useEffect(() => {
    const status = loginStatus.loginSt;
    if (!status) {
      navigate("/user/login");
      window.location.reload();
    }
  }, []);
}
