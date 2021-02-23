import { makeEvent, RawEvent, Event } from "./types";
import { db } from "./firebase";

const eventsCollection = db.collection("seminars");

export const eventsService = {
  fetch: () =>
    eventsCollection.get().then((snapshot) =>
      snapshot.docs.map((event) => {
        const rawEvent = {
          id: event.id,
          ...event.data(),
        } as RawEvent;
        return makeEvent(rawEvent);
      })
    ),
  get: (eventId: string) =>
    eventsCollection
      .doc(eventId)
      .get()
      .then((event) => {
        if (event.exists) {
          const rawEvent = {
            id: eventId,
            ...event.data(),
          } as RawEvent;
          return makeEvent(rawEvent);
        } else {
          return null;
        }
      }),
  add: (event: Event) => eventsCollection.add(event),
  update: (eventId: string, event: RawEvent) =>
    eventsCollection.doc(eventId).update(event),
};
