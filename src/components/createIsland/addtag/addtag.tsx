import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/island/createIsland.module.css";
import HandleChangeName from "./handleChangeName";
import HandleChangeNameKana from "./handleChangeNameKana";
import DeleteButton from "./deleteButton";
import AddButton from "./addButton";
import InputAddTag from "./inputAddTag";

export default function AddTag({
  setTagNames,
}: {
  setTagNames: Dispatch<SetStateAction<{ Name: string; NameKana: string }[]>>;
}) {
  return (
    <>
      <InputAddTag setTagNames={setTagNames} />
    </>
  );
}
