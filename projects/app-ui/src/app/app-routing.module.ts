import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthModule } from './core/auth/auth.module';
import { AuthGuard } from './core/guards/auth.guard';
import { WhiteLabelingModule } from './features/control-panel/white-labeling/white-labeling.module';
import { HomeModule } from './features/home/home.module';
import { OrdersModule } from './features/orders/orders.module';
import { ShellComponent } from './shell/shell/shell.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},
	// Re-arrange the order of the children to meet with features folder structure
	{
		path: '',
		component: ShellComponent,
		children: [
			{
				path: 'control-panel/white-labeling',
				loadChildren: () => WhiteLabelingModule
			},
			{
				path: 'products',
				canActivate: [AuthGuard],
				loadChildren: () => import('./features/products/feature/product-shell/product-shell.module').then((m) => m.ProductShellModule)
			},
			{
				path: 'customers',
				canActivate: [AuthGuard],
				loadChildren: () => import('./features/customers/feature/customer-shell/customer-shell.module').then((m) => m.CustomerShellModule)
			},
			{
				path: 'home',
				canActivate: [AuthGuard],
				loadChildren: () => HomeModule
			},
			{
				path: 'orders',
				canActivate: [AuthGuard],
				loadChildren: () => OrdersModule
			}
		]
	},
	{
		path: 'auth',
		loadChildren: () => AuthModule
	}
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, {
			scrollPositionRestoration: 'enabled',
			onSameUrlNavigation: 'reload',
			preloadingStrategy: PreloadAllModules,
			useHash: true
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
