import type { Metadata } from "next";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackServerApp } from "../stack";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import { ConvexClientProvider } from "@/components/provider/ConvexClientProvider";

const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scheduler",
  description: "Ultimate schedule platform for institutes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StackProvider
      app={stackServerApp}
      lang="de-DE"
      translationOverrides={{
        "Sign in": "Einloggen",
        "Sign In": "Einloggen",
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${outfit.className} antialiased`}>
          <StackProvider app={stackServerApp}>
            <StackTheme>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <ConvexClientProvider>{children}</ConvexClientProvider>
              </ThemeProvider>
            </StackTheme>
          </StackProvider>
        </body>
      </html>
    </StackProvider>
  );
}
