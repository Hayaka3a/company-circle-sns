import { Dispatch, SetStateAction, useState } from "react";
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
      <InputEventName eventName={eventName} setName={setEventName} />
    </>
  );
}
