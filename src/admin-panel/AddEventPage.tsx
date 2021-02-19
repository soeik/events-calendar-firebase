import * as React from "react";
import { Header } from "./Header";
import { AddEvent } from "./AddEvent";
import { RouteComponentProps } from "@reach/router";
import { FC } from "react";

export const AddEventPage: FC<RouteComponentProps> = () => (
  <>
    <Header />
    <AddEvent />
  </>
);
