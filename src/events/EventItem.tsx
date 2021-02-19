import * as React from "react";
import { Event } from "../types";
import { Column, Row } from "../layout";

interface SeminarItemProps {
  seminar: Event;
}

export function EventItem({ seminar }: SeminarItemProps) {
  return (
    <Row className="entry">
      <Column className="date" size={2}>
        <div className="day">{getDay(seminar.date)}</div>
        <div className="month">{getLocalizedMonth(seminar.date)}</div>
        <div className="year">{getYear(seminar.date)}</div>
      </Column>
      <Column size={10}>
        <h5 className="entry-title">
          {seminar.title}
          <small>{seminar.reporter}</small>
        </h5>
        <div className="entry-details">
          {seminar.place} {seminar.time}
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
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  return month[parseInt(date.slice(5, 7), 10) - 1];
}

function getYear(date) {
  return date.slice(0, 4);
}
