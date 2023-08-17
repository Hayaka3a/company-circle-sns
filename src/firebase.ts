import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCo8QHh-e7rrfVptcDkUt4sZumY0XTTEpM",
  authDomain: "company-circle-sns-26431.firebaseapp.com",
  projectId: "company-circle-sns-26431",
  storageBucket: "company-circle-sns-26431.appspot.com",
  messagingSenderId: "193772776851",
  appId: "1:193772776851:web:cdae3e14c7fa099b664c66"
});

const firestore = firebaseApp.firestore();

export { firestore };
