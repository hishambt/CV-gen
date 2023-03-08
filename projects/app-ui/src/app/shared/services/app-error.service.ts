import { ReplaySubject } from 'rxjs';
import { Injectable } from '@angular/core';

import { ProblemDetails, ValidationProblemDetails } from '../models/problemDetails';

@Injectable({
	providedIn: 'root'
})
export class AppErrorService {
	private notFoundError: ReplaySubject<ProblemDetails> = new ReplaySubject(0);
	public notFoundError$ = this.notFoundError.asObservable();

	private validationError: ReplaySubject<ValidationProblemDetails> = new ReplaySubject(0);
	public validationError$ = this.validationError.asObservable();

	private internalServerError: ReplaySubject<ProblemDetails> = new ReplaySubject(0);
	public internalServerError$ = this.internalServerError.asObservable();

	private notReachableError: ReplaySubject<any> = new ReplaySubject(0);
	public notReachableError$ = this.notReachableError.asObservable();

	/**
	 * Handle http error response
	 * @param httpError any
	 */
	public publishError(httpError: any): void {
		switch (httpError.status) {
			case 404: {
				this.notFoundError.next(httpError as ProblemDetails);
				break;
			}
			case 400: {
				this.validationError.next(httpError.error as ValidationProblemDetails);
				break;
			}
			case 500: {
				this.internalServerError.next(httpError.error as ProblemDetails);
				break;
			}
			case 0: {
				this.notReachableError.next(`Server is not reachable, please try again`);

				break;
			}
		}
	}
}
