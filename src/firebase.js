import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  // Firebase SDK の構成情報をここに追加します
  // firebaseプロジェクトセットアップを行うとfirebase SDKの構成情報が表示される
};

firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();
