import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./Modal.module.css";

class Modal extends Component {
  static propTypes = {
    onClickImage: PropTypes.func.isRequired,
    urlForlargeImage: PropTypes.string.isRequired
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

  render() {
    return (
      <div
        className={styles.Overlay}
        onClick={this.handleCloseModal}
        role="presentation"
      >
        <div className={styles.Modal}>
          <img src={this.props.urlForlargeImage} alt="largeImage" />
        </div>
      </div>
    );
  }
}

export default Modal;
