import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'ngx-avatar';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModule } from './modules/material.module';
import { SafePipe } from './pipes/safe.pipe';
import { SvgLoaderComponent } from './components/svg-loader/svg-loader.component';
import { AvatarComponent } from './components/avatar/avatar.component';

@NgModule({
	declarations: [SafePipe, SvgLoaderComponent, AvatarComponent],
	imports: [CommonModule, TranslateModule.forChild(), AvatarModule],
	exports: [CommonModule, RouterModule, ReactiveFormsModule, MaterialModule, TranslateModule, SvgLoaderComponent, AvatarComponent, SafePipe],
	providers: []
})
export class SharedModule {}
