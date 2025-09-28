import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

interface Properties {
  children: React.ReactNode;
};

export default async function RootLayout({children}: Properties) {
  return (
    <html lang="fr">
      <body cz-shortcut-listen="true">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
