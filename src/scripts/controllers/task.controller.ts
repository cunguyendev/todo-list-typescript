import TaskView from '../views/task.view';
import { createUniqueNumber, toArray } from '../helpers/index';
import TaskModel from '../models/task.model';
import Storage from '../services/storage';
import CONSTANTS from '../constants/index';
import NotificationController from './notification.controller';
import ConfirmationController from './confirmation.controller';

type GetTask = () => TaskModel[];

export default class TaskController {
  private taskView: TaskView;

  private tasks: TaskModel[];

  private storage: Storage;

  private asDoneStatus: boolean;

  private currentTask: number;

  private notificationController: NotificationController;

  private confirmationController: ConfirmationController;

  constructor() {
    this.taskView = new TaskView();
    this.storage = new Storage();
    this.tasks = [];
    this.asDoneStatus = false;
    this.notificationController = new NotificationController();
    this.confirmationController = new ConfirmationController();
    this.currentTask = 0;
  }

  /**
   * Initial for the task module
   */
  init(): void {
    const data = toArray(this.getTasks()) as TaskModel[];

    this.tasks = data;
    this.taskView.bindEventListeners(this);
    this.displayTasks(this.tasks);
    this.getCurrentFilter();
  }

  /**
   * Get current filter via url
   */
  getCurrentFilter(): void {
    const { ALL, ACTIVE, COMPLETED } = CONSTANTS.FILTERS;
    const filterTypes = [ALL, ACTIVE, COMPLETED];
    const filterType = filterTypes.find((item) => document.location.hash.search(item) !== -1);

    this.taskView.setFilterState(filterType);
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
  displayTasks(task: TaskModel[]): void {
    this.taskView.renderTasks(task);

    const baseData = toArray(this.getTasks()) as TaskModel[];

    const taskCompleted = baseData.find((item) => item.status === true);

    if (baseData.length) {
      this.taskView.isShowActionArea(true);
    } else {
      this.taskView.isShowActionArea(false);
    }

    if (!taskCompleted) {
      this.taskView.toggleClearCompletedButton('none');
    } else {
      this.taskView.toggleClearCompletedButton('block');
    }

    this.taskView.displayTaskLeft(baseData);
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
        this.displayTasks(this.tasks);
        this.getCurrentFilter();
        this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, CONSTANTS.MESSAGES.ADD_TASK);

        return true;
      } catch (error) {
        this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, CONSTANTS.MESSAGES.ERROR);

        return false;
      }
    }

    return false;
  }

  /**
   * Handle for show the notification
   * @param type
   * @param content
   */
  handleShowNotification(type: string, content: string): void {
    this.notificationController.displayNotification(type, content);
  }

  /**
   * Handle for remove a task
   * @param taskIs
   */
  removeTask(): boolean {
    this.tasks = this.tasks.filter((item: TaskModel): boolean => item.id !== this.currentTask);
    this.confirmationController.handleHideConfirmation();
    try {
      this.storage.setItem(CONSTANTS.DATABASES.TASKS, JSON.stringify(this.tasks));
      this.displayTasks(this.tasks);
      this.getCurrentFilter();
      this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, CONSTANTS.MESSAGES.REMOVE_TASK);
      return true;
    } catch (error) {
      this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, CONSTANTS.MESSAGES.ERROR);
      return false;
    }
  }

  /**
   * Handle for show the confirmation when remove the task
   * @param taskId
   */
  showConfirmation(taskId: number) {
    this.confirmationController.handleShowConfirmation();
    this.currentTask = taskId;
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
      const checkMessage = `Your action has been executed! A task was ${
        itemData.status ? '' : 'un'
      }checked done successfully.`;
      this.storage.setItem(CONSTANTS.DATABASES.TASKS, JSON.stringify(this.tasks));
      this.displayTasks(this.tasks);
      this.getCurrentFilter();
      this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, checkMessage);

      return true;
    } catch (error) {
      this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, CONSTANTS.MESSAGES.ERROR);

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
      const markAsDoneMessage = `Your action has been executed! All of the tasks are ${
        this.asDoneStatus ? '' : 'un'
      }checked as completed`;
      this.storage.setItem(CONSTANTS.DATABASES.TASKS, JSON.stringify(this.tasks));
      this.displayTasks(this.tasks);
      this.getCurrentFilter();
      this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, markAsDoneMessage);

      return true;
    } catch (error) {
      this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, CONSTANTS.MESSAGES.ERROR);

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
      this.displayTasks(this.tasks);
      this.getCurrentFilter();
      this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, CONSTANTS.MESSAGES.CLEAR_COMPLETED_TASK);

      return true;
    } catch (error) {
      this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, CONSTANTS.MESSAGES.ERROR);

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
    let dataFilter = null;

    switch (filterType) {
      case CONSTANTS.FILTERS.ACTIVE:
        dataFilter = activeTasks;
        this.handleShowNotification(
          CONSTANTS.NOTIFICATIONS.INFORMATION,
          'Your action has been executed! The active tasks are showing.',
        );

        break;

      case CONSTANTS.FILTERS.COMPLETED:
        dataFilter = completedTask;
        this.handleShowNotification(
          CONSTANTS.NOTIFICATIONS.INFORMATION,
          'Your action has been executed! The completed tasks are showing.',
        );

        break;

      default:
        dataFilter = baseData;

        break;
    }

    this.displayTasks(dataFilter);
  }

  /**
   * Update the new data for task
   * @param id
   * @param newData
   */
  updateTask(taskId: number, newData: string): boolean {
    this.asDoneStatus = false;
    const baseData = toArray(this.getTasks()) as TaskModel[];
    const itemData: TaskModel = baseData.find((task) => task.id === taskId);

    itemData.title = newData;
    itemData.updateAt = new Date();

    this.tasks = baseData;

    try {
      this.storage.setItem(CONSTANTS.DATABASES.TASKS, JSON.stringify(this.tasks));
      this.displayTasks(this.tasks);
      this.getCurrentFilter();
      this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, CONSTANTS.MESSAGES.UPDATE_TASK);

      return true;
    } catch (error) {
      this.handleShowNotification(CONSTANTS.NOTIFICATIONS.SUCCESS, CONSTANTS.MESSAGES.ERROR);

      return false;
    }
  }
}
