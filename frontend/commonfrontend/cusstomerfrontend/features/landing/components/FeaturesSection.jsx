// features/landing/components/FeaturesSection.jsx

import React from 'react';
import styles from '../styles/Landing.module.css';

const FeaturesSection = () => {
  const features = [
    {
      icon: '🪑',
      title: 'Dynamic Capacity',
      description: 'Optimize table turns, staff allocation, and flow based on live foot traffic.'
    },
    {
      icon: '📦',
      title: 'Smart Inventory',
      description: 'Forecast demand down to the ingredient level. Reduce waste by adjusting portions.'
    },
    {
      icon: '🍽️',
      title: 'Personalized Menu',
      description: 'Every guest sees a menu tailored to their taste, dietary needs, and past choices.'
    },
    {
      icon: '💰',
      title: 'Smart Pricing',
      description: 'Adjust pricing based on demand, time of day, and customer segment.'
    },
    {
      icon: '🧠',
      title: 'Guest Intelligence',
      description: 'Unify online and offline data to build 360° guest profiles.'
    },
    {
      icon: '🌱',
      title: 'Sustainability Score',
      description: 'Track and improve your carbon footprint with actionable recommendations.'
    }
  ];

  return (
    <section id="features" className={styles.featuresSection}>
      <div className={styles.sectionHeader}>
        <h2>Intelligent <span className={styles.gradientText}>Capabilities</span></h2>
        <p className={styles.sectionSub}>
          Every feature works in real-time, adapts to your data, and delivers measurable results.
        </p>
      </div>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;