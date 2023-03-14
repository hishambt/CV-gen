import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'projects/app-ui/src/app/shared/shared.module';

import { ProductDetailComponent } from './product-detail.component';

const routes: Routes = [
	{
		path: '',
		component: ProductDetailComponent
	}
];

@NgModule({
	declarations: [ProductDetailComponent],
	imports: [SharedModule, RouterModule.forChild(routes)],
	exports: [],
	providers: []
})
export class ProductDetailModule {}
