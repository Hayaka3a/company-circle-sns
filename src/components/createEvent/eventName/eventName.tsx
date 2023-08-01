import { Dispatch, SetStateAction, useState } from "react";
import InputEventName from "./inputEventName";
import styles from "../../../styles/event/create.module.css";
import HandleNameBlur from "./handleNameBlur";

export default function EventName({
  eventName,
  setEventName,
}: {
  eventName: string;
  setEventName: Dispatch<SetStateAction<string>>;
}) {
  return (
    <>
      <InputEventName eventName={eventName} setName={setEventName} />
    </>
  );
}
