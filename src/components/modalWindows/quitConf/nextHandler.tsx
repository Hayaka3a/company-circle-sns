import { supabase } from "../../../createClient";

export default function NextHandler({
  inputValue,
  nextOpen2,
  setNotExist,
  userId,
}: {
  inputValue: string;
  userId: string;
  nextOpen2: () => void;
  setNotExist: (message: string) => void;
}) {
  const nextHandler = async () => {
    if (inputValue) {
      const { data } = await supabase
        .from("users")
        .select("familyName, firstName")
        .eq("id", Number(userId))
        .eq("status", false);

      if (data && data.length > 0) {
        const familyName = data[0].familyName;
        const firstName = data[0].firstName;

        const fullName = familyName + firstName;

        if (fullName !== inputValue) {
          setNotExist("入力された名前が間違っています");
        } else {
          nextOpen2();
        }
      }
    }
  };

  nextHandler();

  return null;
}
