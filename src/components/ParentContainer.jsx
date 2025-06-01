import styles from '../styles/ParentContainer.module.css';
import PhonePreview from './PhonePreview';
import CustomizeForm from './CustomizeForm';
import { useEffect, useState } from 'react';

export default function ParentContainer() {
  const [platforms, setPlatforms] = useState([]);
  const [storedLinks, setStoredLinks] = useState([])

  useEffect(() => {
    const storedLinks = localStorage.getItem("links");
    if (storedLinks) {
      setPlatforms(JSON.parse(storedLinks));
      setStoredLinks(JSON.parse(storedLinks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(platforms));
  }, [platforms]);

  return (
    <div className={styles.container}>
      <PhonePreview platforms={platforms} />
      <CustomizeForm storedLinks={storedLinks} platforms={platforms}  setPlatforms={setPlatforms}/>
    </div>
  );
}
