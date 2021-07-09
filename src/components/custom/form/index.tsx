import { FC, ReactNode, createContext, useCallback, useContext, useMemo } from 'react';
import { UseFormRegisterReturn, UseFormReturn, useForm } from 'react-hook-form';
import { validate } from 'valirator';

import { InvariantContext } from 'utils/context';

type FieldValues = Record<string, any>;

type FormType<V = FieldValues> = {
  instance: UseFormReturn<V>;
};

const Context = createContext<FormType>(InvariantContext<FormType>('Form'));

export function useVForm(): FormType {
  return useContext(Context);
}

type VFormScheme = {
  [field: string]: Record<string, any>;
};

type ContextValues = {
  scheme?: VFormScheme;
};

export const VFormValidationResolver = async (values: FieldValues, context?: ContextValues) => {
  const validationResult = await validate(context?.scheme, values);
  const errors = validationResult.getErrors();

  return {
    values,
    errors: Object.keys(errors).reduce((res, path) => {
      const errKey = Object.keys(errors[path])[0];

      if (errKey) {
        res[path] = {
          type: errKey,
          message: errors[path][errKey],
        };
      }

      return res;
    }, {} as Record<string, any>),
  };
};

export type FormProps = {
  validationScheme?: VFormScheme;
  watch?: string[];
  onSubmit: (values: any) => void;
};

export const VForm: FC<FormProps> = props => {
  const { children, validationScheme, watch } = props;

  const rhForm = useForm<FieldValues, ContextValues>({
    resolver: VFormValidationResolver,
    context: {
      scheme: validationScheme,
    },
  });

  watch?.forEach(key => {
    rhForm.watch(key);
  });

  const handleSubmit = useCallback(() => {
    rhForm.handleSubmit(props.onSubmit);
  }, [rhForm, props.onSubmit]);

  const value: FormType = useMemo(
    () => ({
      instance: rhForm,
    }),
    [rhForm],
  );

  return (
    <Context.Provider value={value}>
      <form onSubmit={handleSubmit}>{children}</form>
    </Context.Provider>
  );
};

export type FormItemProps = {
  name: string;
  children: (field: UseFormRegisterReturn) => ReactNode;
};

export const VFormItem: FC<FormItemProps> = props => {
  const { children, name } = props;

  const vForm = useVForm();
  const field = vForm.instance.register(name);

  return <>{children(field)}</>;
};
