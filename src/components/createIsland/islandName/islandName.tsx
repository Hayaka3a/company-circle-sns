import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/island/createIsland.module.css";
import { supabase } from "../../../createClient";
import HandleNameBlur from "./handleNameBlur";
import HandleIslandNameChange from "./handleIslandNameChange";
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
