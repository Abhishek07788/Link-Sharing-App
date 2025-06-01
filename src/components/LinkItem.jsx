import { useDrag, useDrop } from "react-dnd";
import Select from "react-select";
import Image from "next/image";
import styles from "../styles/CustomizeForm.module.css";
import { useRef } from "react";
import { PLATFORMS } from "@/utils/config";

const ItemType = "LINK";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderColor: state.isFocused ? "#633CFF" : "#ccc",
    "&:hover": {
      borderColor: "#633CFF",
    },
  }),
  indicatorSeparator: () => ({
    display: "none", 
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: "#633CFF", 
    "&:hover": {
      color: "#633CFF",
    },
  }),
};

const LinkItem = ({
  link,
  index,
  moveLink,
  handleChange,
  handleRemove,
  links,
}) => {
  const ref = useRef(null);
  const dragRef = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType,
    hover(item) {
      if (item.index === index) return;
      moveLink(item.index, index);
      item.index = index;
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Attach drop target to the whole container
  drop(ref);
  // Attach drag source only to the drag handle (icon)
  drag(dragRef);
  // Attach drag preview to the whole container so entire item moves
  preview(ref);

  const selectedPlatform = PLATFORMS.find((p) => p.value === link.platform);
  const placeholder = selectedPlatform?.placeholder || "e.g. https://yourlink.com";
  const platformOptions = PLATFORMS.map((p) => ({
    label: p.label,
    value: p.value,
    icon: p.icon,
    isDisabled:
      links.some((l) => l.platform === p.value && l !== link) && link.platform !== p.value,
  }));

  return (
    <div
      className={styles.linkBlock}
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: isDragging ? "grabbing" : "default",
      }}
    >
      <div className={styles.linkHeader}>
        <div className={styles.linkTitle}>
          <span className={styles.dragHandle} ref={dragRef} style={{ cursor: "grab" }}>
            <Image
              src="/images/icon-drag-and-drop.svg"
              height={12}
              width={12}
              alt="drag"
            />
          </span>
          <span>Link #{index + 1}</span>
        </div>
        <button onClick={() => handleRemove(index)}>Remove</button>
      </div>

      <label>Platform</label>
      <Select
        options={platformOptions}
        value={
          link.platform
            ? {
                label: selectedPlatform.label,
                value: selectedPlatform.value,
                icon: selectedPlatform.icon,
              }
            : null
        }
        onChange={(option) => {
          handleChange(index, "platform", option?.value);
          handleChange(index, "url", link.url);
        }}
        getOptionLabel={(e) => (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Image src={e.icon} width={20} height={20} alt={e.label} />
            {e.label}
          </div>
        )}
        isOptionDisabled={(option) => option.isDisabled}
        styles={customStyles}
      />

      <label>Link</label>
      <input
        type="text"
        placeholder={placeholder}
        value={link.url}
        onChange={(e) => handleChange(index, "url", e.target.value)}
        className={`${styles.textInput} ${link.error ? styles.errorInput : ""}`}
      />
      {link.error && <span className={styles.errorText}>{link.error}</span>}
    </div>
  );
};

export default LinkItem;