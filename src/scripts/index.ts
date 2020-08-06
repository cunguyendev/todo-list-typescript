import App from './app';

const app = new App();

/**
 * Start the app after DOM loaded
 */
document.addEventListener('DOMContentLoaded', () => {
  app.startApp();
});
