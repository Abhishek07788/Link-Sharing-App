import styles from '../styles/ParentContainer.module.css';
import PhonePreview from './PhonePreview';
import CustomizeForm from './CustomizeForm';
import { useEffect, useState } from 'react';

export default function ParentContainer() {
  const [platforms, setPlatforms] = useState([]);

  useEffect(() => {
    const storedLink = localStorage.getItem("links");
    if (storedLink) {
      setPlatforms(JSON.parse(storedLink));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(platforms));
  }, [platforms]);

  return (
    <div className={styles.container}>
      <PhonePreview platforms={platforms} />
      <CustomizeForm platforms={platforms} setPlatforms={setPlatforms} />
    </div>
  );
}
