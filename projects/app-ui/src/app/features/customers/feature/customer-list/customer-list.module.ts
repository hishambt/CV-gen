import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'projects/app-ui/src/app/shared/shared.module';

import { CustomerListComponent } from './customer-list.component';

const routes: Routes = [
	{
		path: '',
		component: CustomerListComponent
	}
];

@NgModule({
	declarations: [CustomerListComponent],
	imports: [SharedModule, RouterModule.forChild(routes)]
})
export class CustomerListModule {}
