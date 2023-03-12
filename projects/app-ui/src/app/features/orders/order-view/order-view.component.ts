import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from 'projects/app-api/src/api/order.service';
import { map, switchMap } from 'rxjs';

import { AuthService } from '../../../core/services/auth.service';
import { BaseComponent } from '../../../shared/bases/base.component';
import { AppErrorService } from '../../../shared/services/app-error.service';

@Component({
	selector: 'app-order-view',
	templateUrl: './order-view.component.html',
	styleUrls: ['./order-view.component.scss']
})
export class OrderViewComponent extends BaseComponent implements OnInit {
	order$ = this.route.paramMap.pipe(
		switchMap((params) => {
			return this.orderService.apiOrderIdGet(params.get('id') ?? '').pipe(map((x) => x.Item));
		})
	);

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private orderService: OrderService,
		authService: AuthService,
		appErrorService: AppErrorService
	) {
		super(authService, appErrorService);
	}

	override ngOnInit() {
		super.ngOnInit();
	}

	onActionClick(value: any, _mode?: string) {
		switch (value) {
			case 'Back':
				this.router.navigate(['/orders']);
				break;
		}
	}
}
