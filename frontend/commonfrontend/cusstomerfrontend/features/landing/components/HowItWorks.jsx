// features/landing/components/HowItWorks.jsx

import React from 'react';
import styles from '../styles/Landing.module.css';

const HowItWorks = () => {
  const steps = [
    { number: 1, title: 'Connect', description: 'Integrate your POS, inventory, and reservation systems in minutes.' },
    { number: 2, title: 'Analyze', description: 'Our AI processes live data to identify patterns and predict demand.' },
    { number: 3, title: 'Optimize', description: 'Implement real-time recommendations or let the platform act automatically.' }
  ];

  return (
    <section className={styles.stepsSection}>
      <div className={styles.sectionHeader}>
        <h2>How it <span className={styles.gradientText}>Works</span></h2>
        <p className={styles.sectionSub}>From data to action — in three simple steps.</p>
      </div>
      <div className={styles.stepsFlow}>
        {steps.map((step) => (
          <div key={step.number} className={styles.stepItem}>
            <div className={styles.stepNum}>{step.number}</div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;