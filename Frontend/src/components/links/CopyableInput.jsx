import { useState } from "react";
import styles from "@/styles/CustomizeForm.module.css";

export function CopyableInput({ value, placeholder, onChange, error }) {
  const [copySuccess, setCopySuccess] = useState("");

  const handleCopy = () => {
    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  return (
    <div className={styles.inputWrapper}>
      <input
        type="text"
        placeholder={placeholder ?? "Enter link"}
        value={value}
        onChange={onChange}
        className={`${error ? styles.errorTextInput  : styles.textInput}`}
      />
      <img
        src="/images/icon-link-copied-to-clipboard.svg"
        alt="copy"
        className={`${styles.copyIcon} ${!value ? styles.disabled : ""}`}
        onClick={handleCopy}
        draggable={false}
      />
      {copySuccess && <span className={styles.copySuccess}>{copySuccess}</span>}
    </div>
  );
}

export default CopyableInput;
