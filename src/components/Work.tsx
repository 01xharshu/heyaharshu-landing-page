import Carousel from "./Carousel";
import styles from "./Carousel.module.css";

export default function Work() {
  return (
    <section id="work" className={styles.workSection}>
      <h2 className={styles.title}>Work</h2>
      <Carousel />
    </section>
  );
}
