import React from 'react';
import styles from '../styles/Orders.module.css';

const OrderTimeline = ({ timeline = [] }) => {
  if (!timeline.length) {
    return null;
  }

  return (
    <div className={styles.timelineBox}>
      <h4 className={styles.sectionTitle}>Timeline</h4>
      {timeline.map((item, index) => (
        <div key={`${item.label}-${index}`} className={styles.timelineItem}>
          <span className={styles.timelineDot} />
          <div>
            <p className={styles.timelineLabel}>{item.label}</p>
            <p className={styles.timelineText}>{item.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderTimeline;
