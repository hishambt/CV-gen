import { Component, OnDestroy, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { AppErrorService } from '../services/app-error.service';

@Component({
	template: ''
})
export abstract class BaseComponent implements OnInit, OnDestroy {
	destroyed$ = new Subject();

	notFoundErrorSubscription!: Subscription;
	internalServerErrorSubscription!: Subscription;
	notReachableErrorSubscription!: Subscription;
	validationErrorSubscription!: Subscription;
	userAuthenticatedSubscription!: Subscription;

	isLoading = false;
	isWaiting = false;
	isAuthenticated = false;
	isOnline = true;
	errorMessage = '';

	validationErrorMessages: ValidationErrors[] = [];
	private sendValidationErrors = new Subject<ValidationErrors[]>();
	sendValidationErrors$ = this.sendValidationErrors.asObservable();

	constructor(protected errorService: AppErrorService, protected authService: AuthService) {
		this.notFoundErrorSubscription = this.errorService.notFoundError$.subscribe((problemDetails) => {
			this.isWaiting = false;
			this.errorMessage = problemDetails?.error;
			this.isLoading = true;
		});

		this.internalServerErrorSubscription = this.errorService.internalServerError$.subscribe((problemDetails) => {
			this.isWaiting = false;
			this.errorMessage = problemDetails?.title;
			this.isLoading = true;
		});

		this.notReachableErrorSubscription = this.errorService.notReachableError$.subscribe((errorMessage) => {
			this.isWaiting = false;
			this.errorMessage = errorMessage;
			this.isLoading = true;
		});

		this.validationErrorSubscription = this.errorService.validationError$.subscribe((validationProblemDetails) => {
			this.isWaiting = false;

			if (!validationProblemDetails?.errors) {
				return;
			}

			Object.entries(validationProblemDetails?.errors).forEach(([key, value]) => {
				const validationError: ValidationErrors = {
					key: key,
					value: value
				};
				this.validationErrorMessages.push(validationError);
			});

			this.sendValidationErrors.next(this.validationErrorMessages);
		});

		this.userAuthenticatedSubscription = this.authService.isAuthenticated$.subscribe((res) => {
			this.isAuthenticated = res;
		});

		// this.errorService.notFoundError$.pipe(
		// 	tap((problemDetails) => {
		// 		this.isWaiting = false;
		// 		this.errorMessage = problemDetails?.title;
		// 		this.isLoading = true;
		// 	}),
		// 	takeUntil(this.destroyed)
		// );

		// this.errorService.internalServerError$.pipe(
		// 	tap((problemDetails) => {
		// 		this.isWaiting = false;
		// 		this.errorMessage = problemDetails?.title;
		// 		this.isLoading = true;
		// 	}),
		// 	takeUntil(this.destroyed)
		// );

		// this.errorService.notReachableError$.pipe(
		// 	tap((errorMessage) => {
		// 		this.isWaiting = false;
		// 		this.errorMessage = errorMessage;
		// 		this.isLoading = true;
		// 	}),
		// 	takeUntil(this.destroyed)
		// );

		this.errorService.validationError$.pipe(takeUntil(this.destroyed$)).subscribe((validationProblemDetails) => {
			this.isWaiting = false;

			if (!validationProblemDetails?.errors) {
				return;
			}

			Object.entries(validationProblemDetails.errors).forEach(([key, value]) => {
				const validationError: ValidationErrors = {
					key,
					value
				};
				this.validationErrorMessages.push(validationError);
			});

			this.sendValidationErrors.next(this.validationErrorMessages);
		});

		this.authService.isAuthenticated$.pipe(takeUntil(this.destroyed$)).subscribe((res) => {
			this.isAuthenticated = res;
		});
	}

	ngOnInit(): void {
		this.clearErrorMessage();
		this.clearValidationErrorMessages();
		this.checkConnection();
	}

	public clearErrorMessage() {
		this.errorMessage = '';
	}

	public clearValidationErrorMessages() {
		this.validationErrorMessages = [];
	}

	private checkConnection() {
		this.isOnline = navigator.onLine;
		window.addEventListener('online', () => {
			this.isOnline = true;
		});

		window.addEventListener('offline', () => {
			this.isOnline = false;
		});
	}

	ngOnDestroy(): void {
		this.destroyed$.next(true);
		this.destroyed$.complete();

		if (this.notFoundErrorSubscription) {
			this.notFoundErrorSubscription.unsubscribe();
		}

		if (this.internalServerErrorSubscription) {
			this.internalServerErrorSubscription.unsubscribe();
		}

		if (this.notReachableErrorSubscription) {
			this.notReachableErrorSubscription.unsubscribe();
		}

		if (this.validationErrorSubscription) {
			this.validationErrorSubscription.unsubscribe();
		}

		if (this.sendValidationErrors) {
			this.sendValidationErrors.unsubscribe();
		}

		if (this.userAuthenticatedSubscription) {
			this.userAuthenticatedSubscription.unsubscribe();
		}
	}
}
