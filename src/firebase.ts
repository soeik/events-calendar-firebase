import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { firebaseConfig } from "./keys"

firebase.initializeApp(firebaseConfig);

export const auth = {
  signIn: ({ email, password }) =>
    firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => {
        return firebase.auth().signInWithEmailAndPassword(email, password);
      }),
  signOut: () => firebase.auth().signOut(),
  // FIXME: argument
  onAuthStateChanged: (cb) => firebase.auth().onAuthStateChanged(cb),
};

export const db = firebase.firestore();
