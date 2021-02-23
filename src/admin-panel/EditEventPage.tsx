import * as React from "react";
import { Header } from "./Header";
import { EditEvent } from "./EditEvent";
import { RouteComponentProps } from "@reach/router";

interface EditEventPageProps extends RouteComponentProps {
  eventId?: string;
}

export function EditEventPage({ eventId }: EditEventPageProps) {
  return (
    <>
      <Header />
      <EditEvent eventId={eventId} />
    </>
  );
}
