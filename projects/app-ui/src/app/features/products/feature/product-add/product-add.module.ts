import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'projects/app-ui/src/app/shared/shared.module';

import { ProductAddComponent } from './product-add.component';

const routes: Routes = [
	{
		path: 'add',
		component: ProductAddComponent,
		data: { mode: 'add' }
	},
	{
		path: ':id/edit',
		component: ProductAddComponent,
		data: { mode: 'edit' }
	}
];

@NgModule({
	declarations: [ProductAddComponent],
	imports: [SharedModule, RouterModule.forChild(routes)],
	exports: [],
	providers: []
})
export class ProductAddModule {}
