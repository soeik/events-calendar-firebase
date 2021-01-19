import * as React from "react";
import { auth } from "../firebase";

export function SignOut() {
  return <button onClick={auth.signOut}>Выйти</button>;
}
