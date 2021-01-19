import * as React from "react";
import { Header } from "./Header";
import { AddEvent } from "./AddEvent";

export function AdminPanel() {
  return (
    <>
      <Header />
      <AddEvent />
    </>
  );
}
