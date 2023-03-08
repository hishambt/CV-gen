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
export class OrderService {
	protected basePath = '/';
	public defaultHeaders = new HttpHeaders();

	constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	/**
	 * Get Order by Id
	 * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
	 * @returns Order
	 */
	public apiOrderIdGet(id: string, observe?: 'body'): Observable<any> {
		return this.httpClient.request<any>('get', `${this.basePath}/Order/getItem?id=${encodeURIComponent(String(id))}`, {
			headers: this.defaultHeaders,
			observe: observe
		});
	}

	/**
	 * Get Order by Id
	 * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
	 * @returns Order
	 */
	public apiOrdersGet(observe?: 'body'): Observable<any> {
		return this.httpClient.request<any>('get', `${this.basePath}/Order/Get?WarehouseId=null&pageNumber=1&countPerPage=100&orderBy=Id&sort=desc`, {
			headers: this.defaultHeaders,
			observe: observe
		});
	}
}
