import CONSTANTS from '../constants';
import { qs } from '../helpers';

export default class TaskView {
  private taskInput: Element;

  private tasks;

  constructor() {
    this.taskInput = qs('#task-input');
    this.tasks = [];
  }

  /**
   * Event handling
   * @param controller
   */
  bindEventListeners(controller): void {
    this.taskInput.addEventListener('keypress', (e: KeyboardEvent): void => {
      if (e.keyCode === CONSTANTS.KEYCODES.ENTER) {
        const taskInput = e.target as HTMLInputElement;

        controller.addTask(taskInput.value);
      }
    });
  }
}
