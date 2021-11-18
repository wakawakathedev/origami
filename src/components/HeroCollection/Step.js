import Image from 'next/image'
import styles from './Step.module.css'

const steps = {
  1: {
    title: "Step 1",
    subtitle: "Generate a wallet by randomising the secret key",
    image: "step1.svg",
  },
  2: {
    title: "Step 2",
    subtitle: "Select the design for your paper wallet",
    image: "step2.svg",
  },
  3: {
    title: "Step 3",
    subtitle: "Go offline and print off your wallet",
    image: "step3.svg",
  }

}

export const Step = ({ order }) => (
  <div className={styles.step}>
    <div className={styles.content}>
      <aside>
        <div className={styles.imageContainer}>
          <div className={styles.image}>
            <Image src={`/assets/${steps[order].image}`}
              layout="responsive"
              height={256}
              width={256}
              objectFit="contain" />
          </div>
        </div>
      </aside>
      <article>
        <div className={styles.textContent}>
          <h3>{steps[order].title}</h3>
          <p>{steps[order].subtitle}</p>
        </div>
      </article>
    </div>
  </div>
)
