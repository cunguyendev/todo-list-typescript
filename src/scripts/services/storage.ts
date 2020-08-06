/* eslint-disable class-methods-use-this */
/**
 * Export this module as default
 */
export default class Storage {
  /**
   * Get data from localstorage
   * @param key
   */
  getItem(key) {
    return localStorage.getItem(key);
  }

  /**
   * Set data to localstorage
   * @param key
   * @param value
   */
  setItem(key, value) {
    localStorage.setItem(key, value);
  }
}
