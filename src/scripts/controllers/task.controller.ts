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
    this.getCurrentFilter();
  }

  /**
   * Get current filter via url
   */
  getCurrentFilter(): void {
    const { ALL, ACTIVE, COMPLETED } = CONSTANTS.FILTERS;
    const filterTypes = [ALL, ACTIVE, COMPLETED];
    const filterType = filterTypes.find((item) => document.location.hash.search(item) !== -1);

    this.filterBy(filterType);
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

    const baseData = toArray(this.getTasks()) as TaskModel[];

    const taskCompleted = baseData.find((item) => item.status === true);

    if (!taskCompleted) {
      this.taskView.toggleClearCompletedButton('none');
    } else {
      this.taskView.toggleClearCompletedButton('block');
    }
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
    const baseData = toArray(this.getTasks()) as TaskModel[];
    const itemData: TaskModel = baseData.find((task) => task.id === taskId);

    itemData.status = !itemData.status;
    itemData.updateAt = new Date();

    this.tasks = baseData;

    try {
      this.storage.setItem(CONSTANTS.DATABASES.TASKS, JSON.stringify(this.tasks));
      this.displayTasks();
      this.getCurrentFilter();

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
    const baseData = toArray(this.getTasks()) as TaskModel[];

    baseData.map((task: TaskModel) => {
      const taskItem = task;
      taskItem.status = this.asDoneStatus;

      return true;
    });

    this.tasks = baseData;

    try {
      this.storage.setItem(CONSTANTS.DATABASES.TASKS, JSON.stringify(this.tasks));
      this.displayTasks();
      this.getCurrentFilter();

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

  /**
   * Filter task by filters type
   */
  filterBy(filterType): void {
    const baseData = toArray(this.getTasks()) as TaskModel[];
    const activeTasks = baseData.filter((item): boolean => item.status !== true);
    const completedTask = baseData.filter((item): boolean => item.status !== false);

    switch (filterType) {
      case CONSTANTS.FILTERS.ACTIVE:
        this.tasks = activeTasks;

        break;

      case CONSTANTS.FILTERS.COMPLETED:
        this.tasks = completedTask;

        break;

      default:
        this.tasks = baseData;

        break;
    }

    this.displayTasks();
  }
}
