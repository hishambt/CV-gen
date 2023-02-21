import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
	declarations: [CustomerViewComponent, CustomersListComponent],
	imports: [SharedModule, CustomersRoutingModule],
	providers: []
})
export class CustomersModule {}
