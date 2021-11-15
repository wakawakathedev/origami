export { Step } from './Step'

import styles from './HeroCollection.module.css'

export default function HeroCollection({ children }) {
  return (<div className={styles.heroCollection}>{children}</div>)
}