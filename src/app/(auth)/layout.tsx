import { NextIntlClientProvider } from "next-intl";

import { Toaster } from "@atoms/shadcn/sonner";
import AuthProvider from "@utils/auth/auth-context";
import "@/app/globals.css";

interface Properties {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Properties) {
  return (
    <html lang="fr" className="h-full">
      <body cz-shortcut-listen="true" className="h-full">
        <NextIntlClientProvider>
          <AuthProvider>
            {children}
            <Toaster position="top-center" />
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
