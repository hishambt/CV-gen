import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'projects/app-api/src/api/order.service';
import { map, shareReplay, switchMap } from 'rxjs';

import { CustomersStore } from '../../data-access/customers.store';

@Component({
	selector: 'app-customer-detail',
	templateUrl: './customer-detail.component.html',
	styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
	customer$ = this.route.paramMap.pipe(
		switchMap((params) =>
			this.customersStore.customers$.pipe(
				shareReplay(1),
				map((customers) => (customers ? customers.find((customer) => customer.Id === Number(params.get('id'))) : null))
			)
		)
	);

	constructor(public customersStore: CustomersStore, private route: ActivatedRoute, private router: Router, private orderService: OrderService) {}

	ngOnInit() {
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
