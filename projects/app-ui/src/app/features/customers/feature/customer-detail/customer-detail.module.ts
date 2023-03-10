import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'projects/app-ui/src/app/shared/shared.module';

import { CustomerLinksModule } from '../../ui/customer-links/customer-links.module';
import { CustomerDetailComponent } from './customer-detail.component';

const routes: Routes = [
	{
		path: '',
		component: CustomerDetailComponent
	}
];

@NgModule({
	declarations: [CustomerDetailComponent],
	imports: [SharedModule, CustomerLinksModule, RouterModule.forChild(routes)]
})
export class CustomerDetailModule {}
