/* eslint-disable no-unused-vars */
import UrlParser from '../../routes/url-parser';
import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import {
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
} from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div id="restaurant" class="restaurant restaurant-list"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await TheRestaurantDbSource.detailRestaurant(url.id);

    this.renderRestaurantDetail(restaurant);
    this.renderLikeButton(restaurant);
    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: this.extractRestaurantData(restaurant),
    });
  },

  renderRestaurantDetail(restaurant) {
    const restaurantContainer = document.querySelector('#restaurant');
    restaurantContainer.innerHTML = createRestaurantDetailTemplate(restaurant);
  },

  renderLikeButton(restaurant) {
    const likeButtonContainer = document.querySelector('#likeButtonContainer');
    likeButtonContainer.innerHTML = createLikeButtonTemplate();
  },

  extractRestaurantData(restaurant) {
    return {
      id: restaurant.id,
      name: restaurant.name,
      description: restaurant.description,
      city: restaurant.city,
      address: restaurant.address,
      pictureId: restaurant.pictureId,
      rating: restaurant.rating,
    };
  },
};

export default Detail;
