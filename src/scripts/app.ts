import LoadingController from './controllers/loadingController';

export default class App {
  private loadingController;

  constructor() {
    this.loadingController = new LoadingController();
  }

  startApp() {
    this.loadingController.init();

    return this;
  }
}
