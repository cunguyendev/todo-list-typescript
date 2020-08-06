import CONSTANTS from '../constants';
import { qs } from '../helpers';

export default class LoadingView {
  private loading;

  private loadingProcessing;

  constructor() {
    this.loading = qs('.loading');
    this.loadingProcessing = qs('.preloader__processing');
  }

  /**
   * Loading display handling
   * @param status The state of loading
   * @param context
   */
  isLoading(status: boolean, context?: string) {
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

    return this;
  }
}
