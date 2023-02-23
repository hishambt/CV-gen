import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'projects/app-ui/src/environments/environment';
import { BehaviorSubject, catchError, concatMap, filter, finalize, Observable, take, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	isRefreshingToken = false;
	private requests: HttpRequest<any>[] = [];
	tokenRefreshed$ = new BehaviorSubject<boolean>(false);

	constructor(private authService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.requests.push(req);
		//this.loaderService.isLoading.next(true);

		return next.handle(this.addToken(req)).pipe(
			catchError((err) => {
				if (err.status === 401) {
					return this.handle401Error(req, next);
				} else if (err.status === 400) {
					if (req.url.includes(environment.adminApi + 'token')) {
						this.authService.logout();
					} else if (!environment.production) {
						console.log('Bad Request');
					}
				}

				return throwError(() => err);
			}),
			finalize(() => this.removeRequest(req))
		);
	}

	private addToken(request: HttpRequest<any>): HttpRequest<any> {
		let token = null;

		if (request.url.includes(environment.adminApi)) {
			token = this.authService.token;
		} else {
			token = 0; // TODO: Add customer token
		}

		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`,
					'Cache-Control': 'no-cache',
					Pragma: 'no-cache'
				}
			});
		}

		return request;
	}

	private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		if (this.isRefreshingToken) {
			return this.tokenRefreshed$.pipe(
				filter(Boolean),
				take(1),
				concatMap(() => next.handle(this.addToken(req)))
			);
		}

		this.isRefreshingToken = true;
		// Reset here so that the following requests wait until the token
		// comes back from the refreshToken call.
		this.tokenRefreshed$.next(false);

		return this.authService.refreshToken().pipe(
			concatMap((res) => {
				// this._storageService.setOtpCreds(res);

				const user = this.authService.currentUserValue;

				if (!environment.production) {
					console.info('Token was successfully refreshed');
				}

				this.tokenRefreshed$.next(true);

				return next.handle(this.addToken(req));
			}),
			catchError((err) => {
				this.authService.logout();

				return throwError(() => err);
			}),
			finalize(() => {
				this.isRefreshingToken = false;
			})
		);
	}

	private removeRequest(req: HttpRequest<any>) {
		const i = this.requests.indexOf(req);

		if (i >= 0) {
			this.requests.splice(i, 1);
		}

		// this.loaderService.isLoading.next(this.requests.length > 0);
	}
}
