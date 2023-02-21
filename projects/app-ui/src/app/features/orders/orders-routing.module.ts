import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrderFormComponent } from './order-form/order-form.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

const routes: Routes = [
	{
		path: '',
		component: OrdersListComponent
	},
	{
		path: 'add',
		component: OrderFormComponent,
		data: { mode: 'add' }
	},
	{
		path: 'edit',
		component: OrderFormComponent,
		data: { mode: 'edit' }
	},
	{
		path: 'view',
		component: OrderViewComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class OrdersRoutingModule {}
