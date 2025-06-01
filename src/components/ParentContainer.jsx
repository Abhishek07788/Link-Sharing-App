import styles from '../styles/ParentContainer.module.css';
import PhonePreview from './PhonePreview';
import CustomizeForm from './CustomizeForm';
import { useEffect, useState } from 'react';

export default function ParentContainer() {
  const [storedLinks, setStoredLinks] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("links");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    if (storedLinks?.length >= 0) {
      localStorage.setItem("links", JSON.stringify(storedLinks));
    }
  }, [storedLinks]);

  return (
    <div className={styles.container}>
      <PhonePreview storedLinks={storedLinks} />
      <CustomizeForm storedLinks={storedLinks} setStoredLinks={setStoredLinks} />
    </div>
  );
}
