import * as firebase from "firebase/app";
import "firebase/auth";
import {
  FIREBASE_APIKEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_DATABASE_URL,
  FIREBASE_PROJECT_ID,
  FIREBASE_APP_ID,
} from "./constants";

const firebaseConfig = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  appId: FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();

auth.onAuthStateChanged(function (user) {
  console.log("USER STATE HAS CHANGED!", user);
  if (user) {
    console.log("USER DETAILS", user);
    // ...
  } else {
    // User is signed out.
    // ...
  }
});
