import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'projects/app-api/src/api/order.service';
import { map, switchMap } from 'rxjs';

@Component({
	selector: 'app-order-view',
	templateUrl: './order-view.component.html',
	styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent {
	order$ = this.route.paramMap.pipe(
		switchMap((params) => {
			return this.orderService.apiOrderIdGet(params.get('id') ?? '').pipe(map((x) => x.Item));
		})
	);

	constructor(private route: ActivatedRoute, private router: Router, private orderService: OrderService) {}

	onActionClick(value: any, _mode?: string) {
		switch (value) {
			case 'Back':
				this.router.navigate(['/orders']);
				break;
		}
	}
}
