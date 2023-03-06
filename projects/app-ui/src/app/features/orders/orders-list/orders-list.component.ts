import { Component } from '@angular/core';

import { AuthService } from '../../../core/services/auth.service';
import { BaseComponent } from '../../../shared/bases/base.component';
import { ErrorService } from '../../../shared/services/error.service';

@Component({
	selector: 'app-orders-list',
	templateUrl: './orders-list.component.html',
	styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent extends BaseComponent {
	constructor(errorService: ErrorService, authService: AuthService) {
		super(errorService, authService);
	}
}
