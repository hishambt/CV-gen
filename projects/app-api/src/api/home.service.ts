/**
 * Taxi Operator - WebAPI
 * Developed by Elias Sharbim July 2022
 * version: v1
 * */

import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { filter, Observable } from 'rxjs';

import { BASE_PATH } from '../variables';

@Injectable()
export class HomeService {
	protected basePath = '/';
	public defaultHeaders = new HttpHeaders();

	constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	/**
	 * Get Customer by Id
	 * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
	 * @returns Customer
	 */
	public apiLastestOrdersGet(size: number, observe?: 'body'): Observable<any> {
		return this.httpClient.request<any>('get', `${this.basePath}/v2/Dashboard/Report/LatestOrders/${encodeURIComponent(String(size))}`, {
			headers: this.defaultHeaders,
			observe: observe
		});
	}
}
