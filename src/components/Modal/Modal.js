import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

class Modal extends Component {
  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    id: PropTypes.number.isRequired,
    onClickImage: PropTypes.func.isRequired
  };

  state = {};

  componentDidMount() {
    window.addEventListener("keydown", this.closeOnEsc);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.closeOnEsc);
  }

  closeOnEsc = e => {
    if (e.code === "Escape") this.props.onClickImage();
    return;
  };

  handleCloseModal = e => {
    if (e.target === e.currentTarget) this.props.onClickImage();
    return;
  };

  urlForlargeImage = () => {
    const { items, id } = this.props;
    const selectedImage = items.find(item => item.id === +id);
    return selectedImage.largeImageURL;
  };

  render() {
    return (
      <div
        className={styles.Overlay}
        onClick={this.handleCloseModal}
        role="presentation"
      >
        <div className={styles.Modal}>
          <img src={this.urlForlargeImage()} alt="largeImage" />
        </div>
      </div>
    );
  }
}

export default Modal;
