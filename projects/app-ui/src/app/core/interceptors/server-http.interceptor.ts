import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, concatMap, filter, finalize, take } from 'rxjs/operators';
import { environment } from 'projects/app-ui/src/environments/environment';

import { AuthService } from '../services/auth.service';

@Injectable()
export class ServerHttpInterceptor implements HttpInterceptor {
	isRefreshingToken = false;
	tokenRefreshed$ = new BehaviorSubject<boolean>(false);

	constructor(private authService: AuthService) {}

	addToken(req: HttpRequest<any>): HttpRequest<any> {
		const token = this.authService.token;

		return token ? req.clone({ setHeaders: { Authorization: 'Bearer ' + token } }) : req;
	}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(this.addToken(req)).pipe(
			catchError((err: HttpErrorResponse) => {
				if (err.status === 401) {
					return this.handle401Error(req, next);
				}

				return throwError(() => err);
			})
		);
	}

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
