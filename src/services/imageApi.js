import axios from "axios";

const API_KEY = "15647296-0cd5e3917b5565ffd95f055ae";

const fetchImagesWithQuery = (searchQuery, page) => {
  return axios.get(
    `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
};

export default {
  fetchImagesWithQuery
};
