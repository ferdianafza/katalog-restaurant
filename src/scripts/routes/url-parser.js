/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
const UrlParser = {
    parseActiveUrlWithCombiner() {
      const url = window.location.hash.slice(1).toLowerCase();
      const splitedUrl = this._splitUrl(url);
      return this._combineUrl(splitedUrl);
    },

    parseActiveUrlWithoutCombiner() {
      const url = window.location.hash.slice(1).toLowerCase();
      return this._splitUrl(url);
    },

    _splitUrl(url) {
      const urlSplits = url.split('/');
      return {
        resource: urlSplits[1] || '',
        id: urlSplits[2] || '',
        verb: urlSplits[3] || '',
      };
    },

    _combineUrl(splitedUrl) {
      const { resource, id, verb } = splitedUrl;
      return `/${resource}${id ? '/:id' : ''}${verb ? `/${verb}` : ''}`;
    },
  };

  export default UrlParser;
