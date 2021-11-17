import Link from 'next/link'
import styles from './Button.module.css'

export default function Button({ type, title, href }) {

  const _type = type === "primary" ? styles.primary : styles.default

  return (
    <button className={`${styles.base} ${_type}`} alt={title}>

      {href ? (
        <Link href="/wallet">
          {title}
        </Link>
      ) : (
        <>{title}</>
      )
      }

    </button>
  )
}