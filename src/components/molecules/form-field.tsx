"use client";

import {
  FieldValues,
  Control,
  Path,
  ControllerRenderProps,
  ControllerFieldState,
  UseFormStateReturn,
} from "react-hook-form";

import {
  FormControl,
  FormField as FormFieldShadcn,
  FormItem,
  FormLabel,
  FormMessage,
} from "@atoms/shadcn/form";
import { Input } from "@atoms/shadcn/input";
import { cn } from "@utils/cn";

type RenderProperties<FormInputs extends FieldValues> = {
  field: ControllerRenderProps<FormInputs, Path<FormInputs>>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FormInputs>;
};

interface Properties<FormInputs extends FieldValues> {
  formControl: Control<FormInputs>;
  input?: React.ComponentProps<"input">;
  name: Path<FormInputs>;
  label?: string;
  render?: ({
    field,
    fieldState,
    formState,
  }: RenderProperties<FormInputs>) => React.ReactElement;
}

export default function FormField<FormInputs extends FieldValues>({
  formControl,
  input,
  name,
  label,
  render,
}: Properties<FormInputs>) {
  const inputRender = ({ field }: RenderProperties<FormInputs>) => (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input {...input} {...field} className={cn("mt-2", input?.className)} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );

  return (
    <FormFieldShadcn
      control={formControl}
      name={name}
      render={render ?? inputRender}
    />
  );
}
