// features/landing/index.js

import React from 'react';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import DownloadedImage from './components/DownloadedImage';
import HowItWorks from './components/HowItWorks';
import CTASection from './components/CTASection';
import styles from './styles/Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <HeroSection />
      <FeaturesSection />
      <DownloadedImage />
      <HowItWorks />
      <CTASection />
    </div>
  );
};

export default Landing;