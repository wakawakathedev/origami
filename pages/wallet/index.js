import { useEffect, useCallback, useState, useRef } from "react";
import QRCode from "react-qr-code";
import { Account } from "thenewboston";
import Header from "../../src/components/Header";

import { useIsOnline } from '../../src/hooks/useIsOnline'

import styles from '../../styles/Wallet.module.css'

const steps = [{
  prevStep: null,
  nextStep: "9b379566a49fb6234c6a00336988daee",
  id: "83f7cf34254500666d037685978d8a26",
  title: "Important",
  description: "Please go offline",
}, {
  prevStep: "83f7cf34254500666d037685978d8a26",
  nextStep: "a6572c27e2f456686d1481ee2b826d09",
  id: "9b379566a49fb6234c6a00336988daee",
  title: "Step 1",
  description: "Randomise the secret key"
}, {
  prevStep: "9b379566a49fb6234c6a00336988daee",
  nextStep: "ef934aac53b3b615d92d8165be38e762",
  id: "a6572c27e2f456686d1481ee2b826d09",
  title: "Step 2",
  description: "Select the Design",
}, {
  prevStep: "a6572c27e2f456686d1481ee2b826d09",
  nextStep: null,
  id: "ef934aac53b3b615d92d8165be38e762",
  title: "Step 3",
  description: "Print/Save the wallet",
}]


export default function Wallet() {
  // const isOnline = useIsOnline()
  const isOnline = false

  const [isLocked, toggleLock] = useState(false)
  const [accountNumber, setAccountNumber] = useState('')
  const [privateKey, setPrivateKey] = useState('')

  const [points, setPoints] = useState([])

  const AccountAreaRef = useRef(null)

  const generateAccount = () => {
    const account = new Account()
    setAccountNumber(account.accountNumberHex)
    setPrivateKey(account.signingKeyHex)
  }

  const generateNewSeed = useCallback((e) => {
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const subpoints = points
    subpoints.push({ x, y })

    setPoints(subpoints)
  }, [points, setPoints])

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

  // const selectDesign = () => {

  // }


  useEffect(() => {
    // AccountAreaRef?.current?.addEventListener('click', handleMouseMove)
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
        {/* <section className="hide-print info-box">

          <h2 className={styles.center}>Online Status: {isOnline ? "Online" : "Offline"}</h2>
          {isOnline && (
            <>
              <p>Origami is a paper wallet generator for thenewboston blockchain, to be used when the browser is offline.</p>
              <p>The user can generate custom paper wallets which can be printed offline.</p>
            </>
          )}

          {isOnline && (
            <div className="alert warning">
              <p>Please go offline</p>
            </div>
          )}
        </section> */}

        <section className="hide-print">
          <h2>Online Status: {isOnline ? "Yes" : "No"}</h2>

          <div className={styles.infoBox}>
            <p>Origami is a paper wallet generator for thenewboston blockchain.</p>
            <p>The user can generate custom paper wallets which can be printed offline.</p>
          </div>
        </section>

        <section className="hide-print">

        </section>

        {/* {!isOnline && (
          <section>
            <div className="hide-print" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', flex: 1, padding: 10, alignItems: 'center' }}>

              <p className="hide-print">Account Locked: {isLocked ? "Locked" : "Unlocked"}</p>

              <div className="hide-print">
                <button
                  style={{ marginBottom: 10 }}
                  className="hide-print"
                  disabled={!isLocked}
                  onClick={printOrSave}>Print or Save</button>
              </div>

              <div className={`hide-print area ${isLocked ? 'locked' : ''}`} ref={AccountAreaRef} style={{ borderWidth: 5, borderStyle: 'dashed', padding: 10, width: 200, height: 200 }}>
                <div className={styles.overlay}>
                  {points?.map(point => {
                    return (<div style={{
                      left: point.x,
                      top: point.y,
                      backgroundColor: "gray",
                      height: 10,
                      width: 10,
                      display: "block",
                      position: "absolute",
                    }} />)
                  })}
                </div>

                <div>
                  {!isLocked && (
                    <>
                      <p>Step 1: Move your cursor within the dashed area. </p>
                      <span className={styles.tiny}>Click "lock account" to stop randomly generating.</span>
                    </>
                  )}
                  {isLocked && (
                    <>
                      <p>Step 2: Click the button above to save/print</p>
                      <span className={styles.tiny}>Click "Unlock" to generate a new account.</span>
                    </>
                  )}
                </div>
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
          </section>
        )} */}
      </div>
    </>
  );
}
