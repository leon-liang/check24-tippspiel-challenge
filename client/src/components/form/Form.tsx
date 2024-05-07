import React, { PropsWithChildren } from "react";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface FormProps {
  schema: z.ZodObject<any>;
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
}

const Form = ({
  schema,
  onSubmit,
  children,
  defaultValues,
}: PropsWithChildren<FormProps>) => {
  type FormData = z.infer<typeof schema>;

  const methods = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(schema),
  });

  return (
    <FormProvider {...methods}>
      <form
        className="flex flex-col gap-8"
        onSubmit={methods.handleSubmit(onSubmit)}
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
}

export const Input = ({ name, displayName, type }: FormInputProps) => {
  const {
    register,
    formState: { isSubmitting, errors },
  } = useFormContext();

  return (
    <fieldset className="flex flex-col items-start gap-2">
      <label className="text-right text-[15px] text-indigo-11" htmlFor={name}>
        {displayName}
      </label>
      <input
        className="inline-flex h-[35px] w-full items-center justify-center rounded-[4px] px-[10px] text-[15px] leading-none text-indigo-11 shadow-[0_0_0_1px] shadow-indigo-7 outline-none focus:shadow-[0_0_0_2px] focus:shadow-indigo-8"
        id={name}
        type={type}
        {...register(name, { valueAsNumber: type === "text" })}
        disabled={isSubmitting}
      />
    </fieldset>
  );
};
