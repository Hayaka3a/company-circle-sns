import { Dispatch, SetStateAction, useState } from "react";
import InputName from "./inputName";

export default function IslandName({
  islandName,
  setIslandName,
}: {
  islandName: string;
  setIslandName: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <InputName islandName={islandName} setName={setIslandName} />
    </>
  );
}
