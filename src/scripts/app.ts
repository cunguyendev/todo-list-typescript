import LoadingController from './controllers/loading.controller';
import TaskController from './controllers/task.controller';
import NotificationController from './controllers/notification.controller';
import ConfirmationController from './controllers/confirmation.controller';

export default class App {
  private loadingController: LoadingController;

  private taskController: TaskController;

  private notificationController: NotificationController;

  private confirmationController: ConfirmationController;

  constructor() {
    this.loadingController = new LoadingController();
    this.taskController = new TaskController();
    this.notificationController = new NotificationController();
    this.confirmationController = new ConfirmationController();
  }

  startApp(): void {
    this.loadingController.init();
    this.taskController.init();
    this.notificationController.init();
    this.confirmationController.init();
  }
}
