import styles from "@/styles/ParentContainer.module.css";
import PhonePreview from "./PhonePreview";
import CustomizeForm from "./CustomizeForm";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/authProvider";
import { addNewPlateFormAPI, deletePlateFormAPI, getAllPlateFormAPI } from "@/api/plateformApis";

export default function ParentContainer() {
  const [storedLinks, setStoredLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchPlateForms();
  }, []);

  const fetchPlateForms = async () => {
    if (!user?.userId) return;
    try {
      setLoading(true);
      const response = await getAllPlateFormAPI(user.userId);
      if(response?.success){
        if (response.data && Array.isArray(response.data)) {
          setStoredLinks(response.data);
          setError(null);
        }
      }else {
        setError(response.error);
        resetError();
      }
    } finally {
      setLoading(false);
    }
  }

  // Save platforms to API
  const savePlatforms = async (links = storedLinks ) => {
    if (!user?.userId || links.length === 0) return;
    try {
      setLoading(true)
      const payload = {
        user: user.userId,
        platforms: links.map((link) => ({
          _id: link._id,
          platform: link.platform,
          url: link.url,
          order: link.order,
        })),
      };
      const response = await addNewPlateFormAPI(payload);
       if(!response?.success){
         setError(response.error);
         resetError(true);
       }else {
        setError(null);
       }
    } catch (error) {
      setError(error.message);
      resetError();
    } finally {
      setLoading(false);
    }
  };

  const deletePlatform = async (id) => {
    if (!user?.userId || !id) return;
    try {
      setLoading(true);
      const response = await deletePlateFormAPI(id);
      if(response?.success){
        setError(null);
      } else {
        setError(response.error);
        resetError(true);
      }
    } catch (error) {
      setError(error.message);
      resetError();
    } finally {
      setLoading(false);
    }
  }

  const resetError = (fetchData = false) => {
    setTimeout(() => {
      setError(null);
      if (fetchData) {
        fetchPlateForms();
      }
    }, 6000);
  };

  return (
    <div className={styles.container}>
      {loading &&  <div className={styles.loadingOverlay}>
      <div className={styles.loadingCard}>
        <div className={styles.spinner} />
        <div className={styles.loadingText}>Loading...</div>
      </div>
    </div>}
      <PhonePreview storedLinks={storedLinks} />
      <CustomizeForm
        storedLinks={storedLinks}
        setStoredLinks={setStoredLinks}
        savePlatforms={savePlatforms}
        deletePlatform={deletePlatform}
        serverError={error}
      />
    </div>
  );
}
