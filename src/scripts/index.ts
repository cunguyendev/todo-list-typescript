import App from './app';

const app: App = new App();

/**
 * Start the app after DOM loaded
 */
document.addEventListener('DOMContentLoaded', (): void => {
  app.startApp();
});
