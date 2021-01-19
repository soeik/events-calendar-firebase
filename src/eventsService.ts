import { makeEvent, RawEvent, Event } from "./types";
import { db } from "./firebase";

const eventsCollection = db.collection("events");

export const eventsService = {
  fetch: () =>
    eventsCollection.get().then((snapshot) =>
      snapshot.docs.map((d) => {
        const rawEvent = {
          id: d.id,
          ...d.data(),
        } as RawEvent;
        return makeEvent(rawEvent);
      })
    ),
  add: (event: Event) => eventsCollection.add(event),
};
