import * as React from "react";
import { useEffect, useState } from "react";
import { Event } from "../types";
import { EventItem } from "../shared/EventItem";
import { eventsService } from "../eventsService";

export function EventsList() {
  const [events, setEvents] = useState<Event[]>([]);
  useEffect(() => {
    eventsService.fetch().then(setEvents);
  }, []);

  return (
    <div className="container">
      {events.map((s, i) => (
        <div>
          <EventItem key={i} event={s} />
          <div className="event-actions">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
