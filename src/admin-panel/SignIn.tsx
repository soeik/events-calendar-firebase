import * as React from "react";
import { useForm } from "../util/useForm";
import { Column, Container, Row } from "../layout";

const style = {
  marginTop: "200px",
};

interface SignInProps {
  onSignIn: (userCredentials: object) => void;
  authError: Error;
}

export function SignIn({ onSignIn, authError }: SignInProps) {
  // TODO: Prefill form with saved email?
  // TODO: Form validation
  const { handleSubmit, handleChange } = useForm({});

  return (
    <Container style={style}>
      <form onSubmit={handleSubmit(onSignIn)}>
        <Row>
          <Column size={4} offset={4}>
            <label>
              Электронная почта
              <input
                className="u-full-width"
                type="email"
                name="email"
                onChange={handleChange}
              />
            </label>
            <label>
              Пароль
              <input
                className="u-full-width"
                type="password"
                name="password"
                onChange={handleChange}
              />
            </label>
            <button className="button-primary">Войти</button>
            <div style={{ color: "red" }}>
              {authError ? "Ошибка авторизации: неверный логин или пароль" : ""}
            </div>
          </Column>
        </Row>
      </form>
    </Container>
  );
}
