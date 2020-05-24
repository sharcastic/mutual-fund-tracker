import { createContext } from "react";

import { defaultContextUserState } from "../constants";

const AppliationContext = createContext({
  userState: defaultContextUserState,
  loginAttempt: undefined,
  signOutAttempt: undefined,
  addProfileDetails: undefined,
});

export default AppliationContext;
