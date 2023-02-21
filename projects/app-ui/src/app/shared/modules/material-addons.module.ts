import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
	exports: [NgSelectModule, NgxMatSelectSearchModule]
})
export class MaterialAddonsModule {}
