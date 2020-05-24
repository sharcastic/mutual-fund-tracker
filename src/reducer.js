import {
  defaultContextUserState,
  LOGIN_ATTEMPT,
  RESTORE_LOGIN_SESSION,
  SIGNED_OUT,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  NO_LOGGED_IN_USER,
  SIGNOUT_ERROR,
  RETRIEVED_PROFILE_DATA,
  NO_PROFILE_DATA,
} from "./constants";

export const reducer = (userState = defaultContextUserState, action) => {
  switch (action.type) {
    case LOGIN_ATTEMPT: {
      return { ...userState, loading: true };
    }
    case LOGIN_SUCCESS: {
      return { ...userState, loading: false, user: action.payload.user };
    }
    case RESTORE_LOGIN_SESSION: {
      return {
        ...userState,
        user: action.payload.user,
        restoringSession: false,
      };
    }
    case SIGNOUT_ERROR:
    case LOGIN_ERROR: {
      return { ...userState, loading: false, error: action.payload.message };
    }
    case SIGNED_OUT: {
      return { ...userState, user: undefined };
    }
    case NO_LOGGED_IN_USER: {
      return { ...userState, restoringSession: false, loading: false };
    }
    case RETRIEVED_PROFILE_DATA: {
      return { ...userState, profileDetails: action.payload };
    }
    case NO_PROFILE_DATA: {
      return userState;
    }
    default:
      throw new Error();
  }
};
