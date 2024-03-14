/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const assert = require('assert');

Feature('Liking Restaurants');
Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.restaurant__name a');
  const firstRestaurant = locate('.restaurant__name a').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.restaurant-item');
  const likedRestaurantName = await I.grabTextFrom('.restaurant__name');

  assert.strictEqual(firstRestaurantName, likedRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
    I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
    I.amOnPage('/');
    I.seeElement('.restaurant__name a');
    const firstRestaurant = locate('.restaurant__name a').first();
    const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
    I.click(firstRestaurant);

    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/like');
    I.seeElement('.restaurant__name a');
    const firstRestaurantLiked = locate('.restaurant__name a').first();
    const firstRestaurantLikedName = await I.grabTextFrom(firstRestaurantLiked);
    I.click(firstRestaurantLiked);

    I.seeElement('#likeButton');
    I.click('#likeButton'); 

    I.amOnPage('/#/like');
    I.dontSeeElement('.restaurant-item'); 

    I.fillField('#query', firstRestaurantName);
    I.pressKey('Enter');

    I.seeElement('.restaurant-item__not__found');
});

Scenario('searching restaurants', async ({ I }) => {
    I.amOnPage('/#/like');

    I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

    I.amOnPage('/');

    for (let i = 1; i <= 3; i++) {
        I.seeElement('.restaurant__name a');
        I.click(locate('.restaurant__name a').at(i));
        I.seeElement('#likeButton');
        I.click('#likeButton');
        I.amOnPage('/');
    }

    I.amOnPage('/#/like');
    I.seeElement('#query');

    const likedRestaurantNames = [];
    for (let i = 1; i <= 3; i++) {
        const name = await I.grabTextFrom(locate('.restaurant-item .restaurant__name').at(i));
        likedRestaurantNames.push(name);
    }

    const searchQuery = 'Kita';
    I.fillField('#query', searchQuery);
    I.pressKey('Enter');

    const visibleSearchedRestaurants = await I.grabNumberOfVisibleElements('.restaurant-item');

    assert.strictEqual(visibleSearchedRestaurants, 1);
});
