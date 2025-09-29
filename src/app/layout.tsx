import { NextIntlClientProvider } from "next-intl";

import Header from "@organisms/header";
import "./globals.css";

interface Properties {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Properties) {
  return (
    <html lang="fr">
      <body cz-shortcut-listen="true">
        <NextIntlClientProvider>
          <Header />
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
