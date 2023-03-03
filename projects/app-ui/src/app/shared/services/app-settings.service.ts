import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

/**
 * Service Class handling App Configuration Settings
 */
export class AppSettingsService {
	private isDrawerOpened = new BehaviorSubject<boolean>(false);
	isDrawerOpened$ = this.isDrawerOpened.asObservable();

	private isAppLoading = new BehaviorSubject<boolean>(false);
	isAppLoading$ = this.isAppLoading.asObservable();

	private connectionStatus = new Subject<boolean>();
	connectionStatus$ = this.connectionStatus.asObservable();

	constructor(private httpClient: HttpClient) {}

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

	toggleIsLoading(isLoading: boolean) {
		this.isAppLoading.next(isLoading);
	}

	toggleConnectionStatus(isConnected: boolean) {
		this.connectionStatus.next(isConnected);

		if (!isConnected) {
			this.initWebWorker();
		}
	}

	initWebWorker() {
		console.log('initWebWorker');

		if (typeof Worker !== 'undefined') {
			// Create a new
			const worker = new Worker(new URL('./app-settings.worker', import.meta.url));

			worker.addEventListener('message', ({ data }) => {
				this.update(data);
			});

			worker.postMessage('start');
			// Create a new
		} else {
			// Web Workers are not supported in this environment.
			// You should add a fallback so that your program still executes correctly.
		}
	}

	update(data: any) {
		if (data == 'stop') {
			this.toggleConnectionStatus(true);
		}
	}
}
