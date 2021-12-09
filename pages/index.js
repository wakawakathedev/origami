import Footer from "../src/components/Footer"
import Head from "../src/components/Head"
import Header from "../src/components/Header"
import Hero from "../src/components/Hero"
import HeroInfo from "../src/components/HeroInfo"
import HeroCollection, { Step } from "../src/components/HeroCollection"

import styles from '../styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head />

      <Header showButton={true} />

      <Hero />

      <HeroCollection>
        <Step order={1} />
        <Step order={2} />
        <Step order={3} />
      </HeroCollection>

      <HeroInfo />
      <Footer />

    </div>
  );
}