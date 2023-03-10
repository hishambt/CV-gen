import { Component } from '@angular/core';
import { AppFormSharingService } from 'projects/app-ui/src/app/shared/services/app-form-sharging.service';

@Component({
	selector: 'app-customer-details-card',
	templateUrl: './customer-details-card.component.html',
	styleUrls: ['./customer-details-card.component.scss']
})
export class CustomerDetailsCardComponent {
	constructor(private appFormSharingService: AppFormSharingService) {}

	onAddBillingAddress() {
		const component = import('projects/app-ui/src/app/features/customers/feature/customer-add/customer-add.component').then(
			(m) => m.CustomerAddComponent
		);

		this.appFormSharingService.openComponentInDialog(component, 'add');
	}
}
