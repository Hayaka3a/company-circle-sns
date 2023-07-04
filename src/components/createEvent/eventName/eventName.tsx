import { Dispatch, SetStateAction, useState } from "react";
import styles from "../../../styles/event/create.module.css";
import { supabase } from "../../../createClient";
import HandleNameBlur from "./handleNameBlur";
import HandleNameChange from "./handleNameChange";
import InputEventName from "./inputEventName";

export default function EventName({
  eventName,
  setEventName,
}: {
  eventName: string;
  setEventName: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <InputEventName eventName={eventName} setEventName={setEventName} />
    </>
  );
}
