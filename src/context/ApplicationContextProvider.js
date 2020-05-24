import React, { useEffect, useReducer, useCallback } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
// import "firebase/firestore";

import {
  FIREBASE_CONFIG,
  defaultContextUserState,
  LOGIN_ATTEMPT,
  RESTORE_LOGIN_SESSION,
  SIGNED_OUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  NO_LOGGED_IN_USER,
  SIGNOUT_ERROR,
  USER_PROFILE_DATABASE_NAME,
  RETRIEVED_PROFILE_DATA,
  NO_PROFILE_DATA,
} from "../constants";
import { reducer } from "../reducer";
import ApplicationContext from "./ApplicationContext";

firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
let db;

// const db = firebase.firestore();

const ApplicationContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(reducer, defaultContextUserState);

  const loginAttempt = useCallback((email, password) => {
    dispatch({ type: LOGIN_ATTEMPT });
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        const ref = db.collection(USER_PROFILE_DATABASE_NAME).doc(user.email);
        const doc = await ref.get({ source: "server" });
        if (doc.exists) {
          dispatch({ type: RETRIEVED_PROFILE_DATA, payload: doc.data() });
          console.log("DOCUMENT DATA", doc.data());
          return { status: RETRIEVED_PROFILE_DATA };
        } else {
          dispatch({ type: NO_PROFILE_DATA });
          return { status: NO_PROFILE_DATA };
        }
      })
      .catch((error) => {
        dispatch({ type: LOGIN_ERROR, payload: { message: error.message } });
        return { status: LOGIN_ERROR, error };
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOutAttempt = useCallback(() => {
    auth.signOut().catch((error) => {
      dispatch({ type: SIGNOUT_ERROR, payload: { message: error.message } });
    });
  }, []);

  useEffect(() => {
    import("firebase/firestore").then(() => {
      db = firebase.firestore();
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (userState.restoringSession) {
        if (user) {
          dispatch({ type: RESTORE_LOGIN_SESSION, payload: { user } });
        } else {
          dispatch({ type: NO_LOGGED_IN_USER });
        }
      }
      if (!userState.user && user) {
        if (userState.loading) {
          dispatch({ type: LOGIN_SUCCESS, payload: { user } });
        }
      }
      if (userState.user && !user) {
        console.log("USER SIGNED OUT!");
        dispatch({ type: SIGNED_OUT });
      }
    });
    return function cleanUp() {
      unsubscribe();
    };
  }, [userState]);

  return (
    <ApplicationContext.Provider
      value={{ userState, loginAttempt, signOutAttempt }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;