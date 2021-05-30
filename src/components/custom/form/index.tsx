import React, { FC, createContext, useContext } from 'react';
import { UseFormRegisterReturn, UseFormReturn, useForm } from 'react-hook-form';
import { validate } from 'valirator';

type VType = Record<string, any>;

type VFormType<V = VType> = {
  instance: UseFormReturn<V>;
};

const VFormContext = createContext<VFormType>(undefined as any);

export function useVForm(): VFormType {
  return useContext(VFormContext);
}

type VFormScheme = {
  [field: string]: Record<string, any>;
};

type VFormContextType = {
  scheme?: VFormScheme;
};

export const VFormValidationResolver = async (values: any, context?: VFormContextType) => {
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

export type VFormProps = {
  validationScheme?: VFormScheme;
  watch?: string[];
  onSubmit: (values: any) => void;
};

export const VForm: FC<VFormProps> = props => {
  const { children, validationScheme, watch } = props;
  const rhForm = useForm({
    resolver: VFormValidationResolver,
    context: {
      scheme: validationScheme,
    },
  });

  watch?.forEach(key => {
    rhForm.watch(key);
  });

  function handleSubmit() {
    rhForm.handleSubmit(props.onSubmit);
  }

  const value: VFormType = {
    instance: rhForm,
  };

  return (
    <VFormContext.Provider value={value}>
      <form onSubmit={handleSubmit}>{children}</form>
    </VFormContext.Provider>
  );
};

export type VFormItemProps = {
  name: string;
  children: (field: UseFormRegisterReturn) => React.ReactNode;
};

export const VFormItem: FC<VFormItemProps> = props => {
  const { children, name } = props;
  const vForm = useVForm();

  return <>{children(vForm.instance.register(name))}</>;
};
