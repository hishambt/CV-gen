import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from '../../core/guards/can-deactivate.guard';
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
		canDeactivate: [CanDeactivateGuard],
		data: { mode: 'add' }
	},
	{
		path: 'edit',
		component: OrderFormComponent,
		canDeactivate: [CanDeactivateGuard],
		data: { mode: 'edit' }
	},
	{
		path: 'view/:id',
		component: OrderViewComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class OrdersRoutingModule {}
