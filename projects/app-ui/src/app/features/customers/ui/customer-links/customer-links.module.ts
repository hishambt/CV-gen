import { NgModule } from '@angular/core';
import { SharedModule } from 'projects/app-ui/src/app/shared/shared.module';

import { CustomerLinksComponent } from './customer-links.component';

@NgModule({
	declarations: [CustomerLinksComponent],
	imports: [SharedModule],
	exports: [CustomerLinksComponent]
})
export class CustomerLinksModule {}
