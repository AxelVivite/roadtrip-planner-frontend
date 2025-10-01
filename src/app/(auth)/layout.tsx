import { NextIntlClientProvider } from "next-intl";

import { Toaster } from "@atoms/shadcn/sonner";
import AuthProvider from "@atoms/providers/auth-provider";
import ThemeProvider from "@atoms/providers/theme-provider";
import "@/app/globals.css";

interface Properties {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Properties) {
  return (
    <html lang="fr" className="h-full" suppressHydrationWarning>
      <body cz-shortcut-listen="true">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>
            <AuthProvider>
              {children}
              <Toaster position="top-center" />
            </AuthProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
