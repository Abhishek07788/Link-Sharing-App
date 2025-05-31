import styles from '../styles/ParentContainer.module.css';
import PhonePreview from './PhonePreview';
import CustomizeForm from './CustomizeForm';

export default function ParentContainer() {
  return (
    <div className={styles.container}>
      <PhonePreview />
      <CustomizeForm />
    </div>
  );
}
