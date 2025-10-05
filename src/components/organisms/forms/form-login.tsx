"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";

import { Button } from "@atoms/shadcn/button";
import { Form } from "@atoms/shadcn/form";
import FormField from "@molecules/form-field";
import FormLoginOut from "@config/interfaces/out/form-login";
import Login from "@config/interfaces/in/login";
import FetchError from "@config/interfaces/fetch-error";
import useAuth from "@utils/hook/use-auth";
import usefetchJson from "@utils/fetch-json";

export default function FormLogin() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const fetchJson = usefetchJson<FormLoginOut, Login>();
  const tLogin = useTranslations("organisms.forms.login");
  const tErrorsZod = useTranslations("errors.zod");

  const formSchema = z.object({
    username: z
      .string()
      .min(1, { message: tErrorsZod("email-required") })
      .pipe(z.email({ message: tErrorsZod("email-invalid") })),
    password: z
      .string()
      .min(8, { message: tErrorsZod("password-min") })
      .max(64, { message: tErrorsZod("password-max") })
      .regex(/[A-Z]/, { message: tErrorsZod("password-upper") })
      .regex(/[a-z]/, { message: tErrorsZod("password-lower") })
      .regex(/[0-9]/, { message: tErrorsZod("password-number") })
      .regex(/[^A-Za-z0-9]/, { message: tErrorsZod("password-special") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    fetchJson({
      url: `${process.env.NEXT_PUBLIC_API_URL}/api/login`,
      options: { method: "POST", body: values },
    })
      .then((data) => {
        if (data) {
          setAuth(data);
          router.push("/");
        }
      })
      .catch((error: FetchError) => {
        if (error.status === 401) {
          toast.error(tLogin("401.title"), {
            description: tLogin("401.description"),
          });
        }
      });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8"
        noValidate
      >
        <FormField<FormLoginOut>
          name="username"
          label={tLogin("email")}
          formControl={form.control}
          input={{
            type: "email",
            placeholder: tLogin("email-placeholder"),
            autoComplete: "email",
          }}
        />
        <FormField<FormLoginOut>
          name="password"
          label={tLogin("password")}
          formControl={form.control}
          input={{
            type: "password",
            placeholder: tLogin("password-placeholder"),
            autoComplete: "current-password",
          }}
        />
        <Button type="submit" className="w-full">
          {tLogin("submit")}
        </Button>
      </form>
    </Form>
  );
}
