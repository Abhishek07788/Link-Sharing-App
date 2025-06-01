import { useState, useCallback, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LinkItem from "./LinkItem";
import styles from "../styles/CustomizeForm.module.css";
import { PLATFORMS } from "@/utils/config";

export default function CustomizeForm({ storedLinks, setStoredLinks }) {
  const [links, setLinks] = useState([]);
  const [message, setMessage] = useState("");
  const linksContainerRef = useRef(null);
  const [hasChanges, setHasChanges] = useState(false);
  
  // compare links and storedLinks
  useEffect(() => {
    const areLinksEqual = (a, b) => {
      if (!a || !b) return false;
      if (a.length !== b.length) return false;
      return a.every((link, i) => {
        return link.platform === b[i].platform && link.url.trim() === b[i].url.trim() && (!link.error === !b[i].error); 
      });
    };
    setHasChanges(!areLinksEqual(links, storedLinks));
  }, [links, storedLinks]);

  // Initialize links from storedLinks prop
  useEffect(() => {
    if (storedLinks?.length > 0) {
      setLinks(storedLinks);
    }
  }, [storedLinks]);

  // Scroll to bottom when links length changes
  useEffect(() => {
    if (linksContainerRef.current) {
      linksContainerRef.current.scrollTo({
        top: linksContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [links.length]);

  // Handle changes to links
  const handleChange = (index, field, value) => {
    const updatedLinks = links.map((link, i) => {
      if (i === index) {
        return {
          ...link,
          [field]: value,
          error: ""
        };
      }
      return link;
    });
    setLinks(updatedLinks);
    setHasChanges(true);
  };

  // Move link within the list
  const moveLink = useCallback(
    (fromIndex, toIndex) => {
      const updated = [...links];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      setLinks(updated);
      setStoredLinks(updated);
    },
    [links]
  );

  // Handle adding a new link
  const handleAddLink = () => {
    const availablePlatforms = PLATFORMS.filter(
      (p) => !links.some((link) => link.platform === p.value)
    );
    if (availablePlatforms.length > 0) {
      setLinks((prevLinks) => [
        ...prevLinks,
        { platform: "", url: "", error: "" },
      ]);
    }
  };

  // Handle removing a link
  const handleRemove = (index) => {
    const updatedLinks = links.filter((_, i) => i !== index);
    setLinks(updatedLinks);
    setStoredLinks(updatedLinks);
  };

  // Handle saving links
  const handleSave = () => {
    let isValidAll = true;

    const updatedLinks = links.map((link) => {
      const selectedPlatform = PLATFORMS.find((p) => p.value === link.platform);
      const isValid = selectedPlatform?.validation?.test(link.url.trim());

      if (!link.url || !isValid) {
        isValidAll = false;
        return {
          ...link,
          error: `Enter a valid ${selectedPlatform?.label ?? ""} URL.`,
        };
      }
      return { ...link, error: "" };
    });
    setLinks(updatedLinks);

    if (isValidAll) {
      setStoredLinks(updatedLinks);
      setMessage("Links saved successfully!");
    } else {
      setMessage("Please correct the errors before saving.");
    }
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.formContainer}>
        <div className={styles.Container}>
          <div className={styles.Heading}>
            Customize your links{" "}
            {message && (
              <span
                className={`${styles.message} ${
                  message.includes("successfully")
                    ? styles["message-success"]
                    : styles["message-error"]
                }`}
              >
                {message}
              </span>
            )}
          </div>
          <div className={styles.subHeading}>
            Add/edit/remove links below and then share all your profiles with
            the world!
          </div>
          <button
            className={styles.addButton}
            onClick={handleAddLink}
            disabled={
              links.length >= PLATFORMS.length ||
              PLATFORMS.every((p) => links.some((l) => l.platform === p.value))
            }
          >
            + Add new link
          </button>

          <div
            className={styles.linksContainer}
            ref={linksContainerRef}
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {links.length === 0 ? (
              <div className={styles.emptyContainer}>
                <img
                  src="/images/illustration-empty.svg"
                  alt="Empty"
                  className={styles.emptyImage}
                />
                <div className={styles.emptyText}>Let's get you started</div>
                <p className={styles.emptyText}>
                  Use the "Add new link" button to get started. Once you have
                  more than one link, you can reorder and edit them.
                </p>
              </div>
            ) : (
              links.map((link, index) => (
                <LinkItem
                  key={index}
                  link={link}
                  index={index}
                  moveLink={moveLink}
                  handleChange={handleChange}
                  handleRemove={handleRemove}
                  links={links}
                />
              ))
            )}
          </div>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={!hasChanges || links.length === 0}
          >
            Save
          </button>
        </div>
        <div className={styles.divider} />
      </div>
    </DndProvider>
  );
}
