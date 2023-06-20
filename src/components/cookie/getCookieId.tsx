import { useCookies } from "react-cookie";

export default function GetCookieID() {
  const cookies = useCookies(["id"]);

  const id = cookies[0].id;

  return id;
}
