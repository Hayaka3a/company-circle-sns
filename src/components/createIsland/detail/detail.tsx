import { Dispatch, SetStateAction, useState } from "react";
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
