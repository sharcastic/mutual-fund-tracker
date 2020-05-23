import React, { useEffect, useReducer, useCallback } from "react";
import * as firebase from "firebase/app";
import "firebase/auth";

import {
  FIREBASE_CONFIG,
  defaultContextUserState,
  LOGIN_ATTEMPT,
  RESTORE_LOGIN_SESSION,
  SIGNED_OUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  SIGNOUT_ERROR,
} from "../constants";
import ApplicationContext from "./ApplicationContext";

firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();

const reducer = (userState = defaultContextUserState, action) => {
  switch (action.type) {
    case LOGIN_ATTEMPT: {
      return { ...userState, loading: true };
    }
    case LOGIN_SUCCESS: {
      return { ...userState, loading: false, user: action.payload.user };
    }
    case RESTORE_LOGIN_SESSION: {
      return { ...userState, user: action.payload.user };
    }
    case SIGNOUT_ERROR:
    case LOGIN_ERROR: {
      return { ...userState, loading: false, error: action.payload.message };
    }
    case SIGNED_OUT: {
      return { ...userState, user: undefined };
    }
    default:
      throw new Error();
  }
};

const ApplicationContextProvider = ({ children }) => {
  const [userState, dispatch] = useReducer(reducer, defaultContextUserState);

  const loginAttempt = useCallback((email, password) => {
    dispatch({ type: LOGIN_ATTEMPT });
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      dispatch({ type: LOGIN_ERROR, payload: { message: error.message } });
    });
  }, []);

  const signOutAttempt = useCallback(() => {
    auth.signOut().catch((error) => {
      dispatch({ type: SIGNOUT_ERROR, payload: { message: error.message } });
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      console.log("USER STATE HAS CHANGED!");
      if (!userState.user && user) {
        if (userState.loading) {
          dispatch({ type: LOGIN_SUCCESS, payload: { user } });
        } else {
          dispatch({ type: RESTORE_LOGIN_SESSION, payload: { user } });
        }
      }
      if (userState.user && !user) {
        console.log("USER SIGNED OUT!");
        dispatch({ type: SIGNED_OUT });
      }
    });
    return unsubscribe;
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
