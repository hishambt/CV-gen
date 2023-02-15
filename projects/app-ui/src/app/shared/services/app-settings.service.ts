import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

/**
 * Service Class handling App Configuration Settings
 */
export class AppSettingsService {
	private isDrawerOpened = new BehaviorSubject<boolean>(false);
	isDrawerOpened$ = this.isDrawerOpened.asObservable();

	constructor() {}

	/**
	 * Retruns redirect/current url
	 * @returns URL string
	 */
	getUrlRoute(): string {
		return window.location.href;
	}

	getRouteParam(url: string): any {
		const mUrl = new URL(url);
		const path = mUrl.pathname;
		const routeElements = path
			.split('/')
			.filter(Boolean)
			.map((segment) => {
				return segment;
			});

		return routeElements;
	}
}
