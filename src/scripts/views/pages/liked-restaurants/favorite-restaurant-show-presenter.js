/* eslint-disable linebreak-style */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-underscore-dangle */
class FavoriteRestaurantShowPresenter {
  constructor({ view, favoriteRestaurants }) {
    this._view = view;
    this._favoriteRestaurants = favoriteRestaurants;

    this._showFavoriteRestaurants();
  }

  async _showFavoriteRestaurants() {
    const restaurants = await this._favoriteRestaurants.getAllRestaurants();
    this._displayRestaurants(restaurants);
  }

  _displayRestaurants(restaurants) {
    this._view.showFavoriteRestaurants(restaurants);
  }

  async searchRestaurants(query) {
    const restaurants = await this._favoriteRestaurants.searchRestaurants(query);
    this._displayRestaurants(restaurants);
  }
}

export default FavoriteRestaurantShowPresenter;
