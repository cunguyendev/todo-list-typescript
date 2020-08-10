import NotificationView from '../views/notification.view';

/**
 * Export this module as default
 */
export default class NotificationController {
  private notificationView: NotificationView;

  private notificationTick;

  private notificationTimeout: number;

  constructor() {
    this.notificationView = new NotificationView();
    this.notificationTick = null;
    this.notificationTimeout = 7;
  }

  /**
   * Initial the Notification Controller
   */
  init() {
    this.notificationView.bindEventListeners(this);
  }

  /**
   * Display the notification
   *
   * @param {String} type
   * @param {String} content
   */
  displayNotification(type, content) {
    this.notificationView.showNotification(type, content);
    this.resetNotificationState();
    this.dismissTimeout();
  }

  /**
   * Dismiss the notification
   */
  dismissNotication() {
    this.notificationView.hideNotification();
    this.resetNotificationState();
  }

  /**
   * Handle for dimiss notification after time
   */
  dismissTimeout() {
    this.notificationTimeout = 7;
    this.notificationTick = setInterval(() => {
      this.notificationTimeout -= 1;

      if (this.notificationTimeout <= 0) {
        this.notificationTimeout = 7;
        this.dismissNotication();
      }
    }, 1000);

    return this;
  }

  /**
   * Handle the notification when mouse enter
   */
  mouseEnterNotificationState() {
    this.resetNotificationState();
  }

  /**
   * Handle the notification when mouse leave
   */
  mouseLeaveNotificationState() {
    this.resetNotificationState();
    this.dismissTimeout();
  }

  /**
   * Reset notification data as default
   */
  resetNotificationState() {
    clearInterval(this.notificationTick);
    this.notificationTick = null;
    this.notificationTimeout = 7;
  }
}
