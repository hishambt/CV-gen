import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, shareReplay, switchMap } from 'rxjs';

import { CustomersStore } from '../../data-access/customers.store';

@Component({
	selector: 'app-customer-links',
	templateUrl: './customer-links.component.html',
	styleUrls: ['./customer-links.component.scss']
})
export class CustomerLinksComponent {
	customer$ = this.route.paramMap.pipe(
		shareReplay(1),
		switchMap((params) =>
			this.customersStore.customers$.pipe(
				map((customers) => (customers ? customers.find((customer) => customer.Id === Number(params.get('id'))) : null))
			)
		)
	);

	constructor(public customersStore: CustomersStore, private route: ActivatedRoute, private router: Router) {}
}
