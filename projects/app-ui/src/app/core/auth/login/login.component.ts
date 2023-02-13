import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginCommand } from 'projects/app-api/src/model/loginCommand';
import { LoginResponse } from 'projects/app-api/src/model/loginResponse';
import { lastValueFrom } from 'rxjs';

import { FormBaseComponent } from '../../../shared/bases/form-base.component';
import { ErrorService } from '../../../shared/services/error.service';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent extends FormBaseComponent<LoginCommand> implements OnInit, OnDestroy {
	//#region
	private loginRes!: LoginResponse;
	//#endregion

	constructor(errorService: ErrorService, authService: AuthService, router: Router, route: ActivatedRoute) {
		super(errorService, authService, router, route);
	}

	override ngOnInit(): void {
		super.ngOnInit();

		this.form.patchValue({
			email: 'example@example.com',
			password: 'p@ssw0rd'
		});
	}

	onLoadData(): LoginCommand {
		return {
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
			this.authService.handleAuthentication(response.name, response.email, response.token);
			this.router.navigate(['/home']);
		}
	}
}
