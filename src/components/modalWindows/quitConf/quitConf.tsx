import JsxQuitConf from "./jsxQuitConf";

export default function QuitConf({
  close2Modal,
  nextOpen2,
  inputValue,
  setInputValue,
}: {
  close2Modal: () => void;
  nextOpen2: () => void;
  inputValue: string;
  // React.Dispatch<>は、<>の値を引数として受け取る
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <JsxQuitConf
        close2Modal={close2Modal}
        nextOpen2={nextOpen2}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    </>
  );
}
