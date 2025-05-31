import React from 'react';
import Header from '../components/Header';
import Head from 'next/head';

export default function Home() {

  return (
    <>
      <Head>
        <title>Link Sharing App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
    </>
  );
}
