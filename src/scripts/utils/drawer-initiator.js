/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const DrawerInitiator = {
    init({ button, drawer, content }) {
      button.addEventListener('click', (clickEvent) => this._toggleDrawer(clickEvent, drawer));
      content.addEventListener('click', (clickEvent) => this._closeDrawer(clickEvent, drawer));
    },

    _toggleDrawer(clickEvent, drawer) {
      clickEvent.stopPropagation();
      clickEvent.preventDefault();
      drawer.classList.toggle('open');
    },

    _closeDrawer(clickEvent, drawer) {
      clickEvent.stopPropagation();
      drawer.classList.remove('open');
    },
  };

  export default DrawerInitiator;
