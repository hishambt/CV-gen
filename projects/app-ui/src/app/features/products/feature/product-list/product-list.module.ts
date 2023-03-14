import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'projects/app-ui/src/app/shared/shared.module';

import { ProductListComponent } from './product-list.component';

const routes: Routes = [
	{
		path: '',
		component: ProductListComponent
	}
];

@NgModule({
	declarations: [ProductListComponent],
	imports: [SharedModule, RouterModule.forChild(routes)],
	exports: [],
	providers: []
})
export class ProductListModule {}
