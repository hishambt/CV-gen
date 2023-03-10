import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { CustomerService } from 'projects/app-api/src/api/customer.service';
import { first, switchMap, tap } from 'rxjs/operators';

import { CustomerState } from './customer';

@Injectable({
	providedIn: 'root'
})
export class CustomersStore extends ComponentStore<CustomerState> {
	readonly customers$ = this.select((state) => state.Data);
	customer$ = this.select((state) => state.Data);

	loadCustomers = this.effect(($) =>
		$.pipe(
			first(),
			switchMap(() =>
				this.customerService.apiCustomersGet().pipe(
					tap({
						next: (customers) => {
							return this.patchState(customers);
						}
					})
				)
			)
		)
	);

	constructor(private customerService: CustomerService) {
		super({
			Data: [],
			Count: 0,
			HasData: false,
			SearchInfo: null
		});
	}
}
