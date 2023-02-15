import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthModule } from './core/auth/auth.module';
import { AuthGuard } from './core/guards/auth.guard';
import { WhiteLabelingModule } from './features/control-panel/white-labeling/white-labeling.module';
import { HomeModule } from './features/home/home.module';
import { ShellComponent } from './shell/shell/shell.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/home',
		pathMatch: 'full'
	},

	{
		path: '',
		component: ShellComponent,
		children: [
			{
				path: 'home',
				canActivate: [AuthGuard],
				loadChildren: () => HomeModule
			},
			{
				path: 'control-panel/white-labeling',
				loadChildren: () => WhiteLabelingModule
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
			onSameUrlNavigation: 'reload'
		})
	],
	exports: [RouterModule]
})
export class AppRoutingModule {}
