import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeViewComponent } from './home-view/home-view.component';
import { OrdersListCardComponent } from './_components/orders-list-card/orders-list-card.component';

@NgModule({
	declarations: [HomeViewComponent, OrdersListCardComponent],
	imports: [HomeRoutingModule, SharedModule],
	exports: [],
	providers: []
})
export class HomeModule {}
