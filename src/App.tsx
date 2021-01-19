import * as React from "react";
import { useRoutes } from "hookrouter";
import { Gatekeeper } from "./admin-panel/Gatekeeper";
import { EventsPage } from "./events/EventsPage";

const routes = {
  "/": () => <EventsPage />,
  "/panel": () => <Gatekeeper />,
};

export function App() {
  const routeResult = useRoutes(routes);

  return routeResult || <p>Not found</p>;
}
