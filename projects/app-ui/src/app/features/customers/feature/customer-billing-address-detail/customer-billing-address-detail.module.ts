import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'projects/app-ui/src/app/shared/shared.module';

import { CustomerLinksModule } from '../../ui/customer-links/customer-links.module';
import { CustomerBillingAddressDetailComponent } from './customer-billing-address-detail.component';

const routes: Routes = [
	{
		path: '',
		component: CustomerBillingAddressDetailComponent
	}
];

@NgModule({
	declarations: [CustomerBillingAddressDetailComponent],
	imports: [SharedModule, CustomerLinksModule, RouterModule.forChild(routes)]
})
export class CustomerBillingAddressDetailModule {}
