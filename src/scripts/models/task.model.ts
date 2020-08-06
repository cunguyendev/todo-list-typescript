interface TaskType {
  id: number;
  title: string;
  createAt: Date;
  updateAt: Date;
  status: boolean;
}

/**
 * Export this module as default
 */
export default class TaskModel implements TaskType {
  id: number;

  title: string;

  createAt: Date;

  updateAt: Date;

  status: boolean;

  constructor(id: number, title: string, createAt: Date, updateAt: Date, status: boolean) {
    this.id = id;
    this.title = title;
    this.createAt = createAt;
    this.updateAt = updateAt;
    this.status = status;
  }

  /**
   * Get the title of task
   */
  getTitle(): string {
    return this.title;
  }

  /**
   * Update the new data for the title
   * @param value Set new data for title
   */
  setTitle(value: string): TaskModel {
    this.title = value;

    return this;
  }

  /**
   * Get the status of task
   */
  getStatus(): boolean {
    return this.status;
  }

  /**
   * Update new status for task
   * @param value new status value
   */
  setStatus(value: boolean): TaskModel {
    this.status = value;

    return this;
  }

  /**
   * Update new data for the update time
   * @param value new update time
   */
  setUpdateAt(value: Date): TaskModel {
    this.updateAt = value;

    return this;
  }
}
