import { Component } from '@angular/core';
import { AppFormSharingService } from 'projects/app-ui/src/app/shared/services/app-form-sharging.service';
import { SharedModule } from 'projects/app-ui/src/app/shared/shared.module';

@Component({
	standalone: true,
	selector: 'app-customer-card',
	templateUrl: './customer-card.component.html',
	styleUrls: ['./customer-card.component.scss'],
	imports: [SharedModule]
})
export class CustomerCardComponent {
	constructor(private appFormSharingService: AppFormSharingService) {}

	onAddBillingAddress() {
		const component = import('projects/app-ui/src/app/features/customers/customer-form/customer-form.component').then(
			(m) => m.CustomerFormComponent
		);

		this.appFormSharingService.openComponentInDialog(component, 'add');
	}
}
