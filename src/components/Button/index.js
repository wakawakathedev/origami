
import styles from './Button.module.css'

export default function Button({ type, title }) {

  const _type = type === "primary" ? styles.primary : styles.default

  return (
    <button className={`${styles.base} ${_type}`} alt={title}>
      {title}
    </button>
  )
}