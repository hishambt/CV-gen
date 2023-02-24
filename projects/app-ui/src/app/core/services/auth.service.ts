import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { LoginService } from 'projects/app-api/src/api/login.service';
import { LoginCommand } from 'projects/app-api/src/model/loginCommand';
import { LoginEResponse, LoginResponse } from 'projects/app-api/src/model/loginResponse';

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
	 * Get Refresh Token
	 */
	public get refreshToken(): string {
		return this.user.value?.refreshToken ?? '';
	}

	/**
	 * Automatically check for user existance and update observables
	 */
	autoLogin(): void {
		const userData: User = this.storageAccessorService.getLocalStorage(this.USER_KEY, true);

		if (!userData) {
			return;
		}

		// const loadedUser = new User(userData.name, userData.email, userData._token, new Date(userData._tokenExpirationDate));
		const loadedUser: User = userData;

		if (loadedUser.token) {
			this.user.next(loadedUser);
			this.isAuthenticated.next(true);
			const expirationDuration = new Date(userData.expirationDate).getTime() - new Date().getTime();
			//this.autoLogout(expirationDuration);
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
	 * API post loginLegacy
	 * @param command LoginCommand
	 */
	loginLegacy(command: LoginCommand): Observable<LoginEResponse> {
		return this.loginService.login(command);
	}

	/**
	 * API  getLoginInfoLegacy
	 * @param command LoginCommand
	 * @returns Observable<any>
	 */
	getLoginInfoLegacy(): Observable<any> {
		return this.loginService.getLoginInfo();
	}

	/**
	 * API  getRefreshToken
	 * @returns Observable<any>
	 */
	getRefreshToken(): Observable<any> {
		return this.loginService.refreshToken(this.refreshToken);
	}

	updateAccessToken(data: any) {
		let user: User = this.storageAccessorService.getLocalStorage(this.USER_KEY, true);
		user.token = data.access_token;
		user.refreshToken = data.refresh_token;
		this.user.next(user);
		this.storageAccessorService.setLocalStorage(this.USER_KEY, user, true);
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

		let user: User = {
			name: name,
			email: email,
			token: token,
			expirationDate: expirationDate
		};

		this.user.next(user);
		this.isAuthenticated.next(true);
		// this.autoLogout(decodedToken.exp * 1000);
		this.storageAccessorService.setLocalStorage(this.USER_KEY, user, true);
		// this.router.navigate(['/auth/dashboard']);
	}

	handleAuthenticationLegacy(name: string, email: string, token: string, refreshToken: string, expiresIn: number) {
		const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
		console.log(expirationDate);
		let user: User = {
			name: name,
			email: email,
			token: token,
			refreshToken: refreshToken,
			expirationDate: expirationDate
		};

		this.user.next(user);
		this.isAuthenticated.next(true);
		this.storageAccessorService.setLocalStorage(this.USER_KEY, user, true);
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
	 * TODO: auto Logout should handle use isIdel and should show a popup form
	 * Set Timeout function to call logout
	 * @param expirationDuration number in ms
	 */
	private autoLogout(expirationDuration: any) {
		clearTimeout(this.tokenExirationTimer);
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
