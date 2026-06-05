import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Work from "@/components/Work";
import styles from "@/components/Hero.module.css";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Work />
      </main>
    </>
  );
}
