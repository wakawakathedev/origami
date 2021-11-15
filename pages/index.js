import { useEffect, useCallback, useState, useRef } from "react";
import QRCode from "react-qr-code";
import { Account } from "thenewboston";

import Footer from "../src/components/Footer"
import Head from "../src/components/Head"
import Header from "../src/components/Header"
import Hero from "../src/components/Hero"
import HeroInfo from "../src/components/HeroInfo"
import HeroCollection, { Step } from "../src/components/HeroCollection"


import styles from '../styles/Home.module.css';

import { useIsOnline } from '../src/hooks/useIsOnline'


export default function Home() {
  // const isOnline = useIsOnline()

  // const [isLocked, toggleLock] = useState(false)
  // const [accountNumber, setAccountNumber] = useState('')

  // const [privateKey, setPrivateKey] = useState('')

  // const AccountAreaRef = useRef(null)

  // const generateAccount = () => {
  //   const account = new Account()
  //   setAccountNumber(account.accountNumberHex)
  //   setPrivateKey(account.signingKeyHex)
  // }

  // const handleMouseMove = useCallback((e) => {
  //   generateAccount()
  // }, [])

  // const lockAccount = useCallback(() => {
  //   toggleLock(!isLocked)
  // }, [toggleLock, isLocked])


  // useEffect(() => {
  //   if (!isLocked && !isOnline && typeof window !== 'undefined') {
  //     AccountAreaRef?.current?.addEventListener('mousemove', handleMouseMove)
  //   } else {
  //     AccountAreaRef?.current?.removeEventListener('mousemove', handleMouseMove)
  //   }

  //   return () => {
  //     AccountAreaRef?.current?.removeEventListener('mousemove', handleMouseMove)
  //   }
  // }, [isLocked, isOnline, handleMouseMove])

  return (
    <div className={styles.container}>
      <Head />

      <Header />

      <Hero />

      <HeroCollection>
        <Step order={1} />
        <Step order={2} />
        <Step order={3} />
      </HeroCollection>

      <HeroInfo />
      <Footer />

    </div>
  );
}