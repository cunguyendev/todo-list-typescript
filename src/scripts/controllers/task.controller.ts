import TaskView from '../views/task.view';
import { createUniqueNumber, toArray } from '../helpers';
import TaskModel from '../models/task.model';
import Storage from '../services/storage';
import CONSTANTS from '../constants';

type GetTask = () => TaskModel[];

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
    const data = toArray(this.getTasks()) as TaskModel[];
    this.tasks = data;
    this.taskView.bindEventListeners(this);
    this.displayTasks();
  }

  /**
   * Get all of tasks
   */
  getTasks: GetTask = () => {
    const data = this.storage.getItem(CONSTANTS.DATABASES.TASKS);

    try {
      if (JSON.parse(data)) {
        return JSON.parse(data);
      }

      return [];
    } catch (error) {
      return [];
    }
  };

  /**
   * Handling for display tags
   */
  displayTasks(): void {
    this.taskView.renderTasks(this.tasks);
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
