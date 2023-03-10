import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('../customer-list/customer-list.module').then((m) => m.CustomerListModule)
	},
	{
		path: '',
		loadChildren: () => import('../customer-add/customer-add.module').then((m) => m.CustomerAddModule)
	},
	{
		path: '',
		loadChildren: () =>
			import('../customer-billing-address-add/customer-billing-address-add.module').then((m) => m.CustomerBillingAddressAddModule)
	},
	{
		path: ':id/personal-info',
		loadChildren: () => import('../customer-detail/customer-detail.module').then((m) => m.CustomerDetailModule)
	},
	{
		path: ':id/billing-address',
		loadChildren: () =>
			import('../customer-billing-address-detail/customer-billing-address-detail.module').then((m) => m.CustomerBillingAddressDetailModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class CustomerShellRoutingModule {}
