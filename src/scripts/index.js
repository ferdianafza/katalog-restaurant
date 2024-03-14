/* eslint-disable no-unused-vars */
/* eslint-disable import/no-extraneous-dependencies */
import 'regenerator-runtime';
import '../styles/main.css';
import App from './views/app';
import swRegister from './utils/sw-register';

document.addEventListener('DOMContentLoaded', () => {
  const drawerButton = document.querySelector('.drawer-button');
  const drawer = document.querySelector('.drawer');

  drawerButton.addEventListener('click', () => {
    drawer.style.display = drawer.style.display === 'none' ? 'flex' : 'none';
  });
});

const app = new App({
  button: document.querySelector('.drawer-button'),
  drawer: document.querySelector('.drawer'),
  content: document.querySelector('#mainContent'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
