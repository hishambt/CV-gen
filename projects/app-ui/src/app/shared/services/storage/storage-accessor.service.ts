import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { StorageHelper } from '../../helpers/data-storage-helper';
import { CookieHelper } from '../../helpers/data-cookie-helper';

/**
 * This service is the only data storage accessor available in the solution
 * No direct Feature access to this service
 *
 * @description
 */
@Injectable({ providedIn: 'root' })
export class StorageAccessorService {
	private storageHelper: StorageHelper = new StorageHelper();
	private cookieHelper: CookieHelper = new CookieHelper();
	private hasLocalStorage: boolean = false;

	constructor(@Inject(PLATFORM_ID) private platformId: object) {
		this.hasLocalStorage = this.isLocalStorageAvailable();
	}

	/**
	 * Set local storage by key
	 * @param key string
	 * @param data any
	 * @param stringifyJSON boolean
	 */
	setLocalStorage(key: string, data: any, stringifyJSON = false): void {
		if (isPlatformBrowser(this.platformId)) {
			if (this.hasLocalStorage) {
				this.storageHelper.set(key, data, stringifyJSON);
			} else {
				this.cookieHelper.setCookie(key, data);
			}
		}
	}

	/**
	 * Get local storage value/data by key
	 * @param key string
	 * @param stringifyJSON boolean
	 * @returns json|value
	 */
	getLocalStorage(key: string, stringifyJSON = false): any {
		if (isPlatformBrowser(this.platformId)) {
			if (this.hasLocalStorage) {
				return this.storageHelper.get(key, stringifyJSON);
			} else {
				return this.cookieHelper.getCookie(key);
			}
		}
	}

	/**
	 * Remove local storage record by key
	 * @param key string
	 */
	removeLocalStorageKey(key: string): void {
		if (isPlatformBrowser(this.platformId)) {
			if (this.hasLocalStorage) {
				this.storageHelper.remove(key);
			} else {
				this.cookieHelper.deleteCookie(key);
			}
		}
	}

	/**
	 * Check if lists are existing in local storage
	 * @returns Boolean
	 */
	checkExistance(key: string) {
		if (isPlatformBrowser(this.platformId)) {
			if (this.hasLocalStorage) {
				return this.storageHelper.check(key);
			} else {
				return this.cookieHelper.check(key);
			}
		}

		return false;
	}

	private isLocalStorageAvailable() {
		let test = 'test';

		if (isPlatformBrowser(this.platformId)) {
			try {
				localStorage.setItem(test, test);
				localStorage.removeItem(test);

				return true;
			} catch (e) {
				return false;
			}
		}

		return false;
	}
}
