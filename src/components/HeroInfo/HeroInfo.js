import Image from 'next/image'
import styles from './HeroInfo.module.css'

export default function HeroInfo() {
  return (
    <section className={styles.heroInfo}>

      <div className={styles.content}>
        <div className={styles.imageContainer}>
          <div className={styles.public}>
            <Image src="/assets/example-public.svg" layout="responsive"
              height={120}
              width={240}
              objectFit="contain" />
          </div>
          <div className={styles.private}>
            <Image src="/assets/example-private.svg" layout="responsive"
              height={120}
              width={240}
              objectFit="contain" />
          </div>
        </div>
        <article>
          <h1>Getting to know your paper wallet</h1>

          <p>This Paper wallet represents your  deposit and withdrawal methods.<br />The Public key is used to deposit and verify your wallet amounts. <br />The Private key is used to withdraw and spend the tnbc in your wallet.</p>

          <h3>Do <em>NOT</em> reveal your private key to anyone.</h3>
        </article>
      </div>
    </section>
  )
}