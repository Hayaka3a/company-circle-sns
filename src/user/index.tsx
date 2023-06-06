import { useState, useEffect, ReactNode } from "react";
import styles from "../styles/user/userEdit.module.css";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { supabase } from "../createClient";
import UnsubscribeButton from "../components/unsubscribeButton";
import GetCookieID from "../components/cookie/getCookieId";
import SubFetchIsEve from "../components/hooks/SubFetchIsEve";
import IslandMessage from "./message/island_message";

export default function UserEdit() {
  const [imageUrl, setImageUrl] = useState("/user/tanukiti.png");
  const [usersMail, setUsersMail] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [radio, setRadio] = useState();
  const [combi, setCombi] = useState([]);

  //ReactHookFormで使用
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    setFocus,
    setError,
    watch,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all",
    shouldUnregister: false,
  });

  const userID = GetCookieID() as number;
  const WatchConPw = watch("conPw");

  //メールアドレスと社員番号が既に登録されているか確認するために取得する
  useEffect(() => {
    reset();
    check();
    fetchUsers();
    SubFetchIsEve({ userID, setCombi });
    setTimeout(() => {
      setFocus("conPw");
    }, 0);
  }, [editMode]);

  const fetchUsers = async () => {
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select(`mailAddress`);
    if (usersError) {
      console.log(usersError, "fetchUsersError");
    } else {
      //ログインユーザーのデータを取得し、フォームにセット
      const { data: loginUser, error: loginError } = await supabase
        .from("users")
        .select(`*`)
        .eq("id", userID);
      if (usersError) {
        console.log(loginError, "fetchLoginUsersError");
      } else {
        setValue("icon", loginUser[0].icon);
        setValue("familyName", loginUser[0].familyName);
        setValue("firstName", loginUser[0].firstName);
        setValue("familyNameKana", loginUser[0].familyNameKana);
        setValue("firstNameKana", loginUser[0].firstNameKana);
        setValue("mailAddress", loginUser[0].mailAddress);
        setRadio(loginUser[0].department);
        setValue("employeeCode", loginUser[0].employeeCode);
        setValue("icon", loginUser[0].icon);
        setValue("password", loginUser[0].password);
        setImageUrl(loginUser[0].icon);
      }

      //メールアドレスを抜き出してstateに保存
      const mail = users
        .filter((user) => user.mailAddress !== loginUser[0].mailAddress)
        .map((user) => user.mailAddress);
      setUsersMail(mail);
    }
  };

  const onSubmit = async (sendData: any) => {
    setEditMode(!editMode);

    //送信するデータを成形
    delete sendData.conPw;
    sendData.creratedBy = "システム";
    sendData.icon = imageUrl;

    if (sendData.department === "office") {
      sendData.department = "内勤";
    } else if (sendData.department === "sales") {
      sendData.department = "営業";
    } else {
      return;
    }

    //usersテーブルに追加
    const { error: usersError } = await supabase
      .from("users")
      .update(sendData)
      .eq("id", userID);
    if (usersError) {
      console.log(usersError, "insertUsersエラー");
    } else {
      window.location.reload();
    }
  };

  // 画像ファイル選択したら、表示画像に反映
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files || event.target.files.length == 0) {
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
    }

    const { data } = supabase.storage.from("userIcon").getPublicUrl(filePath);
    setImageUrl(data.publicUrl);
  };

  //職種選択用データ
  const [category, setCategory] = useState([
    { id: "Java", name: "Java" },
    { id: "ML", name: "ML" },
    { id: "CL", name: "CL" },
    { id: "QA", name: "QA" },
    { id: "PHP", name: "PHP" },
    { id: "FR", name: "FR" },
    { id: "sales", name: "営業" },
    { id: "office", name: "内勤" },
  ]);

  //編集ボタンの切り替え
  const ButtonSwitching = () => {
    if (editMode) {
      return (
        <div>
          <button
            type="button"
            className={styles.noEdit}
            onClick={() => {
              setEditMode(false);
            }}
          >
            編集せずに戻る
          </button>
          <br />
          <button
            type="submit"
            className={styles.addButton}
            disabled={!isValid || isSubmitting}
          >
            編集完了
          </button>
        </div>
      );
    } else {
      return (
        <button
          type="button"
          onClick={() => setEditMode(true)}
          className={styles.addButton}
        >
          編集する
        </button>
      );
    }
  };
  const check = () => {
    if (editMode && WatchConPw === undefined) {
      return setError("conPw", {
        type: "custom",
        message: "確認パスワードは必須項目です。",
      });
    }
  };

  return (
    <>
      <div className={styles.background}>
        <div className="loginPageButton">
          <Link to={"/"}>
            <button>トップページへ</button>
          </Link>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.box}>
            <div className={styles.allContents}>
              <h2>マイページ</h2>
              <div className={styles.editbox}>
                <div className={styles.tableCovered}>
                  <table className={styles.table}>
                    <tbody>
                      <tr className={styles.tr}>
                        <th className={styles.th}>氏名</th>
                        <td className={styles.td}>
                          <input
                            type="text"
                            className={`${styles.inputA}`}
                            disabled={!editMode}
                            maxLength={300}
                            onSubmit={onSubmit}
                            {...register("familyName", {
                              required: "氏名(姓)は必須項目です。",
                            })}
                          />
                          <input
                            type="text"
                            className={`${styles.inputB} `}
                            disabled={!editMode}
                            maxLength={300}
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
                        <th className={styles.th}>カナ</th>
                        <td className={styles.td}>
                          <input
                            type="text"
                            className={`${styles.inputA}`}
                            disabled={!editMode}
                            maxLength={300}
                            onSubmit={onSubmit}
                            {...register("familyNameKana", {
                              required: "カナ(姓)は必須項目です。",
                            })}
                          />
                          <input
                            type="text"
                            className={`${styles.inputB} `}
                            disabled={!editMode}
                            maxLength={300}
                            onSubmit={onSubmit}
                            {...register("firstNameKana", {
                              required: "カナ(名)は必須項目です。",
                            })}
                          />
                          <p className={styles.error}>
                            {errors.familyNameKana?.message as ReactNode}
                            {errors.firstNameKana?.message as ReactNode}
                          </p>
                        </td>
                      </tr>
                      <tr className={styles.tr}>
                        <th className={styles.th}>メールアドレス</th>
                        <td className={styles.td}>
                          <input
                            type="text"
                            className={styles.address}
                            disabled={!editMode}
                            maxLength={100}
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
                              required: "メールアドレスは必須項目です。",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                                message:
                                  "正しいメールアドレスを入力してください。",
                              },
                            })}
                          />
                          <p className={styles.error}>
                            {errors.mailAddress?.message as ReactNode}
                          </p>
                        </td>
                      </tr>
                      <tr className={styles.tr}>
                        <th className={styles.th}>パスワード</th>
                        <td className={styles.td}>
                          <input
                            type="password"
                            className={`${styles.inputA} `}
                            disabled={!editMode}
                            maxLength={16}
                            onSubmit={onSubmit}
                            {...register("password", {
                              required: "パスワードは必須項目です。",
                              minLength: {
                                value: 8,
                                message: "8文字以上で入力してください。",
                              },
                              maxLength: {
                                value: 16,
                                message: "16文字以下で入力してください。",
                              },
                              pattern: {
                                value:
                                  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]+$/,
                                message:
                                  "半角英大文字、半角英小文字、数字をそれぞれ1種類以上含んでください。",
                              },
                            })}
                          />
                          <p className={styles.error}>
                            {errors.password?.message as ReactNode}
                          </p>
                        </td>
                      </tr>
                      <tr className={styles.tr}>
                        <th className={styles.th}>確認パスワード</th>
                        <td className={styles.td}>
                          <input
                            type="password"
                            className={`${styles.inputA} `}
                            disabled={!editMode}
                            maxLength={16}
                            {...register("conPw", {
                              validate: {
                                matchesPreviousPassword: (value) => {
                                  const { password } = getValues();
                                  return (
                                    password === value ||
                                    "パスワードと一致しません。"
                                  );
                                },
                              },
                              required: "確認パスワードは必須項目です。",
                            })}
                          />
                          <p className={styles.error}>
                            {errors.conPw?.message as ReactNode}
                          </p>
                        </td>
                      </tr>

                      <tr className={styles.tr}>
                        <th className={styles.th}>社員番号</th>
                        <td className={styles.td}>
                          <input
                            type="text"
                            disabled
                            className={`${styles.inputA} `}
                            maxLength={10}
                            onSubmit={onSubmit}
                            {...register("employeeCode")}
                          />
                          <p className={styles.error}>
                            {errors.employeeCode?.message as ReactNode}
                          </p>
                        </td>
                      </tr>
                      <tr className={styles.tr}>
                        <th className={styles.th}>職種</th>
                        <td className={styles.td}>
                          <div className={styles.radio}>
                            {category.map((item) => {
                              return (
                                <div key={item.name} className={styles.radio}>
                                  <input
                                    id={item.id}
                                    type="radio"
                                    value={item.id}
                                    defaultChecked={item.name === radio}
                                    disabled={!editMode}
                                    {...register("department")}
                                  />
                                  <label htmlFor={item.id}>{item.name}</label>
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
                <div className={styles.left}>
                  <table>
                    <tbody>
                      <tr className={styles.tr}>
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
                              disabled={!editMode}
                              onChange={handleFileChange}
                            />
                          </div>
                        </td>
                      </tr>
                      <tr className={styles.tr}>
                        <td className={styles.imgSide}>
                          <div className={styles.joinBox}>
                            <div className={styles.joinList}>
                              <p>参加している島</p>
                              {combi.map((item) => {
                                if (item.islands) {
                                  return (
                                    <Link
                                      to={`/island/${item.islands.id}`}
                                      className={styles.link}
                                    >
                                      {item.islands.islandName}
                                    </Link>
                                  );
                                }
                              })}
                            </div>
                            <br />
                            <div className={styles.joinList}>
                              <p>参加しているイベント</p>
                              {combi.map((item) => {
                                if (item.events) {
                                  return (
                                    <Link
                                      to={`/event/${item.events.id}`}
                                      className={styles.link}
                                    >
                                      {item.events.eventName}
                                    </Link>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className={styles.buttonbox}>{ButtonSwitching()}</div>
                </div>
              </div>
            </div>
            <div className={styles.unsub}>
              <UnsubscribeButton />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
