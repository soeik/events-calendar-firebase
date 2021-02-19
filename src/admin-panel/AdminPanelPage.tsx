import * as React from "react";
import { Header } from "./Header";
import { Row, Column, Container } from "../layout";
import { EventsList } from "./EventsList";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { RouterPath } from "../router-path";
import { FC } from "react";
import { useTranslation } from "react-i18next";

export const AdminPanelPage: FC<RouteComponentProps> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <Container>
        <Row>
          <Column size={12}>
            <button
              className="u-full-width button-primary"
              onClick={() => navigate(RouterPath.AddEvent)}
            >
              {t("AddEvent")}
            </button>
          </Column>
        </Row>
        <EventsList />
      </Container>
    </>
  );
};
