import styles from '../styles/ParentContainer.module.css';
import PhonePreview from './PhonePreview';
import CustomizeForm from './CustomizeForm';
import { useEffect, useState, useCallback } from 'react';

export default function ParentContainer() {
  const [storedLinks, setStoredLinks] = useState([]);
  
  const loadStoredLinks = useCallback(() => {
    try {
      const saved = localStorage.getItem("links");
      if (saved) {
        const parsedLinks = JSON.parse(saved);
        if (Array.isArray(parsedLinks)) {
          setStoredLinks(parsedLinks);
        }
      }
    } catch (error) {
      console.error('Error loading stored links:', error);
    }
  }, []);

  // Load data on mount
  useEffect(() => {
    loadStoredLinks();
    window.addEventListener('storage', loadStoredLinks);
    return () => {
      if (storedLinks.length > 0) {
        localStorage.setItem("links", JSON.stringify(storedLinks));
      }
      window.removeEventListener('storage', loadStoredLinks);
    };
  }, [loadStoredLinks]);

  useEffect(() => {
    if (storedLinks.length > 0) {
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
