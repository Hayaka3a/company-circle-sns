import { useState, useEffect } from "react";
import AddressCheck from "../components/userRegistration/AddressCheck";
import styles from "../styles/newUser.module.css";
import NameCheck from "../components/userRegistration/NameCheck";
import NameKanaCheck from "../components/userRegistration/NameKanaCheck";
import PwCheck from "../components/userRegistration/PwCheck";
import RadioChange from "../components/userRegistration/RadioChange";
import { useForm } from "react-hook-form";
import LogSt from "../components/cookie/logSt";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function NewUser() {
  const navigate = useNavigate();
  const [loginStatus] = useCookies(["loginSt"]);

  // ログイン済みの場合、トップページにリダイレクト
  useEffect(() => {
    const status = loginStatus.loginSt;
    if (status == "true") {
      navigate("/");
      window.location.reload();
    }
  }, []);
  const [email, setEmail] = useState("");
  // const [familyName, setFamilyName] = useState("");
  // const [firstName, setFirstName] = useState("");
  const [familyNameKana, setFamilyNameKana] = useState("");
  const [firstNameKana, setFirstNameKana] = useState("");
  const [pw, setPw] = useState("");
  const [comPw, setComPw] = useState("");
  const [radio, setRadio] = useState("Java");
  const [imageUrl, setImageUrl] = useState("/user/tanukiti.png");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  return (
    <div className={styles.background}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.box}>
          <div className={styles.allContents}>
            <h2>新規登録</h2>
            <div className={styles.tableCovered}>
              <table className={styles.table}>
                <tr className={styles.tr}>
                  <th className={styles.th}>
                    氏名<span className={styles.span}>【必須】</span>
                  </th>
                  <td className={styles.td}>
                    {/* <NameCheck
                    familyName={familyName}
                    setFamilyName={setFamilyName}
                    firstName={firstName}
                    setFirstName={setFirstName}
                  /> */}
                    <input
                      type="text"
                      className={`${styles.inputA}`}
                      maxLength={300}
                      onSubmit={onSubmit}
                      {...register("familyName")}
                    />
                    <input
                      type="text"
                      className={`${styles.inputB} `}
                      maxLength={300}
                      onSubmit={onSubmit}
                      {...register("firstName")}
                    />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>
                    カナ<span className={styles.span}>【必須】</span>
                  </th>
                  <td className={styles.td}>
                    {/* <NameKanaCheck
                      familyNameKana={familyNameKana}
                      setFamilyNameKana={setFamilyNameKana}
                      firstNameKana={firstNameKana}
                      setFirstNameKana={setFirstNameKana}
                    /> */}
                    <input
                      type="text"
                      className={`${styles.inputA}`}
                      maxLength={300}
                      onSubmit={onSubmit}
                      {...register("familyNameKana")}
                    />
                    <input
                      type="text"
                      className={`${styles.inputB} `}
                      maxLength={300}
                      onSubmit={onSubmit}
                      {...register("firstNameKana")}
                    />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>
                    メールアドレス<span className={styles.span}>【必須】</span>
                  </th>
                  <td className={styles.td}>
                    <AddressCheck address={email} setAddress={setEmail} />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>
                    パスワード<span className={styles.span}>【必須】</span>
                  </th>
                  <td className={styles.td}>
                    <PwCheck pw={pw} setPw={setPw} com={""} />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>
                    確認パスワード<span className={styles.span}>【必須】</span>
                  </th>
                  <td className={styles.td}>
                    <PwCheck pw={comPw} setPw={setComPw} com={pw} />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>アイコン</th>
                  <td className={styles.imgSide}>
                    <p className={styles.icon} id="img"></p>
                    <div className={styles.faileCenter}>
                      <input
                        type="file"
                        id="thumbnail"
                        className={styles.inputA}
                        onChange={handleFileChange}
                      />
                    </div>
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>
                    社員番号<span className={styles.span}>【必須】</span>
                  </th>
                  <td className={styles.td}>
                    {/* <PwCheck pw={comPw} setPw={setComPw} com={pw} /> */}
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>
                    職種<span className={styles.span}>【必須】</span>
                  </th>
                  <td className={styles.td}>
                    <RadioChange radio={radio} setRadio={setRadio} />
                  </td>
                </tr>
              </table>
            </div>

            <button type="submit">新しい島生活を始める</button>
          </div>
        </div>
      </form>
    </div>
  );
}
