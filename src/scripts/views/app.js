/* eslint-disable no-trailing-spaces */
/* eslint-disable indent */
/* eslint-disable no-underscore-dangle */
import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, content }) {
    // eslint-disable-next-line no-underscore-dangle
    this._button = button;
    // eslint-disable-next-line no-underscore-dangle
    this._drawer = drawer;
    // eslint-disable-next-line no-underscore-dangle
    this._content = content;
    // eslint-disable-next-line no-underscore-dangle
    this._initAppShell();
  }

  _initAppShell() {
    DrawerInitiator.init({
      // eslint-disable-next-line no-underscore-dangle
      button: this._button,
      // eslint-disable-next-line no-underscore-dangle
      drawer: this._drawer,
      // eslint-disable-next-line no-underscore-dangle
      content: this._content,
    });
  }

  async renderPage() {
    try {
      const url = UrlParser.parseActiveUrlWithCombiner();
      const page = routes[url];

      if (!page) {
        throw new Error('Page not found');
      }

      this._content.innerHTML = await page.render();
      await page.afterRender();
      const skipLinkElem = document.querySelector('.skip-to-content');    
      skipLinkElem.addEventListener('click', (event) => {      
      event.preventDefault();
      document.querySelector('#mainContent').focus();
});
    } catch (error) {
      console.error('Error rendering page:', error);
      // Handle error, for example, redirect to an error page
    }
  }
}

export default App;
