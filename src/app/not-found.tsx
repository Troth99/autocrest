import Link from "next/link";
import { ArrowRight, House } from "lucide-react";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={`page-shell ${styles.page}`}>
      <section aria-labelledby="not-found-heading" className={styles.content}>
        <div aria-hidden="true" className={styles.illustration}>
          <span className={styles.digit}>4</span>
          <div className={styles.faceContainer}>
            <svg viewBox="0 0 120 120" className={styles.face} fill="none">
              <circle cx="60" cy="60" r="52" className={styles.faceBackground} strokeWidth="1.5" />
              <circle cx="60" cy="60" r="43" stroke="currentColor" strokeWidth="2" opacity="0.65" />
              <path d="M34 43 44 39M76 39l10 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="41" cy="54" rx="3" ry="4" fill="currentColor" />
              <ellipse cx="79" cy="54" rx="3" ry="4" fill="currentColor" />
              <path d="M46 80Q60 66 74 80" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
              <path className={styles.tear} d="M83 64s-5 6-5 9a5 5 0 0 0 10 0c0-3-5-9-5-9Z" fill="currentColor" opacity="0.65" />
            </svg>
            <div className={styles.shadow} />
          </div>
          <span className={styles.digit}>4</span>
        </div>
        <p className={`eyebrow ${styles.badge}`}>Wrong turn</p>
        <h1 id="not-found-heading" className={styles.heading}>
          This road leads nowhere.
        </h1>
        <p className={`section-description ${styles.description}`}>
          Even the best drivers miss a turn. This page may have moved, or the link took a wrong exit.
        </p>
        <div className={styles.actions}>
          <Link href="/" className={`button-base button-primary ${styles.action}`}>
            <House className={styles.icon} aria-hidden="true" />
            Back to home
          </Link>
          <Link href="/garrage" className={`button-base button-secondary ${styles.action}`}>
            My garage
            <ArrowRight className={styles.icon} aria-hidden="true" />
          </Link>
        </div>
        <p className={styles.caption}>Error 404 · Page not found</p>
      </section>
    </main>
  );
}
