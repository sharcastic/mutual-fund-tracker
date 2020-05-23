const FIREBASE_APIKEY = process.env.REACT_APP_FIREBASE_APIKEY;
const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
const FIREBASE_DATABASE_URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;
const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;

export const LOGIN_ATTEMPT = "LOGIN_ATTEMPT";
export const RESTORE_LOGIN_SESSION = "RESTORE_LOGIN_SESSION";
export const SIGNED_OUT = "SIGNED_OUT";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const SIGNOUT_ERROR = "SIGNOUT_ERROR";

export const FIREBASE_CONFIG = {
  apiKey: FIREBASE_APIKEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  databaseURL: FIREBASE_DATABASE_URL,
  projectId: FIREBASE_PROJECT_ID,
  appId: FIREBASE_APP_ID,
};

export const defaultContextUserState = {
  user: undefined,
  loading: false,
  error: undefined,
};
