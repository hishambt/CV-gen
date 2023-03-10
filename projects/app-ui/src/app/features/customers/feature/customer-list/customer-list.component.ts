import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'projects/app-ui/src/app/core/services/auth.service';
import { BaseComponent } from 'projects/app-ui/src/app/shared/bases/base.component';
import { AppErrorService } from 'projects/app-ui/src/app/shared/services/app-error.service';

import { CustomersStore } from '../../data-access/customers.store';

@Component({
	selector: 'app-customer-list',
	templateUrl: './customer-list.component.html',
	styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent extends BaseComponent implements OnInit {
	displayedColumns: string[] = [
		'FullName',
		'BillingAddress',
		'LastOrderNumber',
		'totalOrders',
		'totalAmount',
		'EmailAddress',
		'AccountStatus',
		'PhoneNumber'
	];

	constructor(public customersStore: CustomersStore, private router: Router, errorService: AppErrorService, authService: AuthService) {
		super(errorService, authService);
	}

	viewRecord(row: any) {
		this.router.navigate(['/customers', row.Id, 'personal-info']);
	}

	onPageHeaderActionClick(value: any) {
		switch (value) {
			case 'Create Customer':
				this.router.navigate(['/customers/add']);
				break;
		}
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.customersStore.loadCustomers();
	}
}
