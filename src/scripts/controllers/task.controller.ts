import TaskView from '../views/task.view';
import { createUniqueNumber, toArray } from '../helpers/index';
import TaskModel from '../models/task.model';
import Storage from '../services/storage';
import CONSTANTS from '../constants/index';

type GetTask = () => TaskModel[];

export default class TaskController {
  private taskView: TaskView;

  private tasks: TaskModel[];

  private storage: Storage;

  private asDoneStatus: boolean;

  constructor() {
    this.taskView = new TaskView();
    this.storage = new Storage();
    this.tasks = [];
    this.asDoneStatus = false;
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
        this.displayTasks();

        return true;
      } catch (error) {
        return false;
      }
    }

    return false;
  }

  /**
   * Handle for remove a task
   * @param taskIs
   */
  removeTask(taskId: number): boolean {
    this.tasks = this.tasks.filter((item: TaskModel): boolean => item.id !== taskId);

    try {
      this.storage.setItem(CONSTANTS.DATABASES.TASKS, JSON.stringify(this.tasks));
      this.displayTasks();

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Mark as done for a task
   * @param taskId
   */
  checkTask(taskId: number): boolean {
    this.asDoneStatus = false;
    const itemData: TaskModel = this.tasks.find((task) => task.id === taskId);

    itemData.status = !itemData.status;
    itemData.updateAt = new Date();

    try {
      this.storage.setItem(CONSTANTS.DATABASES.TASKS, JSON.stringify(this.tasks));
      this.displayTasks();

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Mark as done for all of tasks
   */
  markAsDone(): boolean {
    this.asDoneStatus = !this.asDoneStatus;

    this.tasks.map((task: TaskModel) => {
      const taskItem = task;
      taskItem.status = this.asDoneStatus;

      return true;
    });

    try {
      this.storage.setItem(CONSTANTS.DATABASES.TASKS, JSON.stringify(this.tasks));
      this.displayTasks();

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Handle for clear all of task have completed
   */
  clearTaskCompleted(): boolean {
    this.tasks = this.tasks.filter((item): boolean => item.status !== true);

    try {
      this.storage.setItem(CONSTANTS.DATABASES.TASKS, JSON.stringify(this.tasks));
      this.displayTasks();

      return true;
    } catch (error) {
      return false;
    }
  }
}
