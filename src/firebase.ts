import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBhFLvUIvsaxsw6q0PH2TlKu_WLk9ZXhMs",
  authDomain: "company-sircle-sns.firebaseapp.com",
  projectId: "company-sircle-sns",
  storageBucket: "company-sircle-sns.appspot.com",
  messagingSenderId: "593130588816",
  appId: "1:593130588816:web:e2d349f5521cc77ae7e615",
});

const firestore = firebaseApp.firestore();

export { firestore };
