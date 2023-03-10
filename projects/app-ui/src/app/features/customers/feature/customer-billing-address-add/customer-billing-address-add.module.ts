import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'projects/app-ui/src/app/core/guards/can-deactivate.guard';
import { SharedModule } from 'projects/app-ui/src/app/shared/shared.module';

import { CustomerLinksModule } from '../../ui/customer-links/customer-links.module';
import { CustomerBillingAddressAddComponent } from './customer-billing-address-add.component';

const routes: Routes = [
	{
		path: ':id/billing-address/add',
		canDeactivate: [CanDeactivateGuard],
		component: CustomerBillingAddressAddComponent,
		data: { mode: 'add' }
	},
	{
		path: ':id/billing-address/edit',
		canDeactivate: [CanDeactivateGuard],
		component: CustomerBillingAddressAddComponent,
		data: { mode: 'edit' }
	}
];

@NgModule({
	declarations: [CustomerBillingAddressAddComponent],
	imports: [SharedModule, CustomerLinksModule, RouterModule.forChild(routes)]
})
export class CustomerBillingAddressAddModule {}
