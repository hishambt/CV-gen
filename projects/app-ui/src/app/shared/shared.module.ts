import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './modules/material.module';

@NgModule({
	imports: [CommonModule],
	exports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule],
	declarations: [],
	providers: []
})
export class SharedModule {}
