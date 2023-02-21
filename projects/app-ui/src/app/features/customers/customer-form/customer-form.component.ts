import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Customer } from 'projects/app-api/src/model/customer';

import { AuthService } from '../../../core/services/auth.service';
import { FormBaseComponent } from '../../../shared/bases/form-base.component';
import { ErrorService } from '../../../shared/services/error.service';
import { SharedModule } from '../../../shared/shared.module';

@Component({
	standalone: true,
	selector: 'app-customer-form',
	templateUrl: './customer-form.component.html',
	styleUrls: ['./customer-form.component.scss'],
	imports: [SharedModule]
})
export class CustomerFormComponent extends FormBaseComponent<any> implements OnInit {
	@Input() customer!: Customer;

	onLoadData() {
		return {
			firstName: '',
			lastName: ''
		};
	}

	constructor(errorService: ErrorService, authService: AuthService, router: Router, route: ActivatedRoute) {
		super(errorService, authService, router, route);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.form.controls['firstName'].patchValue(this.customer ? this.customer['firstName'] : null);
	}

	async submitRecord(_actionName: string): Promise<void> {
		super.submit();

		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const command = this.mapControlsToModel<any>();

		this.isWaiting = true;
		//TODO: post new record here
		console.log(command);
		this.isWaiting = false;

		if (_actionName == 'Save and Close') {
			this.isDrawerMode ? this.closeSideDrawer(command) : this.goBack();
		}
	}

	onActionClick(value: any, _mode?: string) {
		switch (value) {
			case 'Save and Close':
				this.submitRecord(value);
				break;
			case 'Save and New':
				this.submitRecord(value);
				break;
			case 'Cancel':
				this.goBack();
				break;
			case 'Reset':
				this.reloadRoute();
				break;
		}
	}
}
