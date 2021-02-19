import * as React from "react";
import { useState } from "react";
import { EditEventForm } from "./EditEventForm";
import { eventsService } from "../eventsService";
import { Column, Container, Row } from "../layout";
import { makeNewEventWithDefaults } from "../types";
import { useNavigate } from "@reach/router";
import { RouterPath } from "../router-path";
import { useTranslation } from "react-i18next";

enum ViewState {
  Normal = "Normal",
  Saving = "Saving",
  Saved = "Saved",
  Error = "Error",
}

export function AddEvent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [viewState, setViewState] = useState(ViewState.Normal);
  const [error, setError] = useState(null);
  const defaultEvent = {
    place: t("DefaultPlace"),
    time: "14:00",
  };
  const [currentEvent, setCurrentEvent] = useState(
      makeNewEventWithDefaults(defaultEvent)
  );
  const onSubmit = (event) => {
    // TODO: Display progress
    setViewState(ViewState.Saving);
    eventsService
        .add(event)
        .then(() => {
          setViewState(ViewState.Saved);
          setCurrentEvent(makeNewEventWithDefaults(defaultEvent));
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
            <button onClick={() => navigate(RouterPath.Panel)}>
              {t("BackToTheList")}
            </button>
            <hr />
          </Column>
        </Row>
        <Row>
          <Column>
            <h3>{t("AddEvent")}</h3>
          </Column>
        </Row>
        <EditEventForm
            onSubmit={onSubmit}
            disabled={viewState === ViewState.Saving}
            event={currentEvent}
        />
        {error && (
            <div className="notification error">
              {t("SavingError")}: {error?.message}
            </div>
        )}
        {viewState === ViewState.Saved && (
            <div className="notification success">
              {t("EventSuccessfullySaved")}
            </div>
        )}
      </Container>
  );
}
