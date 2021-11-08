import { useEffect, useCallback, useState, useRef } from "react";
import QRCode from "react-qr-code";
import { Account } from "thenewboston";

import Head from "../src/components/Head"

import styles from '../styles/Home.module.css';

import { useIsOnline } from '../src/hooks/useIsOnline'

export default function Home() {
  const isOnline = useIsOnline()

  const [isLocked, toggleLock] = useState(false)
  const [accountNumber, setAccountNumber] = useState('')

  const [privateKey, setPrivateKey] = useState('')

  const AccountAreaRef = useRef(null)

  const generateAccount = () => {
    const account = new Account()
    setAccountNumber(account.accountNumberHex)
    setPrivateKey(account.signingKeyHex)
  }

  const handleMouseMove = useCallback((e) => {
    generateAccount()
  }, [])

  const lockAccount = useCallback(() => {
    toggleLock(!isLocked)
  }, [toggleLock, isLocked])


  useEffect(() => {
    if (!isLocked && !isOnline && typeof window !== 'undefined') {
      AccountAreaRef?.current?.addEventListener('mousemove', handleMouseMove)
    } else {
      AccountAreaRef?.current?.removeEventListener('mousemove', handleMouseMove)
    }

    return () => {
      AccountAreaRef?.current?.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isLocked, isOnline, handleMouseMove])

  return (
    <div className={styles.container}>
      <Head />
      <div className="hide-print info-box">
        <h1>Online Status:</h1>
        <h2>{isOnline ? "You are Online" : "You are Offline"}</h2>

        <p>Origami is a paper wallet generator for thenewboston blockchain, to be used when the browser is offline.</p>
        <p>The user can generate custom paper wallets which can be printed offline.</p>

        {isOnline && (
          <div className="alert warning">
            <p>Please go offline</p>
          </div>
        )}
      </div>

      {!isOnline && (
        <div>
          <div className="hide-print" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', flex: 1, padding: 10, alignItems: 'center' }}>
            <p className="hide-print">Account Locked: {isLocked ? "Locked" : "Unlocked"}</p>


            <div className={`hide-print area ${isLocked ? 'locked' : ''}`} ref={AccountAreaRef} style={{ borderWidth: 5, borderStyle: 'dashed', padding: 10, width: 200 }}>
              <div><p>Move your cursor within the dashed area</p></div>
              <button className="hide-print" style={{ marginBottom: 10 }} onClick={lockAccount}>{isLocked ? 'Unlock' : 'Lock'} Account</button>
            </div>
          </div>


          <div className="content-container">
            {accountNumber && (
              <div className="keyContainer">
                <h2>Public Key / Account No.</h2>
                <h3>Deposit / Verify</h3>
                <div>
                  <p style={{ width: 200, fontSize: 14, lineBreak: "anywhere" }}>{accountNumber}</p>
                </div>
                <div style={{
                  borderWidth: 10,
                  borderColor: "grey",
                  borderStyle: "solid",
                  height: 276,
                  width: 276,
                }}><QRCode value={accountNumber} /></div>
              </div>
            )}

            {privateKey && (
              <div className="keyContainer">
                <h2>Private Key / Signing Key</h2>
                <h3>Withdraw / Spend</h3>
                <div>
                  <p style={{ width: 200, fontSize: 14, lineBreak: "anywhere" }}>{privateKey}</p>
                </div>
                <div style={{
                  borderWidth: 10,
                  borderColor: "grey",
                  borderStyle: "solid",
                  height: 276,
                  width: 276,
                }}><QRCode value={privateKey} /></div>
              </div>
            )}
          </div>

        </div>)
      }
    </div >
  );
}