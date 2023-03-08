import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from 'projects/app-api/src/api/order.service';
import { map, tap } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { BaseComponent } from '../../../shared/bases/base.component';
import { AppErrorService } from '../../../shared/services/app-error.service';

@Component({
	selector: 'app-orders-list',
	templateUrl: './orders-list.component.html',
	styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent extends BaseComponent {
	override isLoading = true;
	orders$ = this.orderService.apiOrdersGet().pipe(
		tap((x) => (this.isLoading = false)),
		map((x) => x.Data)
	);

	displayedColumns: string[] = ['InvoiceNumber', 'OrderDate', 'StatusDescription', 'Customer', 'ChannelName', 'ShippingAddress', 'Total'];

	constructor(private orderService: OrderService, private router: Router, errorService: AppErrorService, authService: AuthService) {
		super(errorService, authService);
	}

	viewRecord(row: any) {
		this.router.navigate(['/orders/view', row.Id]);
	}

	onPageHeaderActionClick(value: any) {
		switch (value) {
			case 'Create Order':
				this.router.navigate(['/orders/add']);
				break;
		}
	}
}
