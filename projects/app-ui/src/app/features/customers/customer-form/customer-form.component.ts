import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { FormBaseComponent } from '../../../shared/bases/form-base.component';
import { ErrorService } from '../../../shared/services/error.service';

@Component({
	selector: 'app-customer-form',
	templateUrl: './customer-form.component.html',
	styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent extends FormBaseComponent<any> implements OnInit {
	onLoadData() {
		return {
			firstName: '',
			lastName: ''
		};
	}

	submitRecord(status?: string | undefined): Promise<void> {
		throw new Error('Method not implemented.');
	}

	constructor(errorService: ErrorService, authService: AuthService, router: Router, route: ActivatedRoute) {
		super(errorService, authService, router, route);
	}

	override ngOnInit(): void {
		super.ngOnInit();
	}
}
