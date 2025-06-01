import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body style={{ padding: "0", margin: "0" }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}