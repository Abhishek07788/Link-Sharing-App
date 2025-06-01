import { useState, useCallback, useEffect, useRef } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import LinkItem from "./LinkItem";
import styles from "../styles/CustomizeForm.module.css";
import { PLATFORMS } from "@/utils/config";

export default function CustomizeForm({platforms, setPlatforms }) {
  const [links, setLinks] = useState([]);
  const [message, setMessage] = useState("");
  const linksContainerRef = useRef(null);

  // Initialize links from platforms prop
  useEffect(() => {
    if (platforms?.length > 0) {
      setLinks(platforms);
    }
  }, [platforms]);

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
    const updatedLinks = [...links];
    updatedLinks[index][field] = value;
    updatedLinks[index].error = "";
    setLinks(updatedLinks);
  };

  // Move link within the list
  const moveLink = useCallback(
    (fromIndex, toIndex) => {
      const updated = [...links];
      const [moved] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, moved);
      setLinks(updated);
      setPlatforms(updated);
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
    setPlatforms(updatedLinks);
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
      setPlatforms(updatedLinks);
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
            disabled={links.length === 0}
          >
            Save
          </button>
        </div>
        <div className={styles.divider} />
      </div>
    </DndProvider>
  );
}
