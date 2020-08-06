import CONSTANTS from '../constants';
import { qs } from '../helpers';

export default class LoadingView {
  private loading: Element;

  private loadingProcessing: Element;

  constructor() {
    this.loading = qs('.loading');
    this.loadingProcessing = qs('.preloader__processing');
  }

  /**
   * Loading display handling
   * @param status The state of loading
   * @param context The display text
   */
  isLoading(status: boolean, context?: string): void {
    if (status) {
      this.loading.classList.remove('d-none');

      if (context) {
        this.loadingProcessing.textContent = context;
      }
    } else {
      setTimeout(() => {
        this.loading.classList.add('d-none');
      }, CONSTANTS.TIME.LOADING_TIMEOUT);
    }
  }

  /**
   * Event handling for loading
   */
  bindEventListeners(controller): LoadingView {
    /**
     * Hide the loading layer when DOM loaded
     */
    window.addEventListener('DOMContentLoaded', () => {
      controller.hideLoading();
    });

    return this;
  }
}
