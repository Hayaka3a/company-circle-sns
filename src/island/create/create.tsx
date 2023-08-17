import React, { useEffect, useState } from "react";
import styles from "../../styles/island/createIsland.module.css";
import ConvertKanaJ from "../../components/changeKana";
import AddTag from "../../components/createIsland/addtag/addtag";
import IslandName from "../../components/createIsland/islandName/islandName";
import Detail from "../../components/createIsland/detail/detail";
import ComboBoxUser from "../../components/comboBox/comboBoxUser/comboBoxUser";
import ComboBoxTag from "../../components/comboBox/comboBoxTag/comboBoxTag";
import LogSt from "../../components/cookie/logSt";
import HandleFileChange from "./handleFileChange";
import FetchUsers from "./fetchUsers";
import FetchTags from "./fetchTags";
import useCreateIslandHandler from "./createHandler";

export default function IslandCreate() {
  LogSt();
  const [nameAlreadyError, setNameAlreadyError] = useState("");

  useEffect(() => {
    // データベースから全ユーザー名前取得
    FetchUsers(ConvertKanaJ, setUserOptions);
    // データベースから全タグ名取得
    FetchTags(setTagOptions);
  }, []);

  // 島作成する
  const {
    imageUrl,
    setImageUrl,
    islandName,
    setIslandName,
    userOptions,
    setUserOptions,
    tagOptions,
    setTagOptions,
    islandMembers,
    setIslandMembers,
    detail,
    setDetail,
    islandTags,
    setIslandTags,
    tagNames,
    setTagNames,
    createHandler,
  } = useCreateIslandHandler();

  return (
    <div className={styles.background}>
      <div className={styles.box}>
        <div className={styles.allContents}>
          <h2 className={styles.h2}>新しい島を作成</h2>
          <div className={styles.tableCovered}>
            <table className={styles.table}>
              <tbody className={styles.tbody}>
                <tr className={styles.tr}>
                  <th className={styles.th}>
                    島名<span className={styles.span}>【必須】</span>
                  </th>
                  <td className={styles.td}>
                    <IslandName
                      islandName={islandName}
                      setName={setIslandName}
                      nameAlreadyError={nameAlreadyError}
                      setNameAlreadyError={setNameAlreadyError}
                    />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>
                    活動内容<span className={styles.span}>【必須】</span>
                  </th>
                  <td className={styles.td}>
                    <Detail detail={detail} setDetail={setDetail} />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>メンバー</th>
                  <td className={styles.td}>
                    <ComboBoxUser
                      nameOptions={userOptions}
                      htmlFor="user"
                      setIslandMembers={setIslandMembers}
                    />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>サムネイル</th>
                  <td className={`${styles.imgSide}`}>
                    <img
                      className={styles.icon}
                      src={imageUrl || "/island/island_icon.png"}
                      alt="island Thumbnail"
                    />
                    <div className={styles.faileCenter}>
                      <label className={styles.fileLabel}>
                        <input
                          type="file"
                          id="thumbnail"
                          className={styles.file}
                          onChange={(event) => {
                            HandleFileChange(event, setImageUrl);
                          }}
                        />
                        ファイルを選択
                      </label>
                    </div>
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>タグ</th>
                  <td className={styles.td}>
                    <ComboBoxTag
                      tagOptions={tagOptions}
                      htmlFor="tag"
                      chosenTag={null}
                      setIslandTags={setIslandTags}
                    />
                  </td>
                </tr>
                <tr className={styles.tr}>
                  <th className={styles.th}>タグ追加</th>
                  <td className={styles.td}>
                    <AddTag setTagNames={setTagNames} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <button
            onClick={createHandler}
            disabled={
              !islandName.trim() || !detail.trim() || !!nameAlreadyError
            }
            className={styles.btn}
          >
            新しい島生活を始める
          </button>
        </div>
      </div>
    </div>
  );
}
