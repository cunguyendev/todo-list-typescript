import ConfirmationView from '../views/confirmation.view';

export default class ConfirmationController {
  private confirmationView: ConfirmationView;

  constructor() {
    this.confirmationView = new ConfirmationView();
  }

  init() {
    this.confirmationView.bindEventListeners(this);
  }

  /**
   * Show the confirmation
   */
  handleShowConfirmation() {
    this.confirmationView.showTheConfirmation();
  }

  /**
   * Hide the confirmation
   */
  handleHideConfirmation() {
    this.confirmationView.hideTheConfirmation();
  }
}
