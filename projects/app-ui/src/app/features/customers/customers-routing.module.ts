import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomersListComponent } from './customers-list/customers-list.component';

const routes: Routes = [
	{
		path: '',
		component: CustomersListComponent
	},
	{
		path: 'add',
		component: CustomerFormComponent,
		data: { mode: 'add' }
	},
	{
		path: 'edit',
		component: CustomerFormComponent,
		data: { mode: 'edit' }
	},
	{
		path: 'view',
		component: CustomerViewComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class CustomersRoutingModule {}
