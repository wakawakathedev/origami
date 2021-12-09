import { useEffect, useCallback, useState, useRef } from "react";
import QRCode from "react-qr-code";
import { Account } from "thenewboston";
import Header from "../../src/components/Header";

import { useIsOnline } from '../../src/hooks/useIsOnline'

import styles from '../../styles/Wallet.module.css'

const LOCK_THRESHOLD = 20

export default function Wallet() {
  const isOnline = useIsOnline()
  const [isLocked, toggleLock] = useState(false)
  const [canPrint, togglePrint] = useState(false)
  const [accountNumber, setAccountNumber] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  const [adding, toggleAdd] = useState(false)
  const [count, addCount] = useState(0)

  const AccountAreaRef = useRef(null)

  const generateAccount = () => {
    const account = new Account()
    setAccountNumber(account.accountNumberHex)
    setPrivateKey(account.signingKeyHex)
  }

  const generateNewSeed = useCallback((e) => {
    if (adding) return

    else {
      toggleAdd(true)

      requestAnimationFrame(() => {
        addCount(count++)
        toggleAdd(false)
        if (count >= LOCK_THRESHOLD) {
          togglePrint(true)
        }
      })
    }
  }, [count, addCount])

  const handleMouseMove = useCallback((event) => {
    generateNewSeed(event)
    generateAccount()
  }, [])

  const lockAccount = useCallback(() => {
    toggleLock(!isLocked)
  }, [toggleLock, isLocked])

  const printOrSave = useCallback(() => {
    if (!isOnline && typeof window !== 'undefined') {
      window?.print()
    }
  }, [isOnline])


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
    <>
      <Header showButton={false} />

      <div className={styles.container}>
        <div className={styles.statusContainer}>
          <div className={styles.status}>
            <span>Online Status: {isOnline ? "Yes 🔴" : "No 🟢"}</span><br />
            {isOnline && <span className={styles.instruction}>Go Offline</span>}
          </div>
        </div>

        {isOnline && (
          <>
            <section className="hide-print">
              <div className={styles.infoBox}>
                <p>Origami is a paper wallet generator for thenewboston blockchain.</p>
                <p>The user can generate custom paper wallets which can be printed offline.</p>
                <p style={{ textDecoration: "underline" }}><strong>Please go offline to generate a paper wallet.</strong></p>
              </div>
            </section>
          </>
        )}

        {!isOnline && (
          <div className="hide-print">
            <div className={styles.infoBox}>
              <p className={styles.tiny}>Step 1: Move your cursor within the dashed area.</p>
              <p className={styles.tiny}>Step 2: Lock the account number.</p>
              <p className={styles.tiny}>Step 3: Click the button above to save/print.</p>
            </div>
          </div>
        )}

        {!isOnline && (
          <section>
            <div className={styles.hidePrint}>
              <div className={styles.information}>
                <p className="hide-print">Account Locked: {isLocked ? "Locked" : "Unlocked"}</p>

                <div className="hide-print">
                  <button
                    style={{ marginBottom: 10 }}
                    className="hide-print"
                    disabled={!canPrint}
                    onClick={printOrSave}>Print or Save</button>
                </div>


                <div className={styles.areaContainer}>
                  <div
                    className={isLocked ? styles.areaLocked : styles.areaLocked}
                    ref={AccountAreaRef}>
                    <div className={styles.areaContent}>
                      <div className={styles.overlay}>
                        {count} / {20}
                      </div>
                      <button
                        className='hide-print'
                        style={{ margin: 10 }}
                        disabled={count < LOCK_THRESHOLD}
                        onClick={lockAccount}>{isLocked ? 'Unlock' : 'Lock'} Account</button>
                    </div>
                  </div>
                </div>
                <div
                  className={styles.generatedAccount}
                >{accountNumber || '...'}</div>
              </div>
            </div>


            {isLocked && (
              <div className={styles.contentContainer}>
                <div className={styles.card}>
                  <div className={styles.cardBackground} />
                  {accountNumber && (
                    <div className={styles.publicKeyCardContainer}>
                      <h2 className={styles.highlight}>Public Key / Account No.</h2>
                      <h3 className={styles.highlight}>Deposit / Verify</h3>

                      <p className={styles.highlightKey}>{accountNumber}</p>
                      <div className={styles.qrCodeContainer}>
                        <QRCode value={accountNumber} />
                      </div>
                    </div>
                  )}

                  {privateKey && (
                    <div className={styles.privateKeyCardContainer}>
                      <h2 className={styles.highlight}>Private Key / Signing Key</h2>
                      <h3 className={styles.highlight}>Withdraw / Spend</h3>
                      <p className={styles.highlightKey}>{privateKey}</p>
                      <div className={styles.qrCodeContainer}>
                        <QRCode value={privateKey} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </section>
        )}
      </div>
    </>
  );
}
