import { Dispatch, SetStateAction, useState } from "react";
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
