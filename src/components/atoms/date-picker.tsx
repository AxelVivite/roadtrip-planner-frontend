"use client";

import * as React from "react";
import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { useTranslations } from "next-intl";
import { CalendarIcon } from "lucide-react";

import { Button } from "@atoms/shadcn/button";
import { Calendar } from "@atoms/shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@atoms/shadcn/popover";
import { FormControl, FormItem, FormLabel, FormMessage } from "@atoms/shadcn/form";
import { cn } from "@utils/cn";

interface Properties<FormSchema extends FieldValues> {
  field: ControllerRenderProps<FormSchema>;
  label: string;
}

export function DatePicker<FormSchema extends FieldValues>({
  field,
  label,
}: Properties<FormSchema>) {
  const tDatePicker = useTranslations("atoms.date-picker");

  return (
    <FormItem className="flex flex-col">
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "w-[240px] pl-3 text-left font-normal",
                !field.value && "text-muted-foreground"
              )}
            >
              {field.value ? (
                new Date(field.value).toLocaleDateString("fr-FR")
              ) : (
                <span>{tDatePicker("pick-a-date")}</span>
              )}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.value}
            onSelect={field.onChange}
            disabled={(date) => date < new Date()}
            captionLayout="dropdown"
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}
