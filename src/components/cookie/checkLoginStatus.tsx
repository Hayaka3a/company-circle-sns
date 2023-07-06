export default function CheckLoginStatus(loginStatus, navigate) {
  const status = loginStatus.loginSt;
  if (!status) {
    navigate("/user/login");
    window.location.reload();
  }

  return null;
}
