export interface RawEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  reporter: string;
  place: string;
}

export interface Event extends RawEvent {
  status: "upcoming" | "occurred";
}

export const makeEvent = (rawEvent: RawEvent) =>
  ({
    ...rawEvent,
    status: new Date() <= new Date(rawEvent.date) ? "upcoming" : "occurred",
  } as Event);

export const makeNewEventWithDefaults = (
  initialValues?: Partial<RawEvent>
) =>
  ({
    title: "",
    reporter: "",
    date: "",
    place: "",
    time: "",
    ...initialValues,
  } as Event);
