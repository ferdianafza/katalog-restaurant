/* eslint-disable no-underscore-dangle */
import CONFIG from '../globals/config';

const CacheHelper = {
  async cachingAppShell(requests) {
    const cache = await this._openCache();
    await cache.addAll(requests);
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    const oldCacheNames = cacheNames.filter((name) => name !== CONFIG.CACHE_NAME);
    await Promise.all(oldCacheNames.map((filteredName) => caches.delete(filteredName)));
  },

  async revalidateCache(request) {
    const response = await caches.match(request);

    if (response) {
      try {
        this._fetchRequest(request);
        return response;
      } catch (error) {
        // Handle error if fetching fails
        console.error('Error fetching request:', error);
      }
    }

    return this._fetchRequest(request);
  },

  async _openCache() {
    return caches.open(CONFIG.CACHE_NAME);
  },

  async _fetchRequest(request) {
    try {
      const response = await fetch(request);

      if (response && response.status === 200) {
        await this._addCache(request);
      }

      return response;
    } catch (error) {
      // Handle error if fetching fails
      console.error('Error fetching request:', error);
      return null;
    }
  },

  async _addCache(request) {
    const cache = await this._openCache();
    await cache.add(request);
  },
};

export default CacheHelper;
