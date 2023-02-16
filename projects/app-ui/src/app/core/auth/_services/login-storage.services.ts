import { Injectable } from '@angular/core';

import { StorageAccessorService } from '../../../shared/services/storage/storage-accessor.service';
import { Store } from '../_models/stores';

@Injectable()
export class LoginStorageService {
	private readonly LOGGED_IN_STORES_KEY = 'recentlyLoggedIn';

	constructor(private storageAccessorService: StorageAccessorService) {}

	gemoveAllEntriesFromRecentlyLoggedIn() {
		return this.storageAccessorService.getLocalStorage(this.LOGGED_IN_STORES_KEY, true);
	}

	removeEntryfromRecentlyLoggedIn(store: Store) {
		let list = this.storageAccessorService.getLocalStorage(this.LOGGED_IN_STORES_KEY, true);

		list = list.filter((item: any) => {
			return JSON.stringify(item) != JSON.stringify(store);
		});

		this.storageAccessorService.setLocalStorage(this.LOGGED_IN_STORES_KEY, list, true);
	}

	removeAllEntriesFromRecentlyLoggedIn() {
		this.storageAccessorService.removeLocalStorageKey(this.LOGGED_IN_STORES_KEY);
	}

	addToRecentlyLoggedIn(store: Store) {
		if (store.storeName && store.emailAddress) {
			let list = this.storageAccessorService.getLocalStorage(this.LOGGED_IN_STORES_KEY, true) ?? [];
			let index: number = list.findIndex((item: any) => item.storeName === store.storeName && item.emailAddress === store.emailAddress);

			if (index == -1) {
				list.push(store);
			} else {
				list[index] = store;
			}

			this.storageAccessorService.setLocalStorage(this.LOGGED_IN_STORES_KEY, list, true);
		}
	}
}
