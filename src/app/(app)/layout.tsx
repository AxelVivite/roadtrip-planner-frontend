import { NextIntlClientProvider } from "next-intl";

import { Toaster } from "@atoms/shadcn/sonner";
import AuthProvider from "@atoms/providers/auth-provider";
import ThemeProvider from "@atoms/providers/theme-provider";
import Header from "@organisms/header";
import "@/app/globals.css";

interface Properties {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: Properties) {
  return (
    <html lang="fr" suppressHydrationWarning className="min-h-screen">
      <body cz-shortcut-listen="true" className="min-h-screen">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider>
            <AuthProvider>
              <Header />
              <main className="min-h-[calc(100vh-4rem)] mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                {children}
              </main>
              <Toaster position="top-center" />
            </AuthProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
