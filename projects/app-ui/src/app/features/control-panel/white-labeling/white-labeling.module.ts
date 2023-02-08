import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';
import { WhiteLabelingConfigComponent } from './white-labeling-config/white-labeling-config.component';
import { WhiteLabelingRoutingModule } from './white-labeling-routing.module';
import { WhiteLabelingThemeComponent } from './white-labeling-theme/white-labeling-theme.component';

@NgModule({
	declarations: [WhiteLabelingConfigComponent, WhiteLabelingThemeComponent],
	imports: [SharedModule, WhiteLabelingRoutingModule]
})
export class WhiteLabelingModule {}
