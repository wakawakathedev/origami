
import Button from '../Button'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <article>
          <h1>Create your offline paper wallet</h1>

          <p>Origami is brought you by the team behind tnbcrow. We aim to provide services that can compliment your tnbc experience, both online and offline.</p>

          <Button type="primary" title="Create Wallet" />
        </article>

        <div className={styles.imageContainer}>

        </div>
      </div>
    </section>
  )
}