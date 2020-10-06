import { qs } from '../helpers/index';

export default class ConfirmationView {
  private confirmation: Element;

  private cancelButton: Element;

  constructor() {
    this.confirmation = qs('.confirmation');
    this.cancelButton = qs('#confirmationCancel');
  }

  /**
   * Handle for hide the confirmation
   */
  hideTheConfirmation() {
    this.confirmation.classList.add('d-none');
    this.confirmation.classList.remove('d-flex');
  }

  /**
   * Handle for show the confirmation
   */
  showTheConfirmation() {
    this.confirmation.classList.remove('d-none');
    this.confirmation.classList.add('d-flex');
  }

  /**
   * Bind all of events related to the confirmation
   * @param controller
   */
  bindEventListeners(controller) {
    this.cancelButton.addEventListener('click', (): void => {
      controller.handleHideConfirmation();
    });
  }
}
