"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@atoms/shadcn/button";
import { Form } from "@atoms/shadcn/form";
import { DatePicker } from "@atoms/date-picker";
import FormField from "@molecules/form-field";
import FormPlanningOut from "@config/interfaces/out/form-planning";
import FetchError from "@config/interfaces/fetch-error";
import { Country } from "@config/interfaces/in/countries";
import usefetchJson from "@utils/fetch-json";

interface Properties {
  countries: Country[];
}

export default function FormPlanning({ countries }: Properties) {
  const fetchJson = usefetchJson<FormPlanningOut>();
  const tFormPlanning = useTranslations("organisms.forms.planning");
  const tErrorsZod = useTranslations("errors.zod");

  const formSchema = z.object({
    startDate: z.date().refine((value) => !Number.isNaN(value.getTime()), {
      message: tErrorsZod("date-required"),
    }),
    endDate: z.date().refine((value) => !Number.isNaN(value.getTime()), {
      message: tErrorsZod("date-required"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });

  function onSubmit() {
    const body = {
      countries: countries.map((country) => country.cca3),
    };

    fetchJson({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/roadtrip`,
      options: { method: "PUT", body: body },
    })
      .then(() => {
        toast.success(tFormPlanning("success.title"), {
          description: tFormPlanning("success.description"),
        });
      })
      .catch((error: FetchError) => {
        if (error.status === 400 || error.status === 401) {
          toast.error(tFormPlanning(`${error.status}.title`), {
            description: tFormPlanning(`${error.status}.description`),
          });
        }
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 md:items-end w-full md:flex-row"
        noValidate
      >
        <FormField<z.infer<typeof formSchema>>
          name="startDate"
          render={({ field }) => (
            <DatePicker<z.infer<typeof formSchema>>
              label={tFormPlanning("start-date")}
              field={field}
            />
          )}
          formControl={form.control}
        />
        <FormField<z.infer<typeof formSchema>>
          name="startDate"
          render={({ field }) => (
            <DatePicker<z.infer<typeof formSchema>>
              label={tFormPlanning("start-date")}
              field={field}
            />
          )}
          formControl={form.control}
        />
        <Button type="submit" className="md:ml-auto">
          {tFormPlanning("submit")}
        </Button>
      </form>
    </Form>
  );
}
