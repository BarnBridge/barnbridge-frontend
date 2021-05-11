import React, { useCallback, useRef, useState } from 'react';

export function useForm() {
  const [values, setValues] = useState<any>({});
  const valuesRef = useRef(values);
  valuesRef.current = values;

  const register = useCallback((fieldName: string) => {
    if (!fieldName) {
      throw new Error('Invalid register field!');
    }

    if (valuesRef.current.hasOwnProperty(fieldName)) {
      throw new Error('Field is already registered!');
    }

    return {
      name: fieldName,
      get value() {
        return valuesRef.current?.[fieldName];
      },
      onChange(e: any) {
        setValues((prevState: any) => ({
          ...prevState,
          [fieldName]: e.target.value,
        }));
      },
    };
  }, []);

  return {
    register,
    values,
  };
}
