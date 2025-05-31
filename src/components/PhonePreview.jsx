import Image from 'next/image';
import styles from '../styles/PhonePreview.module.css';

const socialLinks = [
  {
    name: 'GitHub',
    icon: '/images/icon-github.svg',
    bgColor: '#000000',
    href: '#',
  },
  {
    name: 'YouTube',
    icon: '/images/icon-youtube.svg',
    bgColor: '#FF0000',
    href: '#',
  },
  {
    name: 'LinkedIn',
    icon: '/images/icon-linkedin.svg',
    bgColor: '#0A66C2',
    href: '#',
  },
    {
    name: 'Facebook',
    icon: '/images/icon-facebook.svg',
    bgColor: '#1877F2',
    href: '#'
  },
  {
    name: 'Frontend Mentor',
    icon: '/images/icon-frontend-mentor.svg',
    bgColor: '#F24E1E',
    href: '#',
  },
];

export default function PhonePreview() {
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
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={styles.linkButton}
            style={{ backgroundColor: link.bgColor }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.left}>
              <Image src={link.icon} alt={link.name} width={20} height={20} />
              <span>{link.name}</span>
            </div>
            <Image
              src="/images/icon-arrow-right.svg"
              alt="arrow"
              width={20}
              height={20}
            />
          </a>
        ))}
      </div>
    </div>
  );
}
