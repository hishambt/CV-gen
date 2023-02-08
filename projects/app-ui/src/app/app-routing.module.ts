import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
				loadChildren: () => HomeModule
			},
			{
				path: 'control-panel/white-labeling',
				loadChildren: () => WhiteLabelingModule
			}
		]
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
