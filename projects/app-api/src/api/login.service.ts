/**
 * Taxi Operator - WebAPI
 * Developed by Elias Sharbim July 2022
 * version: v1
 * */

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';

import { BASE_PATH } from '../variables';
import { LoginCommand } from '../model/loginCommand';
import { LoginResponse } from '../model/loginResponse';

@Injectable()
export class LoginService {
	protected basePath = '/';
	public defaultHeaders = new HttpHeaders();

	constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string) {
		if (basePath) {
			this.basePath = basePath;
		}
	}

	/**
	 * Login Post
	 * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
	 * @returns LoginResponse
	 */
	public apiLoginPost(body?: LoginCommand, observe?: 'body'): Observable<LoginResponse> {
		return this.httpClient.request<LoginResponse>('post', `${this.basePath}/login`, {
			body: body,
			headers: this.defaultHeaders,
			observe: observe
		});
	}

	/**
	 * Only for mock example
	 * @param body
	 * @param observe
	 * @returns
	 */
	public apiLoginGet(body?: LoginCommand, observe?: 'body'): Observable<LoginResponse> {
		return this.httpClient.request<LoginResponse>('get', `${this.basePath}/login.json`, {
			headers: this.defaultHeaders,
			observe: observe
		});
	}
}
