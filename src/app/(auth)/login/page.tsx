import { IconRoute } from "@tabler/icons-react";
import { useTranslations } from "next-intl";

import LoginForm from "@/components/organisms/forms/form-login";

export default function Login() {
  const t = useTranslations("");

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <span className="sr-only">{t("website-name")}</span>
          <IconRoute
            aria-hidden="true"
            className="mx-auto h-16 w-auto antialiased"
          />
          <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900 dark:text-white">
            {t("pages.login.sign-in-to-your-account")}
          </h1>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
