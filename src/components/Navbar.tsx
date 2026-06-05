import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbarContainer}>
      <Link href="/" className={styles.navItem}>Home</Link>
      <Link href="#work" className={styles.navItem}>Work</Link>
      <Link href="#about" className={styles.navItem}>About</Link>
      <Link href="#contact" className={styles.navItem}>Contact</Link>
    </nav>
  );
}
