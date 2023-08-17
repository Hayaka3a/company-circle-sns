import { useState, useEffect, ReactNode } from "react";
import styles from "../styles/newUser.module.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../createClient";

export default function UserRegistration() {
  const navigate = useNavigate();

  const [imageUrl, setImageUrl] = useState(
    "https://tfydnlbfauusrsxxhaps.supabase.co/storage/v1/object/public/userIcon/tanuki.PNG1351?t=2023-06-05T07%3A40%3A07.886Z",
  );
  const [usersMail, setUsersMail] = useState([]);
  const [empCode, setEmpCode] = useState([]);

  //メールアドレスと社員番号が既に登録されているか確認するために取得する
  useEffect(() => {
    fetchUsers();

    //ReactHookFormで使用
  }, []);

  const fetchUsers = async () => {
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select(`mailAddress,employeeCode`)
      .eq("status", false);
    if (usersError) {
      console.log(usersError, "fetchUsersError");
    } else {
      //メールアドレスを抜き出してstateに保存
      const mail = users.map((user) => user.mailAddress);
      setUsersMail(mail);

      //社員番号を抜き出してJSONに変換してから保存
      const stringData = users.map((user) => JSON.stringify(user.employeeCode));
      setEmpCode(stringData);
    }
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (sendData: any) => {
    //送信するデータを成形
    delete sendData.conPw;
    sendData.creratedBy = "システム";
    sendData.icon = imageUrl;

    if (sendData.department === "office") {
      sendData.department = "内勤";
    } else if (sendData.department === "sales") {
      sendData.department = "営業";
    }

    //usersテーブルに追加
    const { error: usersError } = await supabase.from("users").insert(sendData);
    if (usersError) {
      console.log(usersError, "insertUsersエラー");
    } else {
      // 成功したら作成されたユーザーのIDを取得
      const { data: getUserData, error: getUserError } = await supabase
        .from("users")
        .select("id")
        .eq("employeeCode", sendData.employeeCode)
        .eq("status", false);

      if (getUserError) {
        console.log(getUserError, "getUserエラー");
      } else {
        // postテーブルに追加
        const post = {
          userID: getUserData[0].id,
          status: false,
        };
        const { error: postError } = await supabase.from("posts").insert(post);
        if (postError) {
          console.log(postError, "insertPostsエラー");
        } else {
          //すべて成功したらログイン画面に遷移
          navigate("/user/login");
          window.location.reload();
        }
      }
    }
  };

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length === 0) {
      // 画像が選択されていないのでreturn
      return;
    }
    const file = event.target.files?.[0];
    const random = Math.floor(Math.random() * 10000);
    const filePath = `${file.name}${random}`; // 画像の保存先のpathを指定
    const { error } = await supabase.storage
      .from("userIcon")
      .upload(filePath, file);
    if (error) {
      console.log(error, "画像追加エラー", filePath);
    } else {
      const { data } = supabase.storage.from("userIcon").getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
    }
  };

  //職種選択用データ
  const [category] = useState([
    { id: "Java", name: "Java" },
    { id: "ML", name: "ML" },
    { id: "CL", name: "CL" },
    { id: "QA", name: "QA" },
    { id: "PHP", name: "PHP" },
    { id: "FR", name: "FR" },
    { id: "sales", name: "営業" },
    { id: "office", name: "内勤" },
  ]);

  return (
    <div className={styles.background}>
      <div className="loginPageButton">
        <Link to={"/user/login"}>
          <button>ログインページへ戻る</button>
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={styles.form}
        role="form"
      >
        <div className={styles.box}>
          <div className={styles.allContents}>
            <h2>新規登録</h2>
            <div className={styles.tableCovered}>
              <table className={styles.table}>
                <tbody>
                  <tr className={styles.tr}>
                    <th className={styles.th}>
                      氏名<span className={styles.span}>【必須】</span>
                    </th>
                    <td className={styles.td}>
                      <input
                        role="textbox"
                        name="name"
                        type="text"
                        className={`${styles.inputA}`}
                        maxLength={12}
                        onSubmit={onSubmit}
                        {...register("familyName", {
                          required: "氏名(姓)は必須項目です。",
                        })}
                      />
                      <input
                        role="textbox"
                        name="name"
                        type="text"
                        className={`${styles.inputB} `}
                        maxLength={12}
                        onSubmit={onSubmit}
                        {...register("firstName", {
                          required: "氏名(名)は必須項目です。",
                        })}
                      />
                      <p className={styles.error}>
                        {errors.familyName?.message as ReactNode}
                        {errors.firstName?.message as ReactNode}
                      </p>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <th className={styles.th}>
                      カナ<span className={styles.span}>【必須】</span>
                    </th>
                    <td className={styles.td}>
                      <input
                        role="textbox"
                        name="kana"
                        type="text"
                        className={`${styles.inputA}`}
                        maxLength={12}
                        onSubmit={onSubmit}
                        {...register("familyNameKana", {
                          required: "カナ(姓)は必須項目です。",
                          pattern: {
                            value: /^[ァ-ヶー]*$/,
                            message: "カタカナのみで入力してください",
                          },
                        })}
                      />
                      <input
                        role="textbox"
                        type="text"
                        className={`${styles.inputB} `}
                        maxLength={12}
                        onSubmit={onSubmit}
                        {...register("firstNameKana", {
                          required: "カナ(名)は必須項目です。",
                          pattern: {
                            value: /^[ァ-ヶー]*$/,
                            message: "カタカナのみで入力してください",
                          },
                        })}
                      />
                      <p className={styles.error}>
                        {errors.familyNameKana?.message as ReactNode}
                        {errors.firstNameKana?.message as ReactNode}
                      </p>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <th className={styles.th}>
                      メールアドレス
                      <span className={styles.span}>【必須】</span>
                    </th>
                    <td className={styles.td}>
                      <input
                        role="textbox"
                        type="text"
                        className={styles.address}
                        maxLength={250}
                        onSubmit={onSubmit}
                        {...register("mailAddress", {
                          validate: {
                            mailCheck: (value) => {
                              const mailCheck = usersMail.filter(
                                (mail) => mail === value,
                              );
                              return (
                                mailCheck.length === 0 ||
                                "このメールアドレスは登録済です"
                              );
                            },
                          },
                          required: "メールアドレスは必須項目です",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                            message: "正しいメールアドレスを入力してください",
                          },
                        })}
                      />
                      <p className={styles.error}>
                        {errors.mailAddress?.message as ReactNode}
                      </p>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <th className={styles.th}>
                      パスワード<span className={styles.span}>【必須】</span>
                    </th>
                    <td className={styles.td}>
                      <input
                        role="textbox"
                        type="password"
                        className={`${styles.inputA} `}
                        maxLength={16}
                        onSubmit={onSubmit}
                        {...register("password", {
                          required: "パスワードは必須項目です",
                          minLength: {
                            value: 8,
                            message: "8文字以上で入力してください",
                          },
                          maxLength: {
                            value: 16,
                            message: "16文字以下で入力してください",
                          },
                          pattern: {
                            value:
                              /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]+$/,
                            message:
                              "半角英大文字、半角英小文字、数字をそれぞれ1種類以上含んでください",
                          },
                        })}
                      />
                      <p className={styles.error}>
                        {errors.password?.message as ReactNode}
                      </p>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <th className={styles.th}>
                      確認パスワード
                      <span className={styles.span}>【必須】</span>
                    </th>
                    <td className={styles.td}>
                      <input
                        role="textbox"
                        type="password"
                        className={`${styles.inputA} `}
                        maxLength={16}
                        {...register("conPw", {
                          validate: {
                            matchesPreviousPassword: (value) => {
                              const { password } = getValues();
                              return (
                                password === value || "パスワードと一致しません"
                              );
                            },
                          },
                          required: "確認パスワードは必須項目です",
                        })}
                      />
                      <p className={styles.error}>
                        {errors.conPw?.message as ReactNode}
                      </p>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <th className={styles.th}>アイコン</th>
                    <td className={styles.imgSide}>
                      <div className={styles.faileCenter}>
                        <img
                          src={imageUrl}
                          alt="User Profile"
                          className={styles.icon}
                        />
                        <input
                          type="file"
                          id="thumbnail"
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
                      <input
                        role="textbox"
                        type="text"
                        className={`${styles.inputA} `}
                        maxLength={10}
                        onSubmit={onSubmit}
                        {...register("employeeCode", {
                          validate: {
                            check: (value) => {
                              const codeCheck = empCode.filter(
                                (emp) => emp === value,
                              );
                              return (
                                codeCheck.length === 0 ||
                                "この社員番号は登録済です"
                              );
                            },
                          },
                          required: "社員番号は必須項目です",
                          pattern: {
                            value: /[0-9]/,
                            message: "半角数字で入力してください",
                          },
                          maxLength: {
                            value: 10,
                            message: "10文字以下で入力してください",
                          },
                        })}
                      />
                      <p className={styles.error}>
                        {errors.employeeCode?.message as ReactNode}
                      </p>
                    </td>
                  </tr>
                  <tr className={styles.tr}>
                    <th className={styles.th}>
                      職種<span className={styles.span}>【必須】</span>
                    </th>
                    <td className={styles.td}>
                      <div className={styles.radio}>
                        {category.map((item) => {
                          return (
                            <div key={item.name} className={styles.radio}>
                              <input
                                id={item.id}
                                type="radio"
                                value={item.id}
                                {...register("department", {
                                  required: "職種は必須項目です",
                                })}
                              />
                              <label htmlFor={item.id} className="label">
                                {item.name}
                              </label>
                            </div>
                          );
                        })}
                      </div>
                      <p className={styles.error}>
                        {errors.department?.message as ReactNode}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <button
              type="submit"
              disabled={!isValid || isSubmitting}
              className={styles.submitButton}
            >
              登録
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
