import React from "react";
import Loader from "react-loader-spinner";
import styles from "./Loader.module.css";
export default function Spinner() {
  return (
    <div className={styles.spinner}>
      <Loader type="Circles" color="blue" height={80} width={80} />
    </div>
  );
}
