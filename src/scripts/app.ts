import LoadingController from './controllers/loading.controller';
import TaskController from './controllers/task.controller';

export default class App {
  private loadingController: LoadingController;

  private taskController: TaskController;

  constructor() {
    this.loadingController = new LoadingController();
    this.taskController = new TaskController();
  }

  startApp(): void {
    this.loadingController.init();
    this.taskController.init();
  }
}
