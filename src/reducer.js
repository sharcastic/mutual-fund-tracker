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
  ADDED_PROFILE_DATA,
  REMOVED_ITEM_FROM_WATCHLIST,
  ADD_ITEM_TO_WATCHLIST,
  RETRIEVED_WATCHLIST,
  SIGNUP_ATTEMPT,
  SIGNUP_ERROR,
} from "./constants";

export const userStateReducer = (
  userState = defaultContextUserState,
  action
) => {
  switch (action.type) {
    case LOGIN_ATTEMPT:
    case SIGNUP_ATTEMPT: {
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
    case SIGNUP_ERROR:
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
    case ADDED_PROFILE_DATA: {
      return { ...userState, profileDetails: action.payload };
    }
    default:
      throw new Error();
  }
};

export const watchlistReducer = (_, action) => {
  switch (action.type) {
    case RETRIEVED_WATCHLIST: {
      const watchlist =
        action.payload && action.payload.watchlist
          ? action.payload.watchlist
          : [];
      return [...watchlist];
    }
    case ADD_ITEM_TO_WATCHLIST: {
      return [...action.payload];
    }
    case REMOVED_ITEM_FROM_WATCHLIST: {
      return [...action.payload];
    }
    default:
      throw new Error();
  }
};
