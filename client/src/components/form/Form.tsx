import React, { PropsWithChildren } from "react";
import {
  DeepPartial,
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormProps<TFormValues> {
  schema: z.Schema;
  onSubmit: (data: TFormValues) => Promise<void>;
  defaultValues?: DefaultValues<TFormValues>;
}

const Form = <TFormValues extends FieldValues>({
  schema,
  onSubmit,
  children,
  defaultValues,
}: PropsWithChildren<FormProps<TFormValues>>) => {
  const methods = useForm<TFormValues>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  const submitHandler: SubmitHandler<TFormValues> = async (
    data: z.infer<typeof schema>,
  ) => {
    methods.reset();
    await onSubmit(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-8"
        onSubmit={methods.handleSubmit(submitHandler)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;

interface FormInputProps {
  name: string;
  displayName: string;
  type: "text" | "number";
  required?: boolean;
}

export const Input = ({
  name,
  displayName,
  type,
  required = false,
}: FormInputProps) => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  return (
    <fieldset className="flex flex-col items-start gap-1 rounded-[4px] border border-gray-6 bg-colors-gray-2 px-[10px] py-[8px] text-gray-11">
      <label className="w-full text-left text-xs text-gray-11" htmlFor={name}>
        {displayName}
      </label>
      <input
        className="inline-flex h-[25px] w-full items-center justify-center rounded-[4px] border-none bg-colors-gray-2 text-[15px] leading-none text-gray-12 outline-none"
        id={name}
        type={type}
        {...register(name, {
          setValueAs: (v) =>
            type === "number" ? (v === "" ? undefined : parseInt(v, 10)) : v,
          required: required,
        })}
        disabled={isSubmitting}
      />
    </fieldset>
  );
};
