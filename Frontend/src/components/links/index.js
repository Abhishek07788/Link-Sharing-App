import styles from "@/styles/ParentContainer.module.css";
import PhonePreview from "./PhonePreview";
import CustomizeForm from "./CustomizeForm";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/authProvider";
import {
  addNewPlateFormAPI,
  deletePlateFormAPI,
  getAllPlateFormAPI,
} from "@/api/plateformApis";

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
      if (response.status === 200) {
        if (response?.data && Array.isArray(response?.data)) {
          setStoredLinks(response?.data);
          setError(null);
        }
      } else {
        setError(response?.message ?? "Server Error");
        resetError();
      }
    } catch (error) {
      setError(error?.message ?? "Server Error");
      resetError();
    } finally {
      setLoading(false);
    }
  };

  // Save platforms to API
  const savePlatforms = async (links = storedLinks) => {
    if (!user?.userId || links.length === 0) return;
    try {
      setLoading(true);
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
      if (response?.status === 200) {
        setStoredLinks(response?.data?.platforms || []);
        setError(null);
      } else {
        setError(response?.data?.message ?? "Server Error");
        resetError();
        fetchPlateForms();
      }
    } catch (error) {
      setError(error?.message ?? "Server Error");
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
      if (response?.status === 200) {
        resetError(true);
        fetchPlateForms();
      } else {
        setError(response?.data?.message ?? "Server Error");
        fetchPlateForms();
      }
    } catch (error) {
      setError(error?.message ?? "Server Error");
      resetError();
    } finally {
      setLoading(false);
    }
  };

  const resetError = () => {
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingCard}>
            <div className={styles.spinner} />
            <div className={styles.loadingText}>Loading...</div>
          </div>
        </div>
      )}
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
