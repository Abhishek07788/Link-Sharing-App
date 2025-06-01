import styles from '../styles/ParentContainer.module.css';
import PhonePreview from './PhonePreview';
import CustomizeForm from './CustomizeForm';
import { useEffect, useState } from 'react';

export default function ParentContainer() {
  const [storedLinks, setStoredLinks] = useState([]);

  useEffect(() => {
    const storedLink = localStorage.getItem("links");
    if (storedLink) {
      setStoredLinks(JSON.parse(storedLink));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(storedLinks));
  }, [storedLinks]);

  return (
    <div className={styles.container}>
      <PhonePreview storedLinks={storedLinks} />
      <CustomizeForm storedLinks={storedLinks} setStoredLinks={setStoredLinks} />
    </div>
  );
}
