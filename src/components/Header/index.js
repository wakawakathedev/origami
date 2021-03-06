import Link from 'next/link'
import Image from 'next/image'

import Button from '../Button'

import styles from './Header.module.css'

export default function Header({ showButton }) {
  return (
    <header className={styles.header}>
      <Link href="/">
        <a><Image src="/Logo.svg" height={80} width={100} /></a>
      </Link>

      <Button title="Create Wallet" href="/wallet" />
    </header>
  )
}