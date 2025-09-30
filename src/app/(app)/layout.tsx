import { NextIntlClientProvider } from "next-intl";

import Header from "@organisms/header";
import "@/app/globals.css";
import AuthProvider from "@/utils/auth/auth-context";

interface Properties {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Properties) {
  return (
    <html lang="fr">
      <body cz-shortcut-listen="true">
        <NextIntlClientProvider>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
