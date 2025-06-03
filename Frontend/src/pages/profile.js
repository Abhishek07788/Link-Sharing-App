import Register from "@/components/auth/Register";
import { AuthContext } from "@/context/authProvider";
import React, { useContext } from "react";
import styles from "@/styles/Profile.module.css";

export const ProfileView = ({user}) => {
  return (
    <div className={styles.avatarSection}>
      <div className={styles.avatar}>{user?.name?.[0].toUpperCase()}</div>
      <div className={styles.displayName}>{user?.name}</div>
      <div className={styles.username}>@{user?.username}</div>
    </div>
  );
};

function Profile() {
  const { user, handleLogOut } = useContext(AuthContext);

  if (!user || !user.username) {
    return (
      <div className={styles.container}>
        <Register />
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileCard}>
        <div className={styles.avatarSection}>
          <ProfileView user={user} />
          <button className={styles.logoutButton} onClick={handleLogOut}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
