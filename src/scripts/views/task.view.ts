import CONSTANTS from '../constants';
import { qs } from '../helpers';

export default class TaskView {
  private taskInput: Element;

  private taskContentData: Element;

  private taskcontentActions: HTMElement;

  constructor() {
    this.taskInput = qs('#task-input');
    this.taskContentData = qs('.content__data');
    this.taskcontentActions = qs('.content__actions');
  }

  /**
   * Render all of tasks to UI
   */
  renderTasks(tasks): TaskView {
    this.taskContentData.innerHTML = '';
    const actionsArea = this.taskcontentActions as HTMLLIElement;

    if (!tasks.length) {
      actionsArea.style.display = 'none';
    } else {
      actionsArea.style.display = 'flex';
    }

    tasks.map((task: Record<string, unknown>) => {
      const taskItem = `
      <div class="content__data__item item">
        <button title="Mark as done" class="btn btn--default fa data--${task.status ? 'check' : 'no-check'}"></button>
        <p class="item__title">${task.title}</p>
      </div>`;

      this.taskContentData.innerHTML += `${taskItem}`;

      return true;
    });
    return this;
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
