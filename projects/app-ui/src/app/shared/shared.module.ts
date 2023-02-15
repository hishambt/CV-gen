import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './modules/material.module';
import { SafePipe } from './pipes/safe.pipe';
import { SvgLoaderComponent } from './components/svg-loader/svg-loader.component';

@NgModule({
	declarations: [SafePipe, SvgLoaderComponent],
	imports: [CommonModule],
	exports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule, SvgLoaderComponent, SafePipe],
	providers: []
})
export class SharedModule {}
