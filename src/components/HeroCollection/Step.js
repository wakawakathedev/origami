import styles from './Step.module.css'

const steps = {
  1: {
    title: "Step 1",
    subtitle: "Generate a wallet by randomising the secret key",
    image: "",
  },
  2: {
    title: "Step 2",
    subtitle: "Select the design for your paper wallet",
    image: "",
  },
  3: {
    title: "Step 3",
    subtitle: "Go offline and print off your wallet",
    image: "",
  }

}

export const Step = ({ order }) => (
  <div className={styles.step}>
    <div className={styles.content}>
      <aside>

        <div className={styles.imageContainer}>
          <div className={styles.image}>
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
