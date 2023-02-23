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

	public login(body: LoginCommand, observe?: 'body'): Observable<any> {
		let bodyParams =
			'username=' +
			body.email +
			'&password=' +
			body.password +
			'&store_name=' +
			body.name +
			'&grant_type=password&remember_me=' +
			body.rememberMe;

		let config;

		config = {
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		};

		return this.httpClient.post(`${this.basePath}/token`, bodyParams, config);
	}

	public refreshToken(refreshToken: string, observe?: 'body'): Observable<any> {
		let bodyParams = 'refresh_token=' + refreshToken + '&grant_type=refresh_token&remember_me=false';

		let config;

		config = {
			headers: {
				'content-type': 'application/x-www-form-urlencoded'
			}
		};

		return this.httpClient.post(`${this.basePath}/token`, bodyParams, config);
	}

	public getLoginInfo(body?: any, observe?: 'body'): Observable<any> {
		return this.httpClient.request<LoginResponse>('get', `${this.basePath}/Account/AuthenticationInfo`, {
			headers: this.defaultHeaders,
			observe: observe
		});
	}
}
