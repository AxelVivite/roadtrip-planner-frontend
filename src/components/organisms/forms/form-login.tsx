"use client";

import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@atoms/shadcn/button";
import { Form } from "@atoms/shadcn/form";
import FormField from "@molecules/form-field";
import FormLoginOut from "@/config/interfaces/out/form-login";

export default function FormLogin() {
  const tLogin = useTranslations("organisms.forms.login");
  const tErrorsZod = useTranslations("errors.zod");

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: tErrorsZod("emailRequired") })
      .pipe(z.email({ message: tErrorsZod("emailInvalid") })),
    password: z
      .string()
      .min(8, { message: tErrorsZod("passwordMin") })
      .max(64, { message: tErrorsZod("passwordMax") })
      .regex(/[A-Z]/, { message: tErrorsZod("passwordUpper") })
      .regex(/[a-z]/, { message: tErrorsZod("passwordLower") })
      .regex(/[0-9]/, { message: tErrorsZod("passwordNumber") })
      .regex(/[^A-Za-z0-9]/, { message: tErrorsZod("passwordSpecial") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8" noValidate>
        <FormField<FormLoginOut>
          name="email"
          label={tLogin("email")}
          formControl={form.control}
          input={{
            type: "email",
            placeholder: tLogin("email-placeholder"),
          }}
        />
        <FormField<FormLoginOut>
          name="password"
          label={tLogin("password")}
          formControl={form.control}
          input={{
            type: "password",
            placeholder: tLogin("password-placeholder"),
          }}
        />
        <Button type="submit" className="w-full">
          {tLogin("submit")}
        </Button>
      </form>
    </Form>
  );
}
