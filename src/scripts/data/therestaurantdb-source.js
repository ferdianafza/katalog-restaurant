import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class TheRestaurantDbSource {
  static async listRestaurants() {
    const response = await fetch(API_ENDPOINT.LIST_RESTAURANTS);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurant(id) {
    try {
      const response = await fetch(API_ENDPOINT.DETAIL_RESTAURANT(id));
      const responseJson = await response.json();

      if (responseJson.error) {
        throw new Error(responseJson.message);
      }

      const { restaurant } = responseJson;
      console.log(restaurant);
      return restaurant;
    } catch (error) {
      console.error('Error fetching restaurant details:', error.message);
      throw error;
    }
  }

  static async searchRestaurants(query) {
    const response = await fetch(API_ENDPOINT.SEARCH_RESTAURANTS(query));
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async addReview(reviewData) {
    const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.API_KEY,
      },
      body: JSON.stringify(reviewData),
    });
    return response.json();
  }
}

export default TheRestaurantDbSource;
