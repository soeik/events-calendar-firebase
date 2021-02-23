import * as React from "react";
import { SignInPage } from "./admin-panel/SignInPage";
import { EventsPage } from "./events/EventsPage";
// import { ProtectedRoute } from "./admin-panel/ProtectedRoute";
import { Router } from "@reach/router";
import { AdminPanelPage } from "./admin-panel/AdminPanelPage";
import { AddEventPage } from "./admin-panel/AddEventPage";
import { useContext, useEffect } from "react";
import { authContext, AuthState } from "./authContext";
import { auth } from "./firebase";
import { RouterPath } from "./router-path";
import { ProtectedRoute } from "./admin-panel/ProtectedRoute";
import {EditEventPage} from "./admin-panel/EditEventPage";

export function App() {
  const { setAuthState } = useContext(authContext);

  useEffect(() => {
    setAuthState(AuthState.Authenticating);
    const unsubscribe = auth.onAuthStateChanged((userData) => {
      const newAuthState = userData ? AuthState.LoggedIn : AuthState.LoggedOut;
      setAuthState(newAuthState);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <EventsPage path={RouterPath.Home} />
      <SignInPage path={RouterPath.SignIn} />
      <ProtectedRoute as={AdminPanelPage} path={RouterPath.Panel} />
      <ProtectedRoute as={AddEventPage} path={RouterPath.AddEvent} />
      <ProtectedRoute as={EditEventPage} path={RouterPath.EditEvent} />
    </Router>
  );
}
