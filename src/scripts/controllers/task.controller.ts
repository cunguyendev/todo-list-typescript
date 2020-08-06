import TaskView from '../views/task.view';
import { createUniqueNumber } from '../helpers';
import TaskModel from '../models/task.model';
import Storage from '../services/storage';
import CONSTANTS from '../constants';

export default class TaskController {
  private taskView: TaskView;

  private tasks: TaskModel[];

  private storage: Storage;

  constructor() {
    this.taskView = new TaskView();
    this.storage = new Storage();
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
  addTask(data: string): boolean {
    if (data) {
      const currentTime = new Date();
      const id: number = createUniqueNumber();
      const title: string = data;
      const createAt = currentTime;
      const updateAt = currentTime;

      const task: TaskModel = new TaskModel(id, title, createAt, updateAt, false);

      this.tasks.push(task);

      try {
        this.storage.setItem(CONSTANTS.DATABASES.TASKS, JSON.stringify(this.tasks));

        return true;
      } catch (error) {
        return false;
      }
    }

    return false;
  }
}
