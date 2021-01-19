import { Event } from "../types";
import * as React from "react";
import { useForm } from "../util/useForm";
import { Column, Row } from "../layout";
import { useEffect, useState } from "react";

interface Props {
  onSubmit: (e) => void;
  disabled?: boolean;
  event?: Event;
}

enum EventFormFields {
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
}: Props) {
  // TODO: Form validation
  // TODO: Error handing

  const validateForm = (formFields) => {
    let valid = true;
    Object.values(EventFormFields).forEach((key) => {
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
          <label>Topic</label>
          <input
            className="u-full-width"
            type="text"
            name={EventFormFields.Title}
            onChange={handleChange}
            value={values.title}
            disabled={disabled}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <label>Reporter</label>
          <input
            className="u-full-width"
            type="text"
            name={EventFormFields.Reporter}
            onChange={handleChange}
            value={values.reporter}
            disabled={disabled}
          />
        </Column>
      </Row>
      <Row>
        <Column size={6}>
          <label>Date</label>
          <input
            className="u-full-width"
            type="date"
            name={EventFormFields.Date}
            onChange={handleChange}
            value={values.date}
            disabled={disabled}
          />
        </Column>
        <Column size={6}>
          <label>Time</label>
          <input
            className="u-full-width"
            type="time"
            name={EventFormFields.Time}
            onChange={handleChange}
            value={values.time}
            disabled={disabled}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <label>Place</label>
          <input
            className="u-full-width"
            type="text"
            name={EventFormFields.Place}
            onChange={handleChange}
            value={values.place}
            disabled={disabled}
          />
        </Column>
      </Row>
      <Row>
        <Column>
          <button className="button-primary" disabled={!formValid || disabled}>
            Save
          </button>
        </Column>
      </Row>
    </form>
  );
}
