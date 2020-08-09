import CONSTANTS from '../constants/index';
import { qs, toNumber } from '../helpers/index';

export default class TaskView {
  private taskInput: Element;

  private taskContentData: Element;

  private taskcontentActions: Element;

  private taskMarkDone: Element;

  private taskTotal: Element;

  private taskClearComplete: Element;

  private taskFilter: Element;

  constructor() {
    this.taskInput = qs('#task-input');
    this.taskContentData = qs('.content__data');
    this.taskcontentActions = qs('.content__actions');
    this.taskMarkDone = qs('#made-done');
    this.taskTotal = qs('.total-items');
    this.taskClearComplete = qs('.clear-completed');
    this.taskFilter = qs('.tasks__filters');
  }

  /**
   * Get the task left
   * @param tasks
   */
  displayTaskLeft(tasks): void {
    const tasksLeft = tasks.filter((item): boolean => item.status !== true).length;

    this.taskTotal.textContent = `${tasksLeft} item${tasksLeft > 1 ? 's' : ''} left`;
  }

  /**
   * Turn off the completed button
   */
  toggleClearCompletedButton(state: string): void {
    const taskClearComplete = this.taskClearComplete as HTMLElement;

    taskClearComplete.style.display = `${state}`;
  }

  /**
   * Handle for show action area
   * @param state
   */
  isShowActionArea(state: boolean): void {
    const actionsArea = this.taskcontentActions as HTMLLIElement;

    if (state) {
      actionsArea.style.display = 'flex';
    } else {
      actionsArea.style.display = 'none';
    }
  }

  /**
   * Render all of tasks to UI
   */
  renderTasks(tasks): TaskView {
    this.taskContentData.innerHTML = '';

    tasks.map((task: Record<string, unknown>) => {
      const classes = 'fa fa-times btn btn--remove';
      const actionRemoveTitle = 'Remove this task';
      const actionMarkTitle = 'Mark as done';
      const taskStatus = task.status ? 'check' : 'no-check';
      const taskItem = `
      <div class="content__data__item item">
        <button data-action="Mark" data-task-id="${
          task.id
        }" title="${actionMarkTitle}" class="btn btn--default fa data--${taskStatus}"></button>
        <p class="item__title ${task.status && 'checked'}">${task.title}</p>
        <button class="${classes}" data-task-id="${task.id}" data-action="Remove" title="${actionRemoveTitle}"></button>
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
          // console.log('Error');
        }
      }
    });

    /**
     * Handle for actions on content
     */
    this.taskContentData.addEventListener('click', (e: Event) => {
      const targetNode = e.target as HTMLElement;
      const taskId = targetNode.getAttribute('data-task-id');
      const action = targetNode.getAttribute('data-action');

      if (action === CONSTANTS.ACTIONS.REMOVE) {
        controller.removeTask(toNumber(taskId));
      }

      if (action === CONSTANTS.ACTIONS.MARK) {
        controller.checkTask(toNumber(taskId));
      }
    });

    /**
     * Handle for mark done for all of tasks
     */
    this.taskMarkDone.addEventListener('click', () => {
      controller.markAsDone();
    });

    /**
     * Handle for clear all of task have completed
     */
    this.taskClearComplete.addEventListener('click', () => {
      controller.clearTaskCompleted();
    });

    /**
     * Handle for filter tasks
     */
    window.addEventListener('hashchange', () => {
      const { ALL, ACTIVE, COMPLETED } = CONSTANTS.FILTERS;
      const filterTypes = [ALL, ACTIVE, COMPLETED];
      const filterType = filterTypes.find((item) => document.location.hash.search(item) !== -1);

      controller.filterBy(filterType);
    });
  }
}
