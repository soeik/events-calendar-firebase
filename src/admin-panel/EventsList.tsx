import * as React from "react";
import { useEffect, useState } from "react";
import { Event } from "../types";
import { eventsService } from "../eventsService";
import { Column, Row } from "../layout";
import { Loader } from "../shared/Loader";
import { sortByDate } from "../utils";
import { useTranslation } from "react-i18next";
import { useNavigate } from "@reach/router";
import { RouterPath } from "../router-path";

enum ViewState {
  Loading = "Loading",
  Normal = "Normal",
  Error = "Error",
}
export function EventsList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [events, setEvents] = useState<Event[]>([]);
  const [viewState, setViewState] = useState(ViewState.Loading);
  useEffect(() => {
    eventsService
      .fetch()
      .then((data) => {
        setEvents(data);
        setViewState(ViewState.Normal);
      })
      .catch(() => {
        setViewState(ViewState.Error);
      });
  }, []);

  if (viewState === ViewState.Loading) {
    return <Loader />;
  }
  // TODO: Error case
  return (
    <>
      {events.sort(sortByDate).map((s) => (
        <Row key={s.id}>
          <Column size={10}>
            <h5>
              {s.date} &mdash; {s.title}
            </h5>
            <p>
              {s.reporter}, {s.place}
            </p>
          </Column>
          <Column size={2}>
            <div className="text-right">
              <div>
                <button onClick={() => navigate(RouterPath.EditEvent + s.id)}>
                  {t("Edit")}
                </button>
              </div>
              {/*<div>*/}
              {/*  <a>Delete</a>*/}
              {/*</div>*/}
            </div>
          </Column>
          <hr />
        </Row>
      ))}
    </>
  );
}
