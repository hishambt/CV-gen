import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from 'projects/app-ui/src/app/core/guards/can-deactivate.guard';
import { SharedModule } from 'projects/app-ui/src/app/shared/shared.module';

import { CustomerAddComponent } from './customer-add.component';

const routes: Routes = [
	{
		path: 'add',
		canDeactivate: [CanDeactivateGuard],
		component: CustomerAddComponent,
		data: { mode: 'add' }
	},
	{
		path: ':id/personal-info/edit',
		canDeactivate: [CanDeactivateGuard],
		component: CustomerAddComponent,
		data: { mode: 'edit' }
	}
];

@NgModule({
	declarations: [CustomerAddComponent],
	imports: [SharedModule, RouterModule.forChild(routes)],
	providers: []
})
export class CustomerAddModule {}
