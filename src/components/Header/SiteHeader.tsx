import Link from "next/link";
import styles from "./SiteHeader.module.css";
import buttonStyles from "../ui/Button.module.css";

export default function SiteHeader() {

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.brand}>
          <span className={styles.logo}>
            AC
          </span>
          <span className={styles.brandName}>
            auto<span className={styles.brandAccent}>crest</span>
          </span>
        </Link>
        <div className={styles.links}>
          <a href="#modules" className={styles.link}>
            Modules
          </a>
          <a href="#how-it-works" className={styles.link}>
            How it works
          </a>
          <a href="#timeline" className={styles.link}>
            Timeline
          </a>
        </div>
        <div className={styles.actions}>
          <a href="#" className={styles.signIn}>
            Sign in
          </a>
          <Link href="/register" className={`${buttonStyles.primary} ${styles.primaryCta}`}>
            Get started
          </Link>
        </div>
      </nav>
    </header>
  );
}
