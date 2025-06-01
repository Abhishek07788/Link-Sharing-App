import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../styles/PhonePreview.module.css";
import { PLATFORMS } from "@/utils/config";

export default function PhonePreview({ platforms }) {

  const getPlatformData = (platformValue) => {
    return PLATFORMS.find((p) => p.value === platformValue);
  };

  return (
    <div className={styles.phoneContainer}>
      <Image
        src="/images/illustration-phone-mockup.svg"
        alt="Phone Mockup"
        width={320}
        height={640}
        className={styles.mockup}
      />

      <div className={styles.linksOverlay}>
        {platforms.map((link) => {
          const platform = getPlatformData(link.platform);
          if (!platform) return null;

          return (
            <div
              key={platform.value}
              className={styles.linkButton}
              style={{ backgroundColor: platform.bgColor }}
            >
              <div className={styles.left}>
                <Image
                  src={platform.icon}
                  alt={platform.label}
                  width={20}
                  height={20}
                />
                <span>{platform.label}</span>
              </div>

              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/icon-arrow-right.svg"
                  alt="arrow"
                  width={20}
                  height={20}
                  className={styles.arrowIcon}
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}