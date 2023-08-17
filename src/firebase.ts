import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCpuR5z_VsgYrcsP0TCGm7bhYCEFfixNJo",
  authDomain: "company-circle-sns.firebaseapp.com",
  projectId: "company-circle-sns",
  storageBucket: "company-circle-sns.appspot.com",
  messagingSenderId: "37177227012",
  appId: "1:37177227012:web:ff5afad0b208101d788251",
});

const firestore = firebaseApp.firestore();

export { firestore };
