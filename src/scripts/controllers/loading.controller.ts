import LoadingView from '../views/loading.view';

export default class LoadingController {
  private loadingView: LoadingView;

  constructor() {
    this.loadingView = new LoadingView();
  }

  /**
   * Show the loading
   * @param context The text as a notification for the loading
   */
  showLoading(context?: string): void {
    this.loadingView.isLoading(true, context);
  }

  /**
   * Hide the loading
   */
  hideLoading(): void {
    this.loadingView.isLoading(false);
  }

  /**
   * Initial for loading module
   */
  init(): void {
    this.loadingView.bindEventListeners(this);
  }
}
