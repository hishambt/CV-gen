import { NgModule } from '@angular/core';

import { OrdersListComponent } from './orders-list/orders-list.component';
import { OrderViewComponent } from './order-view/order-view.component';
import { OrderFormComponent } from './order-form/order-form.component';
import { SharedModule } from '../../shared/shared.module';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
	declarations: [OrdersListComponent, OrderViewComponent, OrderFormComponent],
	imports: [SharedModule, OrdersRoutingModule],
	providers: []
})
export class OrdersModule {}