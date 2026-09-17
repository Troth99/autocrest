
"use client";

import type { FormEvent } from "react";
import buttonStyles from "../../ui/Button.module.css";
import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className={styles.card} aria-labelledby="register-title">
      <div className={styles.heading}>
        <span className={styles.eyebrow}>AUTOCREST ACCOUNT</span>
        <h1 id="register-title" className={styles.title}>
          Create your <span>workspace</span>
        </h1>
        <p className={styles.description}>
          Keep every vehicle, event, and next decision in one clear place.
        </p>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="yourname"
            autoComplete="username"
            minLength={3}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className={styles.field}>
          <div className={styles.labelRow}>
            <label htmlFor="password">Password</label>
            <span>At least 8 characters</span>
          </div>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Repeat your password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </div>

        <label className={styles.terms}>
          <input name="terms" type="checkbox" required />
          <span>I agree to the Terms and Privacy Policy.</span>
        </label>

        <button className={`${buttonStyles.primary} ${styles.submit}`} type="submit">
          Create account
        </button>
      </form>

      <p className={styles.signIn}>
        Already have an account? <span>Sign in</span>
      </p>
    </section>
  );
}
