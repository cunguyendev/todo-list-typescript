import LoadingController from './controllers/loading.controller';
import TaskController from './controllers/task.controller';

export default class App {
  private loadingController;

  private taskController;

  constructor() {
    this.loadingController = new LoadingController();
    this.taskController = new TaskController();
  }

  startApp() {
    this.loadingController.init();
    this.taskController.init();

    return this;
  }
}
