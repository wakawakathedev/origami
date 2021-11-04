import { useEffect, useCallback, useState } from "react";
import Head from "../src/components/Head"
import QRCode from "react-qr-code";

import styles from '../styles/Home.module.css';
import { Account } from "thenewboston";

const useIsOnline = () => {
  if (typeof window !== 'undefined') {
    return window.navigator.onLine
  }
  return true
}

export default function Home() {
  const isOnline = useIsOnline()

  const [mousePosition, setMousePosition] = useState(undefined)
  const [accountNumber, setAccountNumber] = useState('')

  const [privateKey, setPrivateKey] = useState('')

  const generateAccount = () => {
    const account = new Account()
    setAccountNumber(account.accountNumberHex)
    setPrivateKey(account.signingKeyHex)
  }

  const handleMouseMove = useCallback((e) => {
    setMousePosition(`x: ${e.x}, y: ${e.y}`)
    if (!isOnline) generateAccount()
  }, [isOnline])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window?.addEventListener('mousemove', handleMouseMove)
    }
    if (!isOnline) generateAccount()
  }, [handleMouseMove, isOnline])

  return (
    <div className={styles.container}>
      <Head />
      <h1 className="hide-print">Online Status: {isOnline ? "You are Online" : "You are Offline"}</h1>

      {isOnline && (
        <div className="hide-print">Please go offline</div>
      )}

      <div>
        <>
          {accountNumber && (
            <>
              <h1>Public Key</h1>
              <h2>Account Number / Deposit / Verify</h2>
              <p>{accountNumber}</p>
              <QRCode value={accountNumber} />
            </>
          )}

          {privateKey && (
            <>
              <h1>Private Key</h1>
              <h2>Withdraw / Spend</h2>
              <QRCode value={privateKey} />
            </>
          )}
        </>
      </div>
    </div>
  );
}