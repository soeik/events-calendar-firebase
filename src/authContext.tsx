import * as React from "react";
import { createContext, SetStateAction, useState } from "react";

export enum AuthState {
  LoggedOut = "LoggedOut",
  Authenticating = "Authenticating",
  LoggedIn = "LoggedIn",
}

interface AppContext {
  setAuthState?: React.Dispatch<SetStateAction<string>>;
  authState: AuthState;
}

const initialState: AppContext = {
  authState: AuthState.LoggedOut,
};

const authContext = createContext(initialState);
const { Provider } = authContext;

const AppProvider = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(AuthState.LoggedOut);

  return <Provider value={{ authState, setAuthState }}>{children}</Provider>;
};

export { authContext, AppProvider };
