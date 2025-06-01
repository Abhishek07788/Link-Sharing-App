import styles from '../styles/ParentContainer.module.css';
import PhonePreview from './PhonePreview';
import CustomizeForm from './CustomizeForm';
import { useState } from 'react';

export default function ParentContainer() {
  const [platforms, setPlatforms] = useState([]);

  return (
    <div className={styles.container}>
      <PhonePreview platforms={platforms} />
      <CustomizeForm  setPlatforms={setPlatforms}/>
    </div>
  );
}
