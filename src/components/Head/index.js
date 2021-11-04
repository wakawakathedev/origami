import React from 'react'
import Head from 'next/head';

export default function Header() {
  return (
    <Head>
      <title>Origami</title>
      <meta name='description' content='Origami Paper Wallet' />
      <link rel='icon' href='/favicon.ico' />
      <link rel='manifest' href='/manifest.json' />
    </Head>
  )
}