import CONSTANTS from '../constants';
import { qs, toNumber } from '../helpers';

export default class TaskView {
  private taskInput: Element;

  private taskContentData: Element;

  private taskcontentActions: Element;

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
      const classes = 'fa fa-times btn btn--remove';
      const actionTitle = 'Remove this task';
      const taskItem = `
      <div class="content__data__item item">
        <button title="Mark as done" class="btn btn--default fa data--${task.status ? 'check' : 'no-check'}"></button>
        <p class="item__title">${task.title}</p>
        <button class="${classes}" data-task-id="${task.id}" data-action="Remove" title="${actionTitle}"></button>
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
    /**
     * Handle for pressing the enter key to submit the data
     */
    this.taskInput.addEventListener('keypress', (e: KeyboardEvent): void => {
      if (e.keyCode === CONSTANTS.KEYCODES.ENTER) {
        const taskInput = e.target as HTMLInputElement;

        const status = controller.addTask(taskInput.value);

        if (status) {
          taskInput.value = '';
          // TODO: Notification handling
        } else {
          // TODO: Notification handling
          console.log('Error');
        }
      }
    });

    /**
     * Handle for actions on content
     */
    this.taskContentData.addEventListener('click', (e: Event) => {
      const targetNode = e.target as HTMLElement;
      const taskId = targetNode.getAttribute('data-task-id');

      controller.removeTask(toNumber(taskId));
    });
  }
}
