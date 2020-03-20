import React from "react";
import PropTypes from "prop-types";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import styles from "./ImageGallery.module.css";

export default function ImageGallery({ items, onClickImage }) {
  ImageGallery.defaultProps = {
    items: []
  };

  ImageGallery.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({})),
    onClickImage: PropTypes.func.isRequired
  };

  return (
    <ul className={styles.ImageGallery}>
      {items.map(item => (
        <ImageGalleryItem
          key={item.id}
          item={item}
          onClickImage={onClickImage}
        />
      ))}
    </ul>
  );
}
