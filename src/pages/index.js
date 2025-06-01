import React from 'react';
import Head from 'next/head';
import ParentContainer from '@/components/ParentContainer';

export default function Home() {

  return (
    <>
      <Head>
        <title>Link Sharing App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ParentContainer />
    </>
  );
}
