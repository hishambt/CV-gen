import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'projects/app-ui/src/app/core/services/auth.service';
import { BaseComponent } from 'projects/app-ui/src/app/shared/bases/base.component';
import { AppErrorService } from 'projects/app-ui/src/app/shared/services/app-error.service';
import { map, shareReplay, switchMap } from 'rxjs';

import { CustomersStore } from '../../data-access/customers.store';

@Component({
	selector: 'app-customer-detail',
	templateUrl: './customer-detail.component.html',
	styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent extends BaseComponent implements OnInit {
	customer$ = this.route.paramMap.pipe(
		switchMap((params) =>
			this.customersStore.customers$.pipe(
				shareReplay(1),
				map((customers) => (customers ? customers.find((customer) => customer.Id === Number(params.get('id'))) : null))
			)
		)
	);

	constructor(
		public customersStore: CustomersStore,
		private route: ActivatedRoute,
		private router: Router,
		authService: AuthService,
		appErrorService: AppErrorService
	) {
		super(authService, appErrorService);
	}

	override ngOnInit() {
		super.ngOnInit();
		this.customersStore.loadCustomers();
	}

	onActionClick(value: any, _mode?: string) {
		switch (value) {
			case 'Back':
				this.router.navigate(['/orders']);
				break;
		}
	}

	onPageHeaderActionClick(value: any) {
		switch (value) {
			case 'Edit':
				this.router.navigate(['./edit'], { relativeTo: this.route });
				break;
		}
	}
}
