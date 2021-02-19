import * as React from "react";
import { FC, useContext, useEffect, useState } from "react";
import { authContext, AuthState } from "../authContext";
import { SignInForm } from "./SignInForm";
import { auth } from "../firebase";
import { Loader } from "../shared/Loader";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { RouterPath } from "../router-path";

export const SignInPage: FC<RouteComponentProps> = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useContext(authContext);
  const [authError, setAuthError] = useState();

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

  useEffect(() => {
    if (authState === AuthState.LoggedIn) {
      navigate(RouterPath.Panel);
    }
  }, [authState]);

  if (authState === AuthState.Authenticating) {
    return <Loader />;
  }

  return <SignInForm onSignIn={onSignIn} authError={authError} />;
};
