import Image from 'next/image'

import Button from '../Button'

import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <Image src="/Logo.svg" height={80} width={100} />

      </div>
      <p>© 2021 - tnbcrow</p>
    </footer>
  )
}