import { useState } from "react";
import styles from "../styles/CustomizeForm.module.css";

const platforms = [
  { label: "GitHub", value: "github", icon: "/images/icon-github.svg" },
  { label: "YouTube", value: "youtube", icon: "/images/icon-youtube.svg" },
  { label: "LinkedIn", value: "linkedin", icon: "/images/icon-linkedin.svg" },
];

export default function CustomizeForm() {
  const [links, setLinks] = useState([]);
  const handleAddLink = () => {
    setLinks([...links, { platform: "", url: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newLinks = [...links];
    newLinks[index][field] = value;
    setLinks(newLinks);
  };

  const handleRemove = (index) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
  };

  return (
    <div className={styles.formContainer}>
      <h2>Customize your links</h2>
      <p>
        Add/edit/remove links below and then share all your profiles with the
        world!
      </p>
      {links.length === 0 ? (
        <div className={styles.emptyContainer}>
          <img
            src="/images/illustration-empty.svg"
            alt="Empty state illustration"
            className={styles.emptyImage}
          />
          <p className={styles.emptyText}>Let's get you started</p>
          <p className={styles.emptyText}>
            Use the "Add new link" button to get started. Once you have more
            than one link, you can reorder and edit them. We're here to help you
            share your profiles with everyone!
          </p>
          <button className={styles.addButton} onClick={handleAddLink}>
            + Add new link
          </button>
        </div>
      ) : (
        <>
          <button className={styles.addButton} onClick={handleAddLink}>
            + Add new link
          </button>
          {links.map((link, index) => (
            <div className={styles.linkBlock} key={index}>
              <div className={styles.linkHeader}>
                <span>Link #{index + 1}</span>
                <button onClick={() => handleRemove(index)}>Remove</button>
              </div>
              <label>Platform</label>
              <select
                value={link.platform}
                onChange={(e) =>
                  handleChange(index, "platform", e.target.value)
                }
                className={styles.selectInput}
              >
                <option value="">Select platform</option>
                {platforms.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
              </select>
              <label>Link</label>
              <input
                type="text"
                placeholder="e.g. https://www.github.com/"
                value={link.url}
                onChange={(e) => handleChange(index, "url", e.target.value)}
                className={styles.textInput}
              />
            </div>
          ))}
        </>
      )}
      <button className={styles.saveButton}>Save</button>
    </div>
  );
}
