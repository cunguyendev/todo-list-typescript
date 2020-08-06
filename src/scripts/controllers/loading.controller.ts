import LoadingView from '../views/loading.view';

export default class LoadingController {
  private loadingView;

  constructor() {
    this.loadingView = new LoadingView();
  }

  /**
   * Show the loading
   * @param context The text as a notification for the loading
   */
  showLoading(context?: string) {
    this.loadingView.isLoading(true, context);
  }

  /**
   * Hide the loading
   */
  hideLoading() {
    this.loadingView.isLoading(false);
  }

  /**
   * Initial for loading module
   */
  init() {
    this.loadingView.bindEventListeners(this);
  }
}
