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
  NO_LOGGED_IN_USER,
  SIGNOUT_ERROR,
  USER_PROFILE_DATABASE_NAME,
  RETRIEVED_PROFILE_DATA,
  NO_PROFILE_DATA,
  ADDED_PROFILE_DATA,
  WATCHLIST_DATABASE_NAME,
  RETRIEVED_WATCHLIST,
  ADD_ITEM_TO_WATCHLIST,
  REMOVED_ITEM_FROM_WATCHLIST,
  SIGNUP_ATTEMPT,
  SIGNUP_ERROR,
} from "../constants";
import { userStateReducer, watchlistReducer } from "../reducer";
import ApplicationContext from "./ApplicationContext";

firebase.initializeApp(FIREBASE_CONFIG);
const auth = firebase.auth();
let db;

const ApplicationContextProvider = ({ children }) => {
  const [userState, userDispatch] = useReducer(
    userStateReducer,
    defaultContextUserState
  );
  const [watchlist, watchlistDispatch] = useReducer(watchlistReducer, []);

  const addProfileDetails = useCallback(
    (details) => {
      const { email } = userState.user;
      return db
        .collection(USER_PROFILE_DATABASE_NAME)
        .doc(email)
        .set({
          ...details,
        })
        .then(() => {
          userDispatch({ type: ADDED_PROFILE_DATA, payload: details });
          return { status: ADDED_PROFILE_DATA };
        });
    },
    [userState.user]
  );

  const retrieveProfileDetails = useCallback(async (email) => {
    console.log("ENV", process.env);
    const ref = db.collection(USER_PROFILE_DATABASE_NAME).doc(email);
    const doc = await ref.get({ source: "server" });
    if (doc.exists) {
      userDispatch({ type: RETRIEVED_PROFILE_DATA, payload: doc.data() });
      console.log("DOCUMENT DATA", doc.data());
      return { status: RETRIEVED_PROFILE_DATA };
    } else {
      userDispatch({ type: NO_PROFILE_DATA });
      return { status: NO_PROFILE_DATA };
    }
  }, []);

  const retrieveWatchlist = useCallback(async (email) => {
    const ref = db.collection(WATCHLIST_DATABASE_NAME).doc(email);
    const doc = await ref.get({ source: "server" });
    watchlistDispatch({ type: RETRIEVED_WATCHLIST, payload: doc.data() });
    console.log("WATCHLIST RETRIEVED", doc.data());
  }, []);

  const loginAttempt = useCallback((email, password) => {
    userDispatch({ type: LOGIN_ATTEMPT });
    return auth
      .signInWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        retrieveWatchlist(user.email);
        return await retrieveProfileDetails(user.email);
      })
      .catch((error) => {
        userDispatch({
          type: LOGIN_ERROR,
          payload: { message: error.message },
        });
        return { status: LOGIN_ERROR, error };
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signUpAttempt = useCallback((email, password) => {
    userDispatch({ type: SIGNUP_ATTEMPT });
    return auth
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        userDispatch({
          type: SIGNUP_ERROR,
          payload: { message: error.message },
        });
        return { status: SIGNUP_ERROR, error };
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOutAttempt = useCallback(() => {
    auth.signOut().catch((error) => {
      userDispatch({
        type: SIGNOUT_ERROR,
        payload: { message: error.message },
      });
    });
  }, []);

  const modifyWatchlist = useCallback((email, list, status) => {
    return db
      .collection(WATCHLIST_DATABASE_NAME)
      .doc(email)
      .set({ watchlist: list })
      .then(() => {
        watchlistDispatch({
          type: status,
          payload: list,
        });
        return { status };
      })
      .catch((err) => {
        console.log(`Error when ${status}`, err);
      });
  }, []);

  const addToWatchlist = useCallback(
    (fund) => {
      const updatedList = [...watchlist, fund];
      const { email } = userState.user;
      return modifyWatchlist(email, updatedList, ADD_ITEM_TO_WATCHLIST);
    },
    [modifyWatchlist, userState.user, watchlist]
  );

  const removeFromWatchlist = useCallback(
    (fund) => {
      const updatedList = watchlist.filter(
        (i) => i.scheme_code !== fund.scheme_code
      );
      const { email } = userState.user;
      return modifyWatchlist(email, updatedList, REMOVED_ITEM_FROM_WATCHLIST);
    },
    [modifyWatchlist, userState.user, watchlist]
  );

  useEffect(() => {
    import("firebase/firestore").then(() => {
      db = firebase.firestore();
    });
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (userState.restoringSession) {
        if (user) {
          userDispatch({ type: RESTORE_LOGIN_SESSION, payload: { user } });
          retrieveProfileDetails(user.email);
          retrieveWatchlist(user.email);
        } else {
          userDispatch({ type: NO_LOGGED_IN_USER });
        }
      }
      if (!userState.user && user) {
        if (userState.loading) {
          userDispatch({ type: LOGIN_SUCCESS, payload: { user } });
        }
      }
      if (userState.user && !user) {
        console.log("USER SIGNED OUT!");
        userDispatch({ type: SIGNED_OUT });
      }
    });
    return function cleanUp() {
      unsubscribe();
    };
  }, [retrieveProfileDetails, retrieveWatchlist, userState]);

  return (
    <ApplicationContext.Provider
      value={{
        userState,
        loginAttempt,
        signOutAttempt,
        addProfileDetails,
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        signUpAttempt,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContextProvider;
