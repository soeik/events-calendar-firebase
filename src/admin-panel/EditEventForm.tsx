import { Event } from "../types";
import * as React from "react";
import { useForm } from "../util/useForm";
import { Column, Row } from "../layout";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface EditEventFormProps {
  onSubmit: (e) => void;
  disabled?: boolean;
  event?: Event;
}

enum EditEventFormFields {
  Title = "title",
  Reporter = "reporter",
  Date = "date",
  Time = "time",
  Place = "place",
}

export function EditEventForm({
  onSubmit,
  disabled,
  event,
}: EditEventFormProps) {
  // TODO: Form validation
  // TODO: Error handing
  const { t } = useTranslation();

  const validateForm = (formFields) => {
    let valid = true;
    Object.values(EditEventFormFields).forEach((key) => {
      if (!formFields[key]) {
        valid = false;
      }
    });
    return valid;
  };

  const { handleSubmit, handleChange, values, setValues } = useForm<Event>({
    // FIXME: Initial values should be used only for new events, not for edit mode
    initialValues: event,
  });

  const [formValid, setFormValid] = useState(false);

  useEffect(() => {
    setFormValid(validateForm(values));
  }, [values]);

  useEffect(() => {
    setValues(event);
  }, [event]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Column>
          <label>{t("EventTitle")}</label>
          <input
            className="u-full-width"
            type="text"
            name={EditEventFormFields.Title}
            onChange={handleChange}
            value={values.title}
            disabled={disabled}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <label>{t("Speaker")}</label>
          <input
            className="u-full-width"
            type="text"
            name={EditEventFormFields.Reporter}
            onChange={handleChange}
            value={values.reporter}
            disabled={disabled}
          />
        </Column>
      </Row>
      <Row>
        <Column size={6}>
          <label>{t("Date")}</label>
          <input
            className="u-full-width"
            type="date"
            name={EditEventFormFields.Date}
            onChange={handleChange}
            value={values.date}
            disabled={disabled}
          />
        </Column>
        <Column size={6}>
          <label>{t("Time")}</label>
          <input
            className="u-full-width"
            type="time"
            name={EditEventFormFields.Time}
            onChange={handleChange}
            value={values.time}
            disabled={disabled}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <label>{t("Place")}</label>
          <input
            className="u-full-width"
            type="text"
            name={EditEventFormFields.Place}
            onChange={handleChange}
            value={values.place}
            disabled={disabled}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <button className="button-primary" disabled={!formValid || disabled}>
            {t("Save")}
          </button>
        </Column>
      </Row>
    </form>
  );
}
