import * as React from "react";
import { useEffect, useState } from "react";
import { Event } from "../types";
import { EventItem } from "../shared/EventItem";
import { eventsService } from "../eventsService";
import { Row } from "../layout";
import cx from "classnames";
import { Loader } from "../shared/Loader";

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

export function EventsPage() {
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
        : renderEvents()}
    </div>
  );

  function renderHeading() {
    return (
      <Row className="text-center">
        <h3 className="site-title">
          Events calendar
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
          Все
        </button>
        <button
          className={cx({
            "button-primary": filter === FilterCondition.Upcoming,
          })}
          value={FilterCondition.Upcoming}
          onClick={onFilterClick}
        >
          Предстоящие
        </button>
        <button
          className={cx({
            "button-primary": filter === FilterCondition.Occurred,
          })}
          value={FilterCondition.Occurred}
          onClick={onFilterClick}
        >
          Прошедшие
        </button>
      </Row>
    );
  }

  function renderEvents() {
    return (
      events
        .filter((s) => s.status === filter || filter === FilterCondition.All)
        // FIXME: Sorting doesn't work properly
        .sort((a, b) => {
          if (a.date > b.date) {
            return 1;
          } else if (a.date < b.date) {
            return -1;
          } else {
            return 0;
          }
        })
        .map((s) => <EventItem key={s.id} event={s} />)
    );
  }

  function renderLoadingState() {
    return <Loader />;
  }
}
