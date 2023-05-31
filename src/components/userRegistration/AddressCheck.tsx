import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../styles/newUser.module.css";
import { supabase } from "../../createClient";

export default function AddressCheck({
  address,
  setAddress,
}: {
  address: string;
  setAddress: Dispatch<SetStateAction<string>>;
}) {
  const [addressError, setAddressError] = useState("");
  const [addressAlreadyError, setAddressAlreadyError] = useState("");

  const handleIslandMailChange = (e) => {
    setAddress(e.target.value);
    // 一文字でも入力されたらエラー削除
    if (addressError) {
      setAddressError("");
    }
    // 重複エラーも非表示にする
    if (addressAlreadyError) {
      setAddressAlreadyError("");
    }
  };

  const handleBlur = async () => {
    if (address.trim() === "") {
      setAddressError("※メールアドレスは入力必須項目です");
    } else {
      setAddressError("");
      // クエリを実行してメールアドレスの重複チェック
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("mailAddress", address);
      if (error) {
        console.error("クエリエラー:", error.message);
      } else {
        if (data.length > 0) {
          setAddressAlreadyError("メールアドレスは既に登録済です");
        }
      }
    }
  };
  return (
    <>
      <input
        type="text"
        className={`${styles.address} ${addressError ? styles.errorInput : ""}`}
        maxLength={100}
        value={address}
        onChange={handleIslandMailChange}
        onBlur={handleBlur}
      />

      {addressError && (
        <div>
          <span className={styles.span}>{addressError}</span>
        </div>
      )}
      {addressAlreadyError && (
        <div>
          <span className={styles.span}>{addressAlreadyError}</span>
        </div>
      )}
    </>
  );
}
