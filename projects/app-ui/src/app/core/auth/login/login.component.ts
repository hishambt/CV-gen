import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCommand } from 'projects/app-api/src/model/loginCommand';
import { LoginResponse } from 'projects/app-api/src/model/loginResponse';
import { lastValueFrom } from 'rxjs';

import { FormBaseComponent } from '../../../shared/bases/form-base.component';
import { ErrorService } from '../../../shared/services/error.service';
import { AuthService } from '../../services/auth.service';
import { Store } from '../models/stores';
import { AuthStorageService } from '../services/auth-storage.services';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseComponent<LoginCommand> implements OnInit, OnDestroy {
	//#region public
	public savedStores: Array<Store> = [];
	public hasSelectedStore = false;
	public selectedStore!: Store;
	public enableStoreSelection = false;
	//#endregion

	//#region private
	private loginRes!: LoginResponse;
	//#endregion

	constructor(
		private authStorageService: AuthStorageService,
		errorService: ErrorService,
		authService: AuthService,
		router: Router,
		route: ActivatedRoute
	) {
		super(errorService, authService, router, route);

		this.savedStores = this.authStorageService.gemoveAllEntriesFromRecentlyLoggedIn() ?? [];
		this.enableStoreSelection = this.savedStores.length > 0;
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.form.patchValue({
			name: 'store 1',
			email: 'example@example.com',
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

		const command = this.mapControlsToModel<LoginCommand>();
		const response = await lastValueFrom(this.authService.login(command));

		this.isWaiting = false;

		if (response) {
			const tempStore: Store = { storeName: command.name, emailAddress: command.email, storeImage: '' };
			this.authStorageService.addToRecentlyLoggedIn(tempStore);

			this.authService.handleAuthentication(response.name, response.email, response.token);
			this.router.navigate(['/home']);
		}
	}

	removeRecentStore(store: Store) {
		this.authStorageService.removeEntryfromRecentlyLoggedIn(store);
		this.savedStores = this.authStorageService.gemoveAllEntriesFromRecentlyLoggedIn() ?? [];
	}
}
