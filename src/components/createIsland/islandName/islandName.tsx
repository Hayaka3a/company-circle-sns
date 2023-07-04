import { Dispatch, SetStateAction, useState } from "react";
import NameInput from "./nameInput";

export default function IslandName({
  islandName,
  setIslandName,
}: {
  islandName: string;
  setIslandName: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <NameInput islandName={islandName} setIslandName={setIslandName} />
    </>
  );
}
