import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { AdminPanel } from "./AdminPanel";
import { authContext, AuthState } from "../authContext";
import { SignIn } from "./SignIn";
import { auth } from "../firebase";
import { Loader } from "../shared/Loader";

export function Gatekeeper() {
  const { authState, setAuthState } = useContext(authContext);
  const [authError, setAuthError] = useState();

  useEffect(() => {
    setAuthState(AuthState.Authenticating);
    auth.onAuthStateChanged((userData) => {
      const newAuthState = userData ? AuthState.LoggedIn : AuthState.LoggedOut;
      setAuthState(newAuthState);
    });
  }, []);

  const onSignIn = ({ email, password }) => {
    setAuthState(AuthState.Authenticating);
    setAuthError(null);
    auth
      .signIn({ email, password })
      .then(() => setAuthState(AuthState.LoggedIn))
      .catch((e) => {
        setAuthState(AuthState.LoggedOut);
        setAuthError(e);
      });
  };

  if (authState === AuthState.Authenticating) {
    return <Loader />;
  }

  return authState === AuthState.LoggedIn ? (
    <AdminPanel />
  ) : (
    <SignIn onSignIn={onSignIn} authError={authError} />
  );
}
