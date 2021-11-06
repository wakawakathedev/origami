import { useEffect, useCallback, useState, useRef } from "react";
import Head from "../src/components/Head"
import QRCode from "react-qr-code";

import styles from '../styles/Home.module.css';
import { Account } from "thenewboston";

const useIsOnline = () => {
  const [isOnline, setIsOnline] = useState(false)

  const setOffline = () => setIsOnline(false)
  const setOnline = () => setIsOnline(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener("offline", setOffline)
      window.addEventListener("online", () => setOnline)
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener("offline", setOffline)
        window.removeEventListener("online", () => setOnline)
      }
    }
  }, [isOnline])

  return isOnline
}


export default function Home() {
  const isOnline = useIsOnline()

  const [isLocked, toggleLock] = useState(false)
  const [accountNumber, setAccountNumber] = useState('')

  const [privateKey, setPrivateKey] = useState('')

  const AccountAreaRef = useRef(null)

  const generateAccount = useCallback(() => {
    if (isLocked) return
    console.log(isLocked, 'here')
    const account = new Account()
    setAccountNumber(account.accountNumberHex)
    setPrivateKey(account.signingKeyHex)
  }, [isLocked])

  const handleMouseMove = useCallback((e) => {
    if (isLocked) return
    else if (!isOnline) generateAccount()
  }, [isOnline, isLocked])

  // on Mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !isOnline && !isLocked) {
      AccountAreaRef?.current?.addEventListener('mousemove', handleMouseMove)
    }
    if (!isOnline) generateAccount()
  }, [isOnline, handleMouseMove, isLocked])

  const lockAccount = useCallback(() => {
    toggleLock(true)
  }, [toggleLock])

  return (
    <div className={styles.container}>
      <Head />
      <div className="hide-print">

        <h1>Online Status: {isOnline ? "You are Online" : "You are Offline"}</h1>

        <p>Origami is a paper wallet generator app to be used when the browser is offline.</p>
        <p>The user can generate custom paper wallets which can be printed offline.</p>

        {isOnline && (
          <div className="alert warning">
            <p>Please go offline</p>
          </div>
        )}
      </div>

      {!isOnline && (
        <div>
          <button className="hide-print" onClick={lockAccount}>Lock Account {isLocked}</button>
          <p>{isLocked.toString()}</p>

          <div ref={AccountAreaRef}>
            {accountNumber && (
              <>
                <h1>Public Key</h1>
                <h2>Account Number / Deposit / Verify</h2>
                <div>
                  <p style={{ width: 200, fontSize: 14, lineBreak: "anywhere" }}>{accountNumber}</p>
                </div>
                <QRCode size={128} value={accountNumber} />
              </>
            )}

            {privateKey && (
              <>
                <h1>Private Key</h1>
                <h2>Withdraw / Spend</h2>
                <div>
                  <p style={{ width: 200, fontSize: 14, lineBreak: "anywhere" }}>{privateKey}</p>
                </div>
                <QRCode size={128} value={privateKey} />
              </>
            )}
          </div>

        </div>)}
    </div>
  );
}