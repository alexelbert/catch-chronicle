// FollowButton.js
import React from 'react';
import { Button } from "react-bootstrap";
import btnStyles from "../styles/Button.module.css";

const FollowButton = ({ isFollowing, handleFollow, handleUnfollow, profile }) => {
  if (isFollowing) {
    return (
      <Button
        className={`${btnStyles.Button} ${btnStyles.BlackOutline}`}
        onClick={() => handleUnfollow(profile)}
      >
        Unfollow
      </Button>
    );
  } else {
    return (
      <Button
        className={`${btnStyles.Button} ${btnStyles.Black}`}
        onClick={() => handleFollow(profile)}
      >
        Follow
      </Button>
    );
  }
};

export default FollowButton;