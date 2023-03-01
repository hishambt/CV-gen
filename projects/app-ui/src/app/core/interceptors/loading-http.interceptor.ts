import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AppSettingsService } from '../../shared/services/app-settings.service';

@Injectable()
export class LoadingHttpInterceptorService {
	activeRequests: number = 0;

	constructor(private appSettingsService: AppSettingsService) {}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.activeRequests === 0) {
			this.appSettingsService.toggleIsLoading(true);
		}

		this.activeRequests++;

		return next.handle(request).pipe(
			finalize(() => {
				this.activeRequests--;

				if (this.activeRequests === 0) {
					this.appSettingsService.toggleIsLoading(false);
				}
			})
		);
	}
}
