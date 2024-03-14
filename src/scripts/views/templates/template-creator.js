/* eslint-disable arrow-parens */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-use-before-define */
import API_ENDPOINT from '../../globals/api-endpoint';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const createRestaurantDetailTemplate = (restaurant) => `
  <img class="restaurant__picture lazyload" data-src="${API_ENDPOINT.MEDIUM_IMAGE(restaurant.pictureId)}" alt="${restaurant.name}" />
  <div class="restaurant__info">
    <h2 class="restaurant__name">${restaurant.name}</h2>
    <h3>Information</h3>
    <div class="restaurant__tagline">
      <h4>City</h4>
      <p>${restaurant.city}</p>
    </div>
    <div class="restaurant__release-date">
      <h4>Address</h4>
      <p>${restaurant.address}</p>
    </div>
    <div class="restaurant__rating">
      <h4>Rating</h4>
      <p>⭐️${restaurant.rating}</p>
    </div>
  </div>
  <div class="restaurant__overview">
    <h3>Overview</h3>
    <p>${restaurant.description}</p>
  </div>
  <div class="restaurant__menu">
    <h3>Menus</h3>
    <div class="restaurant__menu-grid">
      <div class="restaurant__foods">
        <h4>Foods</h4>
        <div class="menu-grid">
          ${createMenuGrid(restaurant.menus.foods)}
        </div>
      </div>
      <div class="restaurant__drinks">
        <h4>Drinks</h4>
        <div class="menu-grid">
          ${createMenuGrid(restaurant.menus.drinks)}
        </div>
      </div>
    </div>
  </div>
  <div class="restaurant__reviews">
    <h3>Customer Reviews</h3>
    <ul>
      ${restaurant.customerReviews.map((review) => `
        <li class="reviewcs">
          <div class="review__header">
            <p class="review__name">${review.name}</p>
            <p class="review__date">${review.date}</p>
          </div>
          <p class="review__content">${review.review}</p>
        </li>
      `).join('')}
    </ul>
  </div>
`;

const createMenuGrid = (menuItems) => {
  const filteredMenuItems = menuItems.filter((item) => item.name);

  const itemsPerColumn = Math.ceil(filteredMenuItems.length / 3);
  const column1 = filteredMenuItems.slice(0, itemsPerColumn);
  const column2 = filteredMenuItems.slice(itemsPerColumn);

  const createColumnHTML = (column) => `
    <ul>
      ${column.map((item) => `<li class="menuRestoran">${item.name}</li>`).join('')}
    </ul>
  `;

  return `
    <div class="menu-column">${createColumnHTML(column1)}</div>
    <div class="menu-column">${createColumnHTML(column2)}</div>
  `;
};

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item restaurant-card">
    <div class="restaurant-item__header">
      <img class="restaurant-item__header__picture restaurant-img lazyload" alt="${restaurant.name}"
      data-src="${API_ENDPOINT.MEDIUM_IMAGE(restaurant.pictureId)}">
      <div class="restaurant-item__header__rating restaurant-rating">
        <p>⭐️<span class="restaurant-item__header__rating__score">${restaurant.rating}</span></p>
      </div>
    </div>
    <div class="movie-item__content restaurant-info">
      <h3 class="restaurant__name" ><a href="/#/detail/${restaurant.id}" class="restaurant-name restaurant__name">${restaurant.name || '-'} <span class="restaurant-city">${restaurant.city}</span></a></h3>
      <p class="restaurant-description">${`${restaurant.description.slice(0, 100)}...`}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

const createLoadingIndicatorTemplate = () => `
  <div class="loading-indicator">
    <svg class="spinner" viewBox="0 0 50 50">
      <circle class="path" cx="25" cy="25" r="20" fill="none" stroke-width="5"></circle>
    </svg>
    <p>Loading...</p>
  </div>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
  createLoadingIndicatorTemplate,
};
