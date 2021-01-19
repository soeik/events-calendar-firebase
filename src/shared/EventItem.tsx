import * as React from "react";
import { Event } from "../types";
import { Column, Row } from "../layout";

interface Props {
  event: Event;
}

export function EventItem({ event }: Props) {
  return (
    <Row className="entry">
      <Column className="date" size={2}>
        <div className="day">{getDay(event.date)}</div>
        <div className="month">{getLocalizedMonth(event.date)}</div>
        <div className="year">{getYear(event.date)}</div>
      </Column>
      <Column size={10}>
        <h5 className="entry-title">
          {event.title}
          <small>{event.reporter}</small>
        </h5>
        <div className="entry-details">
          {event.place} {event.time}
        </div>
      </Column>
    </Row>
  );
}

function getDay(date) {
  return date.slice(8, 10);
}

function getLocalizedMonth(date) {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return month[parseInt(date.slice(5, 7), 10) - 1];
}

function getYear(date) {
  return date.slice(0, 4);
}
