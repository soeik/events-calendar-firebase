import * as React from "react";
import { auth } from "../firebase";
import { authContext, AuthState } from "../authContext";
import { useContext } from "react";
import { useTranslation } from "react-i18next";

export function SignOut() {
  const { t } = useTranslation();
  const { setAuthState } = useContext(authContext);

  return (
    <button
      onClick={() => {
        auth.signOut().then(() => {
          setAuthState(AuthState.LoggedOut);
        });
      }}
    >
      {t("SignOut")}
    </button>
  );
}
