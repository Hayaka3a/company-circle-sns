import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/island/createIsland.module.css";
import HandleDetailChange from "./handleDetailChange";
import HandleNameBlur from "./handleBlur";
import { devToolsEnhancer } from "@reduxjs/toolkit/dist/devtoolsExtension";
import InputDetail from "./inputDetail";

export default function Detail({
  detail,
  setDetail,
}: {
  detail: string;
  setDetail: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <InputDetail detail={detail} setDetail={setDetail} />
    </>
  );
}
