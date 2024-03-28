import React from 'react';
import styles from "../styles/Button.module.css";

const Button = ({ label, handleClick, additionalClasses = "" }) => {
  return (
    <button
      className={`${styles.Button} ${additionalClasses}`}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default Button;