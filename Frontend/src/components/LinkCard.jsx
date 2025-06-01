import React from 'react';
import styles from '../styles/LinkCard.module.css';

const LinkCard = ({ link, onDelete }) => {
  return (
    <div className={styles.card}>
      <h4>{link.platform}</h4>
      <p>{link.url}</p>
      <button onClick={onDelete}>Remove</button>
    </div>
  );
};

export default LinkCard;