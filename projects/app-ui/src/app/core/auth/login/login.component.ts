import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCommand } from 'projects/app-api/src/model/loginCommand';
import { LoginResponse } from 'projects/app-api/src/model/loginResponse';
import { lastValueFrom } from 'rxjs';

import { FormBaseComponent } from '../../../shared/bases/form-base.component';
import { AppErrorService } from '../../../shared/services/app-error.service';
import { AuthService } from '../../services/auth.service';
import { Store } from '../_models/stores';
import { LoginStorageService } from '../_services/login-storage.services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseComponent<any> implements OnInit, OnDestroy {
	//#region public
	public savedStores: Array<Store> = [];
	public hasSelectedStore = false;
	public selectedStore: Store | null = null;
	public enableStoreSelection = false;
	//#endregion

	//#region private
	private loginRes!: LoginResponse;
	//#endregion

	constructor(
		private loginStorageService: LoginStorageService,
		errorService: AppErrorService,
		authService: AuthService,
		router: Router,
		route: ActivatedRoute
	) {
		super(router, route, authService, errorService);

		this.savedStores = this.loginStorageService.gemoveAllEntriesFromRecentlyLoggedIn() ?? [];
		this.enableStoreSelection = this.savedStores.length > 0;
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.formControls['password'].setValidators([Validators.required]);
		this.formControls['password'].updateValueAndValidity();
		this.form.patchValue({
			password: 'p@ssw0rd'
		});
	}

	onLoadData(): LoginCommand {
		return {
			name: '',
			email: '',
			password: ''
		};
	}

	async submitRecord(status?: string | undefined): Promise<void> {
		super.submit();

		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		this.isWaiting = true;

		let command: LoginCommand;

		if (this.enableStoreSelection) {
			command = this.mapControlsToModel<LoginCommand>();
			command.name = this.selectedStore!.storeName;
			command.email = this.selectedStore!.emailAddress;
		} else {
			command = this.mapControlsToModel<LoginCommand>();
		}

		command.rememberMe = false;

		console.log(command);

		const response = await lastValueFrom(this.authService.loginLegacy(command));

		this.isWaiting = false;

		if (response) {
			const tempStore: Store = { storeName: command.name, emailAddress: command.email, storeImage: '' };
			this.loginStorageService.addToRecentlyLoggedIn(tempStore);

			this.authService.handleAuthenticationLegacy(
				command.name,
				command.email,
				response.access_token,
				response.refresh_token,
				response.expires_in
			);

			await lastValueFrom(this.authService.getLoginInfoLegacy());
			this.router.navigate(['/home']);
		}
	}

	public selectRecentStore(store: Store): void {
		this.hasSelectedStore = true;
		this.selectedStore = store;
		this.toggleFormValidation();
	}

	public clearSelectRecentStore(): void {
		this.hasSelectedStore = false;
		this.selectedStore = null;
	}

	public removeRecentStore(store: Store): void {
		this.loginStorageService.removeEntryfromRecentlyLoggedIn(store);
		this.savedStores = this.loginStorageService.gemoveAllEntriesFromRecentlyLoggedIn() ?? [];
	}

	public resetToDefaultLogin(): void {
		this.hasSelectedStore = false;
		this.enableStoreSelection = false;
		this.toggleFormValidation();
	}

	private toggleFormValidation() {
		const name = this.formControls['name'];
		const email = this.formControls['email'];

		if (this.enableStoreSelection) {
			name.clearValidators();
			name.updateValueAndValidity();

			email.clearValidators();
			email.updateValueAndValidity();
		} else {
			name.setValidators([Validators.required]);
			name.updateValueAndValidity();

			email.setValidators([Validators.required, Validators.email]);
			email.updateValueAndValidity();
		}
		//TODO: Uncomment Next line for testing (default password)
		//	this.form.reset();
	}
}
