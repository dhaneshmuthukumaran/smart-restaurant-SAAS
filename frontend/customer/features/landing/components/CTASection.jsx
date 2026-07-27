// features/landing/components/CTASection.jsx

import React from 'react';
import styles from '../styles/Landing.module.css';

const CTASection = () => {
  return (
    <section className={styles.ctaSection}>
      <h2>
        Ready to <br />
        <span className={styles.gradientText}>stop wasting?</span>
      </h2>
      <p className={styles.ctaSub}>
        Join the restaurants that are redefining efficiency, revenue, and guest experience — with intelligence that never stops.
      </p>
      <a href="/signup" className={styles.btnPrimary}>
        Start Your Journey
      </a>
    </section>
  );
};

export default CTASection;