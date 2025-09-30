"use client";

import { FieldValues, Control, Path } from "react-hook-form";

import {
  FormControl,
  FormField as FormFieldShadcn,
  FormItem,
  FormLabel,
  FormMessage,
} from "@atoms/shadcn/form";
import { Input } from "@atoms/shadcn/input";
import { cn } from "@utils/cn";

interface Properties<FormInputs extends FieldValues> {
  formControl: Control<FormInputs>;
  input: React.ComponentProps<"input">;
  name: Path<FormInputs>;
  label: string;
}

export default function FormField<FormInputs extends FieldValues>({
  formControl,
  input,
  name,
  label,
}: Properties<FormInputs>) {
  return (
    <FormFieldShadcn
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              {...input}
              {...field}
              className={cn("mt-2", input.className)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
