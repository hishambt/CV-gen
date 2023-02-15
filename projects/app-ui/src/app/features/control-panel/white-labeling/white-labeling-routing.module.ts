import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WhiteLabelingConfigComponent } from './white-labeling-config/white-labeling-config.component';
import { WhiteLabelingThemeComponent } from './white-labeling-theme/white-labeling-theme.component';

const routes: Routes = [
	{
		path: '',
		component: WhiteLabelingConfigComponent
	},
	{
		path: 'theme',
		component: WhiteLabelingThemeComponent
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class WhiteLabelingRoutingModule {}
