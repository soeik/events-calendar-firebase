import * as React from "react";
import { useForm } from "../util/useForm";
import { Column, Container, Row } from "../layout";
import { useTranslation } from "react-i18next";

const style = {
  marginTop: "200px",
};

interface SignInProps {
  onSignIn: (userCredentials: object) => void;
  authError: Error;
}

export function SignInForm({ onSignIn, authError }: SignInProps) {
  // TODO: Prefill form with saved email?
  // TODO: Form validation
  const { t } = useTranslation();
  const { handleSubmit, handleChange } = useForm({});

  return (
    <Container style={style}>
      <form onSubmit={handleSubmit(onSignIn)}>
        <Row>
          <Column size={4} offset={4}>
            <label>
              {t("Email")}
              <input
                className="u-full-width"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </label>
            <label>
              {t("Password")}
              <input
                className="u-full-width"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </label>
            <button className="button-primary">{t("SignIn")}</button>
            <div style={{ color: "red" }}>
              {authError ? t("AuthErrorLoginPassword") : ""}
            </div>
          </Column>
        </Row>
      </form>
    </Container>
  );
}
