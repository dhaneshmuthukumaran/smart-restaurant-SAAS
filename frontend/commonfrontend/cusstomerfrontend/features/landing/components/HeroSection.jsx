// features/landing/components/HeroSection.jsx

import React from 'react';
import styles from '../styles/Landing.module.css';

const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Waste <span className={styles.gradientText}>is Boring.</span>
        </h1>
        <p className={styles.heroSub}>
          Intelligent real‑time optimization of restaurant capacity, inventory, and menu —
          to reduce waste, maximize revenue, and give customers dynamic, personalized experiences.
        </p>
        <div className={styles.heroButtons}>
          <a href="/restaurants" className={styles.btnPrimary}>
            Explore Restaurants
          </a>
          <a href="#features" className={styles.btnOutline}>
            Learn More →
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;