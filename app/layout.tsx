import "@mantine/core/styles.css";
import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "../theme";
import Link from "next/link";

export const metadata = {
  title: "Quick Bingo",
  description: "Quick Bingoは、手軽にビンゴゲームを楽しめるWebアプリです。友達や家族と一緒に、リアルタイムでビンゴを体験できます。",
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="jp" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <nav style={{ padding: "1rem" }}>
            <Link href="/kuji">ビンゴくじページへ</Link>
          </nav>
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
