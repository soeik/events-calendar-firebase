import * as React from "react";
import { useEffect, useState } from "react";
import { EditEventForm } from "./EditEventForm";
import { eventsService } from "../eventsService";
import { Column, Container, Row } from "../layout";
import { useNavigate } from "@reach/router";
import { RouterPath } from "../router-path";
import { useTranslation } from "react-i18next";
import { Event } from "../types";
import { Loader } from "../shared/Loader";

enum ViewState {
  Loading = "Loading",
  Normal = "Normal",
  Saving = "Saving",
  Saved = "Saved",
  Error = "Error",
}

interface EditEventProps {
  eventId?: string;
}

export function EditEvent({ eventId }: EditEventProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [viewState, setViewState] = useState(ViewState.Loading);
  const [error, setError] = useState(null);
  const [currentEvent, setCurrentEvent] = useState<Event>(null);

  useEffect(() => {
    eventsService.get(eventId).then((event) => {
      setViewState(ViewState.Normal);
      setCurrentEvent(event);
    });
  }, []);

  const onSubmit = (event) => {
    // TODO: Display progress
    setViewState(ViewState.Saving);
    eventsService
      .update(eventId, event)
      .then(() => {
        setViewState(ViewState.Saved);
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
          <h3>{t("EditEvent")}</h3>
        </Column>
      </Row>
      {currentEvent && (
        <EditEventForm
          onSubmit={onSubmit}
          disabled={viewState === ViewState.Saving}
          event={currentEvent}
        />
      )}
      {viewState === ViewState.Error && (
        <div className="notification error">
          {t("SavingError")}: {error?.message}
        </div>
      )}
      {viewState === ViewState.Loading && <Loader />}
      {viewState === ViewState.Saved && (
        <div className="notification success">
          {t("EventSuccessfullySaved")}
        </div>
      )}
    </Container>
  );
}
