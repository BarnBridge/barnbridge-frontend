import { FormEvent, ReactElement, createContext, useCallback, useContext } from 'react';
import { Controller, FieldValues, useForm as rhUseForm, UseFormReturn as rhUseFormReturn } from 'react-hook-form';
import { UseFormStateReturn } from 'react-hook-form/dist/types';
import { ControllerFieldState, ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { Resolver, ResolverResult } from 'react-hook-form/dist/types/resolvers';
import { validate } from 'valirator';

import { CP } from 'components/types.tx';

import { InvariantContext } from 'utils/context';

type SchemeType = {
  [field: string]: Record<string, any>;
};

type FormContext = {
  scheme?: SchemeType;
};

type UseFormReturn<V extends FieldValues = FieldValues> = rhUseFormReturn<V> & {
  submit: () => void | Promise<void>;
};

type InternalContextType<V extends FieldValues = FieldValues> = {
  instance: UseFormReturn<V>;
};

const InternalContext = createContext<InternalContextType>(InvariantContext('Form'));

function VFormEmptyResolver(values: FieldValues): ResolverResult {
  return {
    values,
    errors: {},
  };
}

export async function VFormValidationResolver(values: FieldValues, context?: FormContext): Promise<ResolverResult> {
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
}

type useFormProps = {
  validationScheme?: SchemeType;
  onSubmit: () => void | Promise<void>;
};

export function useForm<V extends FieldValues = FieldValues>(props: useFormProps): UseFormReturn<V> {
  const { validationScheme, onSubmit } = props;

  const resolver = (validationScheme ? VFormValidationResolver : VFormEmptyResolver) as Resolver<V, FormContext>;

  const rhForm = rhUseForm<V, FormContext>({
    mode: 'all',
    resolver,
    context: {
      scheme: validationScheme,
    },
  });

  const submit = rhForm.handleSubmit(onSubmit);

  return Object.assign(rhForm, {
    submit,
  });
}

export type FormProps = {
  form: UseFormReturn<any>;
};

export function Form(props: CP<FormProps>) {
  const { children, className, form } = props;

  const handleSubmit = useCallback(
    (ev: FormEvent) => {
      ev.preventDefault();
      form.submit();
    },
    [form.submit],
  );

  const value: InternalContextType = {
    instance: form,
  };

  return (
    <InternalContext.Provider value={value as InternalContextType}>
      <form className={className} onSubmit={handleSubmit}>
        {children}
      </form>
    </InternalContext.Provider>
  );
}

export type FormItemRender = {
  field: ControllerRenderProps<FieldValues, string>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
};

export type FormItemProps = {
  name: string;
  children: (field: FormItemRender) => ReactElement;
};

export function FormItem(props: CP<FormItemProps>) {
  const { children, name } = props;
  const { instance } = useContext(InternalContext);

  return <Controller name={name} control={instance.control} render={children} />;
}
