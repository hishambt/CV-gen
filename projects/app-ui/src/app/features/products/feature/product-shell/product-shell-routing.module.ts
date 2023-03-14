import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('../product-list/product-list.module').then((m) => m.ProductListModule)
	},
	{
		path: '',
		loadChildren: () => import('../product-add/product-add.module').then((m) => m.ProductAddModule)
	},
	{
		path: ':id/view',
		loadChildren: () => import('../product-detail/product-detail.module').then((m) => m.ProductDetailModule)
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
	providers: []
})
export class ProductShellRoutingModule {}
