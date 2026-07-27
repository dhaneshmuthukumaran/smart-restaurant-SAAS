import React from 'react';
import styles from '../styles/Landing.module.css';

const downloadedImage = {
  url: '/assets/images/landing/istockphoto-1005666894-612x612.jpg',
  alt: 'Downloaded landing image',
  title: 'Saved Downloaded Image',
  description: 'This image was saved after download and is displayed on the landing page.'
};

const DownloadedImage = () => {
  return (
    <section className={styles.downloadedImageSection}>
      <div className={styles.downloadedImageCard}>
        <div className={styles.downloadedImageLabel}>{downloadedImage.title}</div>
        <img
          src={downloadedImage.url}
          alt={downloadedImage.alt}
          className={styles.downloadedImage}
        />
        <p className={styles.downloadedImageDescription}>{downloadedImage.description}</p>
      </div>
    </section>
  );
};

export default DownloadedImage;
