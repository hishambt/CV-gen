import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { StorageHelper } from '../helpers/data-storage-helper';

@Injectable({ providedIn: 'root' })
export class StorageService {

    private storageHelper: StorageHelper = new StorageHelper();

    constructor(@Inject(PLATFORM_ID) private platformId: object) {

    }

    /**
     * Set local storage by key
     * @param key string    
     * @param data any 
     * @param stringifyJSON boolean
     */
    setLocalStorage(key: string, data: any, stringifyJSON = false): void {
        if (isPlatformBrowser(this.platformId)) {
            this.storageHelper.set(key, data, stringifyJSON);
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
            return this.storageHelper.get(key, stringifyJSON);
        }
    }

    /**
     * Remove local storage record by key
     * @param key string
     */
    removeLocalStorageKey(key: string): void {
        if (isPlatformBrowser(this.platformId)) {
            this.storageHelper.remove(key);
        }
    }

}
