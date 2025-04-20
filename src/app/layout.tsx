import type { Metadata } from "next";

import "./globals.css";
import TodoQueryProvider from "@/components/provider/TodoQueryProvier";

export const metadata: Metadata = {
  title: "Intern test",
  description: "baro-intern test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <TodoQueryProvider>{children}</TodoQueryProvider>
      </body>
    </html>
  );
}
