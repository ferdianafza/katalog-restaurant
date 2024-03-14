import CONFIG from './config';

const API_ENDPOINT = {
  LIST_RESTAURANTS: `${CONFIG.BASE_URL}list`,
  DETAIL_RESTAURANT: (id) => `${CONFIG.BASE_URL}detail/${id}`,
  SEARCH_RESTAURANTS: (query) => `${CONFIG.BASE_URL}search?q=${query}`,
  ADD_REVIEW: `${CONFIG.BASE_URL}/review`,
  SMALL_IMAGE: (pictureId) => `${CONFIG.BASE_IMAGE_URL}/small/${pictureId}`,
  MEDIUM_IMAGE: (pictureId) => `${CONFIG.BASE_IMAGE_URL}/medium/${pictureId}`,
  LARGE_IMAGE: (pictureId) => `${CONFIG.BASE_IMAGE_URL}/large/${pictureId}`,
};

export default API_ENDPOINT;
