import TheRestaurantDbSource from '../../data/therestaurantdb-source';
import {
  createRestaurantItemTemplate,
  createLoadingIndicatorTemplate,
} from '../templates/template-creator';

const ListRestaurants = {
  async render() {
    return `
      <div class="content">
        <section class="hero">
          <picture>
            <source media="(max-width: 600px)" srcset="./images/heros/hero-image_2-large.jpg">
            <img class="lazyload" src="./images/hero-image_2-large.jpg" alt="Delicious dishes served at our restaurant" />
          </picture>
        </section>
        <div id="restaurants" class="restaurants restaurant-list"></div>
      </div>
    `;
  },

  async afterRender() {
    this.renderLoading();
    try {
      const restaurants = await TheRestaurantDbSource.listRestaurants();
      this.renderRestaurants(restaurants);
    } catch (error) {
      this.renderError(error.message);
    }
  },

  renderLoading() {
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurantsContainer.innerHTML = createLoadingIndicatorTemplate();
  },

  renderRestaurants(restaurants) {
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurantsContainer.innerHTML = '';

    restaurants.forEach((restaurant) => {
      const restaurantItem = this.createRestaurantItem(restaurant);
      restaurantsContainer.appendChild(restaurantItem);
    });
  },

  renderError(message) {
    const restaurantsContainer = document.querySelector('#restaurants');
    restaurantsContainer.innerHTML = `<p class="error-message">${message}</p>`;
  },

  createRestaurantItem(restaurant) {
    const restaurantItem = document.createElement('div');
    // restaurantItem.classList.add('restaurant-card');
    restaurantItem.innerHTML = createRestaurantItemTemplate(restaurant);

    return restaurantItem;
  },
};

export default ListRestaurants;
