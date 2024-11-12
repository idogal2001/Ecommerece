import React from "react";
import styles from "../../styles/ProductList/LayOut.module.scss";

interface layoutProps {
  setLayout: React.Dispatch<React.SetStateAction<boolean>>;
}

const LayOut = ({ setLayout }: layoutProps) => {
  const layoutChange3 = () => {
    setLayout(false);
  };

  const layoutChange5 = () => {
    setLayout(true);
  };
  return (
    <div className={styles.layoutChange}>
      <span className={styles.spanChangeLayOut}>Change Layout:{" "}</span>
      <button className={styles.layOutButton} onClick={layoutChange3}>
        3
      </button>
      <button className={styles.layOutButton} onClick={layoutChange5}>
        5
      </button>
    </div>
  );
};

export default LayOut;
