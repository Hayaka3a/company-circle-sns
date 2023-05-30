import { useState } from "react";
import LogSt from "../components/cookie/logSt";
import QuitUser from "../components/modalWindows/quitUser";
import QuitConf from "../components/modalWindows/quitConf";
import { useNavigate } from "react-router-dom";
import QuitDone from "../components/modalWindows/quitDone";

export default function UserEdit() {
  LogSt();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [confOpen, setConfOpen] = useState(false);
  const [lastOpen, setLastOpen] = useState(false);

  // モーダルウィンドウの開閉(アカウントを削除しますか？)
  const openModal = () => {
    setIsOpen(true);
  };
  // アカウント削除しますか？ウィンドウで×ボタンを押したら画面が閉じる
  const closeModal = () => {
    setIsOpen(false);
  };

  //アカウント削除しますか？ウィンドウを閉じて、入力ウィンドウを表示する
  const nextOpen = () => {
    setIsOpen(false);
    setConfOpen(true);
  };

  // 入力のウィンドウを閉じて、削除完了のウィンドウを表示する
  const nextOpen2 = () => {
    setConfOpen(false);
    setLastOpen(true);
  };

  // 入力ウィンドウで×ボタンを押したら画面が閉じる
  const close2Modal = () => {
    setConfOpen(false);
  };

  // 削除完了ウィンドウを閉じる
  const done = () => {
    setLastOpen(false);
    navigate("/user/newUser");
    window.location.reload();
  };

  return (
    <>
      <button onClick={openModal}>退会</button>
      {isOpen && <QuitUser closeModal={closeModal} nextOpen={nextOpen} />}
      {confOpen && <QuitConf close2Modal={close2Modal} nextOpen2={nextOpen2} />}
      {lastOpen && <QuitDone done={done} />}
    </>
  );
}
