import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { CustomerFormComponent } from './customer-form/customer-form.component';
import { CustomerViewComponent } from './customer-view/customer-view.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { CustomersRoutingModule } from './customers-routing.module';

@NgModule({
	declarations: [CustomerFormComponent, CustomerViewComponent, CustomersListComponent],
	imports: [SharedModule, CustomersRoutingModule],
	providers: []
})
export class CustomersModule {}
