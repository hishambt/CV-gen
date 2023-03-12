import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, concatMap, filter, finalize, take } from 'rxjs/operators';
import { environment } from 'projects/app-ui/src/environments/environment';

import { AuthService } from '../services/auth.service';
import { AppSettingsService } from '../../shared/services/app-settings.service';
import { AppErrorService } from '../../shared/services/app-error.service';

@Injectable()
export class ServerHttpInterceptor implements HttpInterceptor {
	isRefreshingToken = false;
	isConnectionOK = true;
	tokenRefreshed$ = new BehaviorSubject<boolean>(false);
	connectionRestarted$ = new BehaviorSubject<boolean>(false);

	constructor(private appErrorService: AppErrorService, private authService: AuthService, private appSettingsService: AppSettingsService) {
		this.appSettingsService.connectionStatus$.subscribe((res) => {
			if (res) {
				this.isConnectionOK = res;
				this.connectionRestarted$.next(res);
			}
		});
	}

	addToken(req: HttpRequest<any>): HttpRequest<any> {
		const token = this.authService.token;

		return token
			? req.clone({ setHeaders: { Authorization: 'Bearer ' + token, language: 'en', 'Accept-Language': 'en-US,en;', client: 'platform' } })
			: req;
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log(this.isConnectionOK);

		return next.handle(this.addToken(req)).pipe(
			catchError((err: HttpErrorResponse) => {
				console.log('connection issue');

				// handle refresh token
				if (err.status === 401) {
					return this.handle401Error(req, next);
				}

				// handle offline
				if (err.status === 504) {
					return this.handle504Error(req, next);
				}

				// TODO: handle error service
				// this.appErrorService.publishError(err);

				return throwError(() => err);
			})
		);
	}

	/**
	 * Handle when caching fails to get the api
	 * @param req
	 * @param next
	 * @returns
	 */
	private handle504Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		if (this.isConnectionOK) {
			this.isConnectionOK = false;
			this.appSettingsService.toggleConnectionStatus(false);
			this.connectionRestarted$.next(false);
			this.tokenRefreshed$.next(false);
		}

		return this.connectionRestarted$.pipe(
			filter(Boolean),
			take(1),
			concatMap(() => next.handle(this.addToken(req)))
		);
	}

	/**
	 * Handle when token fails
	 * @param req
	 * @param next
	 * @returns
	 */
	private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		if (this.isRefreshingToken) {
			// Wait untile tokenRefreshed$ get true value
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

		return this.authService.getRefreshToken().pipe(
			concatMap((res: any) => {
				if (!environment.production) {
					// tslint:disable-line
					console.info('Token was successfully refreshed');
				}

				// handle refresh token
				this.authService.updateAccessToken(res);
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
}
