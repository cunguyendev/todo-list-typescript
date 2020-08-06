import TaskView from '../views/task.view';
import { createUniqueNumber } from '../helpers';
import TaskModel from '../models/task.model';

export default class TaskController {
  private taskView: TaskView;

  private tasks: TaskModel[];

  constructor() {
    this.taskView = new TaskView();
    this.tasks = [];
  }

  /**
   * Initial for the task module
   */
  init(): void {
    this.taskView.bindEventListeners(this);
  }

  /**
   * Handling for adding a task
   */
  addTask(data: string): void {
    if (data) {
      const currentTime = new Date();
      const id: number = createUniqueNumber();
      const title: string = data;
      const createAt = currentTime;
      const updateAt = currentTime;

      const task: TaskModel = new TaskModel(id, title, createAt, updateAt, false);

      this.tasks.push(task);
    }
  }
}
