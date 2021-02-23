export const RouterPath = {
  Home: "/",
  SignIn: "/sign-in",
  Panel: "/panel",
  AddEvent: "/panel/add-event",
  EditEvent: "/panel/edit-event/:eventId", // TODO: generate with id
};

export const generateEditEventPath = (eventId: string) =>
  RouterPath.EditEvent.replace(":eventId", eventId);
