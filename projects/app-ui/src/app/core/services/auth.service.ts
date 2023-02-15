import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { LoginService } from 'projects/app-api/src/api/login.service';
import { LoginCommand } from 'projects/app-api/src/model/loginCommand';
import { LoginResponse } from 'projects/app-api/src/model/loginResponse';

import { User } from '../../shared/models/user';
import { StorageAccessorService } from '../../shared/services/storage/storage-accessor.service';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnDestroy {
	private readonly USER_KEY = 'EZADMIN-Access';
	private tokenExirationTimer: any;

	private isAuthenticated = new BehaviorSubject<boolean>(false);
	isAuthenticated$ = this.isAuthenticated.asObservable();

	private user = new BehaviorSubject<User | null>(null);
	user$ = this.user.asObservable();

	loginSubscription!: Subscription;

	constructor(private router: Router, private storageAccessorService: StorageAccessorService, private loginService: LoginService) {}

	/**
	 * Get Current User
	 */
	public get currentUserValue(): User {
		return this.user.value as User;
	}

	/**
	 * Get Access Token
	 */
	public get token(): string {
		return this.user.value?.token ?? '';
	}

	/**
	 * Automatically check for user existance and update observables
	 */
	autoLogin(): void {
		const userData = this.storageAccessorService.getLocalStorage(this.USER_KEY, true);

		if (!userData) {
			return;
		}

		const loadedUser = new User(userData.name, userData.email, userData._token, new Date(userData._tokenExpirationDate));

		if (loadedUser.token) {
			this.user.next(loadedUser);
			this.isAuthenticated.next(true);
			const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
			this.autoLogout(expirationDuration);
		} else {
			this.logout();
		}
	}

	/**
	 * API post Login
	 * @param command LoginCommand
	 */
	login(command: LoginCommand): Observable<LoginResponse> {
		return this.loginService.apiLoginGet(command);
	}

	/**
	 * Handle Authentication
	 * Set observables and local storage values
	 * @param name string
	 * @param email string
	 * @param token string
	 */
	handleAuthentication(name: string, email: string, token: string) {
		const decodedToken = this.parseToken(token);
		const expirationDate = new Date(new Date().getTime() + decodedToken.exp * 1000);
		console.log(expirationDate);
		const user = new User(name, email, token, expirationDate);
		this.user.next(user);
		this.isAuthenticated.next(true);
		this.autoLogout(decodedToken.exp * 1000);
		this.storageAccessorService.setLocalStorage(this.USER_KEY, user, true);
		// this.router.navigate(['/auth/dashboard']);
	}

	/**
	 * Decode token
	 * @param token
	 * @returns {...,token:any}
	 */
	private parseToken(token: string): any {
		if (token) {
			const decoded = jwt_decode(token) as any;
			const user = { ...decoded, token: token };

			return user;
		}

		return null;
	}

	/**
	 * Set Timeout function to call logout
	 * @param expirationDuration number in ms
	 */
	private autoLogout(expirationDuration: any) {
		this.tokenExirationTimer = setTimeout(() => {
			this.logout();
		}, expirationDuration);
	}

	/**
	 * Perform logout and set observables to null and clear local storage
	 */
	logout(): void {
		this.user.next(null);
		this.isAuthenticated.next(false);
		this.storageAccessorService.removeLocalStorageKey(this.USER_KEY);

		if (this.tokenExirationTimer) {
			clearTimeout(this.tokenExirationTimer);
		}

		this.tokenExirationTimer = null;
		this.router.navigate(['/auth']);
	}

	ngOnDestroy(): void {
		if (this.loginSubscription) {
			this.loginSubscription.unsubscribe();
		}
	}
}
