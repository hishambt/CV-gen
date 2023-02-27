import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { DrawerBaseComponent } from '../../../shared/bases/drawer-base.component';
import { ErrorService } from '../../../shared/services/error.service';
import { AppFormSharingService } from '../../../shared/services/app-form-sharging.service';

@Component({
	selector: 'app-order-form',
	templateUrl: './order-form.component.html',
	styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent extends DrawerBaseComponent<any> implements OnInit {
	foods: any[] = [
		{ value: 'steak-0', viewValue: 'Steak' },
		{ value: 'pizza-1', viewValue: 'Pizza' },
		{ value: 'tacos-2', viewValue: 'Tacos' }
	];

	constructor(
		appFormSharingService: AppFormSharingService,
		errorService: ErrorService,
		authService: AuthService,
		router: Router,
		route: ActivatedRoute
	) {
		super(appFormSharingService, errorService, authService, router, route);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.form.controls['channel'].disable();
		this.form.controls['currency'].disable();
		this.form.controls['note'].disable();
	}

	onLoadData() {
		return {
			customer: '',
			channel: '',
			currency: '',
			note: ''
		};
	}

	customerValueChange(event: any) {
		if (event) {
			this.form.controls['channel'].enable();
			this.form.controls['currency'].enable();
			this.form.controls['note'].enable();
		}
	}

	onActionClick(value: any, _mode?: string) {
		switch (value) {
			case 'Save and Close':
				// this.submitRecord(_mode, value);
				break;
			case 'Save and New':
				// this.submitRecord(_mode, value);
				break;
			case 'Cancel':
				this.goBack();
				break;
			case 'Reset':
				this.reloadRoute();
				break;
		}
	}

	submitRecord(status?: string | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}
}
