import * as React from "react";
import { useState } from "react";
import { EditEventForm } from "./EditEventForm";
import { eventsService } from "../eventsService";
import { Column, Container, Row } from "../layout";
import { makeNewEventWithDefaults } from "../types";

enum ViewState {
  Normal = "Normal",
  Saving = "Saving",
  Saved = "Saved",
  Error = "Error",
}

export function AddEvent() {
  const [viewState, setViewState] = useState(ViewState.Normal);
  const [error, setError] = useState(null);
  const [currentEvent, setCurrentEvent] = useState(
    makeNewEventWithDefaults()
  );
  const onSubmit = (event) => {
    // TODO: Display progress
    setViewState(ViewState.Saving);
    eventsService
      .add(event)
      .then(() => {
        setViewState(ViewState.Saved);
        setCurrentEvent(makeNewEventWithDefaults());
      })
      .catch((e) => {
        setViewState(ViewState.Error);
        setError(e);
      });
  };
  return (
    <Container>
      <Row>
        <Column>
          <h3>Add new event</h3>
        </Column>
      </Row>
      <EditEventForm
        onSubmit={onSubmit}
        disabled={viewState === ViewState.Saving}
        event={currentEvent}
      />
      {error && (
        <div className="notification error">
          Saving error: {error?.message}
        </div>
      )}
      {viewState === ViewState.Saved && (
        <div className="notification success">Event has been created</div>
      )}
    </Container>
  );
}
