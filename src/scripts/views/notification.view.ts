import CONSTANTS from '../constants/index';
import { qs } from '../helpers/index';

/**
 * Export this module as default
 */
export default class NotificationView {
  private notification: Element;

  private dismiss: Element;

  private notificationContent: Element;

  private notificationDescription: Element;

  constructor() {
    this.notification = qs('.notification');
    this.dismiss = qs('.dismiss');
    this.notificationContent = qs('.notification__content');
    this.notificationDescription = qs('.notification__description');
  }

  /**
   * Show notification
   */
  showNotification(type, content) {
    const { ERROR, INFORMATION, WARNING, SUCCESS } = CONSTANTS.NOTIFICATIONS;
    const notificationType = [ERROR, INFORMATION, WARNING, SUCCESS];
    const notification = this.notification as HTMLElement;

    /**
     * TODO: Refator for this
     */
    notificationType.forEach((notificationItem) => {
      this.notificationContent.classList.remove(`notification--${notificationItem}`);
    });

    this.notificationContent.classList.add(`notification--${type}`);
    notification.style.display = 'block';
    this.notificationDescription.innerHTML = content;
  }

  /**
   * Hide notification
   */
  hideNotification() {
    this.notification.removeAttribute('style');
    this.notificationDescription.innerHTML = '';
  }

  /**
   * Events handling
   *
   * @param {Object} controller
   */
  bindEventListeners(controller) {
    this.dismiss.addEventListener('click', () => {
      controller.dismissNotication();
    });

    this.notification.addEventListener('mouseenter', () => {
      controller.mouseEnterNotificationState();
    });

    this.notification.addEventListener('mouseleave', () => {
      controller.mouseLeaveNotificationState();
    });
  }
}
