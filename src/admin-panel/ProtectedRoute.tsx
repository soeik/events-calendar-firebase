import * as React from "react";
import { useContext, useEffect } from "react";
import { authContext, AuthState } from "../authContext";
import { Column, Container, Row } from "../layout";
import { Loader } from "../shared/Loader";
import { RouteComponentProps, useNavigate } from "@reach/router";
import { RouterPath } from "../router-path";
import { useTranslation } from "react-i18next";

interface Props extends RouteComponentProps {
  as: React.ComponentType;
}

export function ProtectedRoute({ as }: Props) {
  const { t } = useTranslation();
  const { authState } = useContext(authContext);
  const navigate = useNavigate();
  const Component = as;

  // TODO: implement redirect with timeout
  useEffect(() => {
    console.info(authState);
  }, [authState]);

  if (authState === AuthState.LoggedOut) {
    return (
      <Container>
        <Row>
          <Column>
            <h4 style={{ marginTop: "200px" }} className="text-center">
              {t("NotAuthorized")}
            </h4>
            <div className="text-center">
              <button onClick={() => navigate(RouterPath.SignIn)}>
                {t("ToTheSignInPage")}
              </button>
            </div>
          </Column>
        </Row>
      </Container>
    );
  }

  if (authState === AuthState.Authenticating) {
    return <Loader />;
  }

  return <Component />;
}
