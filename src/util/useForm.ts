import { useState } from "react";

type UseFormArgs<T> = {
  initialValues?: Partial<T>;
};

type UseFormReturnType<T> = {
  values: Partial<T>;
  setValues: (v: Partial<T>) => void;
  handleChange: (e: React.SyntheticEvent) => void;
  handleSubmit: (
    onSubmit: (values: T, e: React.SyntheticEvent) => any
  ) => (e: React.SyntheticEvent) => void;
};

export function useForm<T>({ initialValues = {} }: UseFormArgs<T>) {
  const [values, setValues] = useState<Partial<T>>(initialValues);

  return {
    values,
    setValues,
    handleChange,
    handleSubmit,
  } as UseFormReturnType<T>;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  }

  function handleSubmit(onSubmit) {
    return (e) => {
      if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
      }
      onSubmit(values, e);
    };
  }
}
