import { qs } from '../helpers/index';

export default class ConfirmationView {
  private confirmation: Element;

  private cancelButton: Element;

  constructor() {
    this.confirmation = qs('.confirmation');
    this.cancelButton = qs('#confirmationCancel');
  }

  hideTheConfirmation() {
    this.confirmation.classList.add('d-none');
    this.confirmation.classList.remove('d-flex');
  }

  showTheConfirmation() {
    this.confirmation.classList.remove('d-none');
    this.confirmation.classList.add('d-flex');
  }

  bindEventListeners(controller) {
    this.cancelButton.addEventListener('click', (): void => {
      controller.handleHideConfirmation();
    });
  }
}
