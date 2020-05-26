import { createContext } from "react";

import { defaultContextUserState } from "../constants";

const AppliationContext = createContext({
  userState: defaultContextUserState,
  loginAttempt: undefined,
  signOutAttempt: undefined,
  addProfileDetails: undefined,
  watchlist: undefined,
  addToWatchlist: undefined,
  removeFromWatchlist: undefined,
  signUpAttempt: undefined,
});

export default AppliationContext;
