import React, { Component } from "react";
import imageApi from "../../services/imageApi";
import ImageGallery from "../ImageGallery/ImageGallery";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import Button from "../Button/Button";
import Notification from "../Notifications/Notifications";
import Modal from "../Modal/Modal";
import styles from "./App.module.css";

export default class App extends Component {
  state = {
    items: [],
    isLoading: false,
    error: null,
    searchQuery: "",
    pageNumber: 1,
    ModalState: false,
    imageId: "",
    newSearch: 1
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.pageNumber !== this.state.pageNumber ||
      prevState.newSearch !== this.state.newSearch
    ) {
      this.fetchImages();
    }

    if (prevState.items !== this.state.items) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
      });
    }
  }

  fetchImages = () => {
    const { searchQuery, pageNumber } = this.state;
    this.setState({ isLoading: true });
    imageApi
      .fetchImagesWithQuery(searchQuery, pageNumber)
      .then(({ data }) =>
        this.setState(prevState => ({
          items: [...prevState.items, ...data.hits]
        }))
      )
      .catch(error => this.setState({ error }))
      .finally(() =>
        this.setState({
          isLoading: false
        })
      );
  };

  handleSearchFormSubmit = query => {
    this.setState(prevState => ({
      searchQuery: query,
      pageNumber: 1,
      items: [],
      newSearch: !prevState.newSearch
    }));
  };
  onClickMore = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1
    }));
  };

  cangeModalState = id => {
    this.setState({ ModalState: !this.state.ModalState, imageId: id });
  };

  render() {
    const { items, isLoading, error, ModalState, imageId } = this.state;
    return (
      <div className={styles.App}>
        <SearchBar onSubmit={this.handleSearchFormSubmit} />
        {error && <Notification text={error.message} />}
        {isLoading && <Loader />}
        {items.length > 0 && (
          <ImageGallery items={items} onClickImage={this.cangeModalState} />
        )}
        {items.length > 0 && <Button onClick={this.onClickMore} />}
        {ModalState && (
          <Modal
            items={items}
            id={imageId}
            onClickImage={this.cangeModalState}
          />
        )}
      </div>
    );
  }
}
