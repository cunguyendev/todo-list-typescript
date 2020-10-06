import ConfirmationView from '../views/confirmation.view';

export default class ConfirmationController {
  private confirmationView: ConfirmationView;

  constructor() {
    this.confirmationView = new ConfirmationView();
  }

  init() {
    this.confirmationView.bindEventListeners(this);
  }

  handleShowConfirmation() {
    this.confirmationView.showTheConfirmation();
  }

  handleHideConfirmation() {
    this.confirmationView.hideTheConfirmation();
  }

  handleActionConfirmed() {
    console.log('yesss');

    return this;
  }
}
