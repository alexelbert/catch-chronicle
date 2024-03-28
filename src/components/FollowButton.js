// FollowButton.js
import React from 'react';
import styles from "../styles/Button.module.css";

const FollowButton = ({ isFollowing, handleFollow, handleUnfollow, profile }) => {
  if (isFollowing) {
    return (
      <button
        className={`${styles.Button}`}
        onClick={() => handleUnfollow(profile)}
      >
        Unfollow
      </button>
    );
  } else {
    return (
      <button
        className={`${styles.Button}`}
        onClick={() => handleFollow(profile)}
      >
        Follow
      </button>
    );
  }
};

export default FollowButton;