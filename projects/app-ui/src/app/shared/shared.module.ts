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
import { CustomersDropdownComponent } from './components/form-fields/customers-dropdown/customers-dropdown.component';
import { FormActionBarComponent } from './components/form-action-bar/form-action-bar.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { CanDeactivateDialogComponent } from './components/dialogs/can-deactivate-dialog/can-deactivate-dialog.component';

@NgModule({
	declarations: [
		SafePipe,
		SvgLoaderComponent,
		// shared Components
		AvatarComponent,
		FormActionBarComponent,
		BreadcrumbComponent,
		CanDeactivateDialogComponent,
		// shared dropdowns
		CustomersDropdownComponent
	],
	imports: [
		CommonModule,
		TranslateModule.forChild(),
		ReactiveFormsModule,
		MaterialModule,
		// MaterialAddonsModule,
		AvatarModule
	],
	exports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		MaterialModule,
		// MaterialAddonsModule,
		// Addons
		TranslateModule,
		SvgLoaderComponent,
		// shared exported Components
		AvatarComponent,
		FormActionBarComponent,
		BreadcrumbComponent,
		// shared exported Pipes
		SafePipe,
		// shared exported dropdowns
		CustomersDropdownComponent
	],
	providers: []
})
export class SharedModule {}
