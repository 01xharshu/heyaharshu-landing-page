import styles from "./Navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbarContainer}>
      <div className={styles.navLinks}>
        <Link href="#how-it-works" className={styles.navItem}>How It Works</Link>
        <Link href="#use-cases" className={styles.navItem}>Use Cases</Link>
        <Link href="#pricing" className={styles.navItem}>Pricing</Link>
        <Link href="#learn" className={styles.navItem}>Learn</Link>
      </div>
      <Link href="#signup" className={styles.signUpBtn}>Sign Up</Link>
    </nav>
  );
}
