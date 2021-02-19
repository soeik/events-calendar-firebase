import * as React from "react";
import { FC, useEffect, useState } from "react";
import { Event } from "../types";
import { EventItem } from "./EventItem";
import { eventsService } from "../eventsService";
import { Row } from "../layout";
import cx from "classnames";
import { Loader } from "../shared/Loader";
import { sortByDate } from "../utils";
import { RouteComponentProps } from "@reach/router";
import { useTranslation } from "react-i18next";

enum ViewState {
  Loading = "Loading",
  Normal = "Normal",
  Error = "Error", // TODO: Not used yet
}

enum FilterCondition {
  All = "all",
  Upcoming = "upcoming",
  Occurred = "occurred",
}

export const EventsPage: FC<RouteComponentProps> = () => {
  const { t } = useTranslation();
  const [events, setEvents] = useState<Event[]>([]);
  const [viewState, setViewState] = useState(ViewState.Loading);
  const [filter, setFilter] = useState(FilterCondition.Upcoming);
  const onFilterClick = (e) => setFilter(e.target.value);

  useEffect(() => {
    eventsService.fetch().then((data) => {
      setEvents(data);
      setViewState(ViewState.Normal);
    });
  }, []);

  return (
    <div className="container">
      {renderHeading()}
      {renderFilter()}
      {viewState === ViewState.Loading
        ? renderLoadingState()
        : renderSeminars()}
    </div>
  );

  function renderHeading() {
    return (
      <Row className="text-center">
        <h3 className="site-title">
          {t("SiteTitle")}
          <small>{t("SiteSubtitle")}</small>
        </h3>
      </Row>
    );
  }

  function renderFilter() {
    return (
      <Row className="text-center filter">
        <button
          className={cx({
            "button-primary": filter === FilterCondition.All,
          })}
          value={FilterCondition.All}
          onClick={onFilterClick}
        >
          {t("All")}
        </button>
        <button
          className={cx({
            "button-primary": filter === FilterCondition.Upcoming,
          })}
          value={FilterCondition.Upcoming}
          onClick={onFilterClick}
        >
          {t("Upcoming")}
        </button>
        <button
          className={cx({
            "button-primary": filter === FilterCondition.Occurred,
          })}
          value={FilterCondition.Occurred}
          onClick={onFilterClick}
        >
          {t("Occurred")}
        </button>
      </Row>
    );
  }

  function renderSeminars() {
    return (
      events
        .filter((s) => s.status === filter || filter === FilterCondition.All)
        // FIXME: Sorting doesn't work properly
        .sort(sortByDate)
        .map((s) => <EventItem key={s.id} seminar={s} />)
    );
  }

  function renderLoadingState() {
    return <Loader />;
  }
};
