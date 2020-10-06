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

  private yesButton: Element;

  constructor() {
    this.taskInput = qs('#task-input');
    this.taskContentData = qs('.content__data');
    this.taskcontentActions = qs('.content__actions');
    this.taskMarkDone = qs('#made-done');
    this.taskTotal = qs('.total-items');
    this.taskClearComplete = qs('.clear-completed');
    this.taskFilter = qs('.tasks__filters');
    this.yesButton = qs('#confirmationYes');
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
      <div data-task-id="${task.id}" class="content__data__item item">
        <button data-action="Mark" data-task-id="${
          task.id
        }" title="${actionMarkTitle}" class="btn btn--default fa data--${taskStatus}"></button>
        <p data-task-id="${task.id}" class="item__title ${task.status && 'checked'}">${task.title}</p>
        <input data-task-id="${task.id}" type="text" value="${task.title}">
        <button class="${classes}" data-task-id="${task.id}" data-action="Remove" title="${actionRemoveTitle}"></button>
      </div>`;

      this.taskContentData.innerHTML += `${taskItem}`;

      return true;
    });
    return this;
  }

  /**
   * Handle filter type is selected
   * @param filterType
   */
  setFilterState(filterType: string): TaskView {
    const { ALL, ACTIVE, COMPLETED } = CONSTANTS.FILTERS;
    const filterTypes = [ALL, ACTIVE, COMPLETED];

    filterTypes.map((item) => {
      const filterInput = qs(`*[data-action = ${item}]`) as HTMLElement;

      if (item === filterType) {
        filterInput.classList.add('selected');
      } else {
        filterInput.classList.remove('selected');
      }

      if (document.location.hash === '#/') {
        const filterAll = qs(`*[data-action = ${CONSTANTS.FILTERS.ALL}]`) as HTMLElement;

        filterAll.classList.add('selected');
      }

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
      if (e.key === CONSTANTS.KEYNAME.ENTER) {
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
        controller.showConfirmation(toNumber(taskId));
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

      this.setFilterState(filterType);
      controller.filterBy(filterType);
    });

    /**
     * Handle dblclick for editing the task
     */
    this.taskContentData.addEventListener('dblclick', (e: Event) => {
      const targetNode = e.target as HTMLElement;
      const taskId = targetNode.getAttribute('data-task-id');
      const taskInputEdit = qs(`input[data-task-id="${taskId}"]`) as HTMLElement;

      taskInputEdit.classList.add('edit');
      taskInputEdit.focus();

      taskInputEdit.addEventListener('keypress', (evemt: KeyboardEvent): void => {
        if (evemt.key === CONSTANTS.KEYNAME.ENTER) {
          const taskInputEditData = taskInputEdit as HTMLInputElement;

          controller.updateTask(toNumber(taskId), taskInputEditData.value);
        }
      });

      taskInputEdit.addEventListener('focusout', () => {
        taskInputEdit.classList.remove('edit');
      });
    });

    this.yesButton.addEventListener('click', (): void => {
      controller.removeTask();
    });
  }
}
