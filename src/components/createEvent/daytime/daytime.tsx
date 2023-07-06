import { Dispatch, SetStateAction, useState } from "react";
import InputDaytime from "./inputDaytime";

export default function Daytime({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: {
  startDate: string;
  setStartDate: Dispatch<SetStateAction<string>>;
  endDate: string;
  setEndDate: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <InputDaytime
        startDate={startDate}
        endDate={endDate}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
      />
    </>
  );
}
