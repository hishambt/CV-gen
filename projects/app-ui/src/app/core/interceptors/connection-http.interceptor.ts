import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { throwError, Observable, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';

@Injectable()
export class ConnectionHttpInterceptor implements HttpInterceptor {
	private connectionStatus$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

	constructor() {
		//this.checkConnection();
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(request).pipe(
			catchError((error) => {
				console.log('connection issue');

				if (error.status === 504) {
					this.connectionStatus$.next(false);

					return throwError(() => error);
				} else {
					return throwError(() => error);
				}
			}),
			filter((event) => event.type === HttpEventType.Response),
			catchError((error) => {
				return throwError(() => error);
			}),
			switchMap((event) => {
				return this.retryPendingRequests(request, next);
			})
		);
	}

	private checkConnection() {
		window.addEventListener('online', () => {
			this.connectionStatus$.next(true);
		});

		window.addEventListener('offline', () => {
			this.connectionStatus$.next(false);
		});
	}

	private retryPendingRequests(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return this.connectionStatus$.pipe(
			filter((isConnected) => isConnected),
			take(1),
			switchMap(() => {
				return next.handle(request);
			})
		);
	}
}
