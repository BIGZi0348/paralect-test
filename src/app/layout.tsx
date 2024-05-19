import { Inter } from "next/font/google";
import "./globals.css";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import styles from "./layout.module.css";
import AFLogo from "@/components/AFLogo/AFLogo";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <MantineProvider>
          <main className={styles.main}>
            <AFLogo zIndex={"1"} position={"absolute"} />
            {children}
          </main>
        </MantineProvider>
      </body>
    </html>
  );
}
