import Image from 'next/image'

import Button from '../Button'

import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Image src="/Logo.svg" height={80} width={100} />

      <Button title="Create Wallet" />
    </header>
  )
}