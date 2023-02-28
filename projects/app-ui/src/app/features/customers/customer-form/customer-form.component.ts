import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { DrawerBaseComponent } from '../../../shared/bases/drawer-base.component';
import { ErrorService } from '../../../shared/services/error.service';
import { AppFormSharingService } from '../../../shared/services/app-form-sharging.service';
import { SharedModule } from '../../../shared/shared.module';
import { CustomerCardComponent } from '../_components/customer-card/customer-card.component';

@Component({
	standalone: true,
	selector: 'app-customer-form',
	templateUrl: './customer-form.component.html',
	styleUrls: ['./customer-form.component.scss'],
	imports: [SharedModule, CustomerCardComponent]
})
export class CustomerFormComponent extends DrawerBaseComponent<any> implements OnInit {
	onLoadData() {
		return {
			firstName: '',
			lastName: ''
		};
	}

	constructor(
		appFormSharingService: AppFormSharingService,
		errorService: ErrorService,
		authService: AuthService,
		router: Router,
		route: ActivatedRoute
	) {
		super(appFormSharingService, errorService, authService, router, route);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.form.controls['firstName'].patchValue(this.formData ? this.formData['firstName'] : null);
	}

	async submitRecord(_actionName: string): Promise<void> {
		super.submit();

		if (this.form.invalid) {
			this.form.markAllAsTouched();

			return;
		}

		const command = this.mapControlsToModel<any>();

		this.isWaiting = true;
		//TODO: post new record here
		console.log(command);
		this.isWaiting = false;

		if (_actionName == 'Save and Close') {
			this.isDrawerMode ? this.closeSideDrawer(command) : this.goBack();
		}
	}

	onActionClick(value: any, _mode?: string) {
		switch (value) {
			case 'Save and Close':
				this.submitRecord(value);
				break;
			case 'Save and New':
				this.submitRecord(value);
				break;
			case 'Cancel':
				this.goBack();
				break;
			case 'Reset':
				this.reloadRoute();
				break;
		}
	}

	// @HostListener('document:keydown.enter', ['$event']) onEnterHandler(): void {
	// 	// this.onSubmit();
	// }

	// @HostListener('document:keydown.escape', ['$event']) onEscapeHandler(): void {
	// 	if (this.drawer.opened) {
	// 		if (this.drawerComponents.length - 1 == this.index) {
	// 			this.appFormSharingService.closeComponent();
	// 			this.appDrawerHost.viewContainerRef.clear();
	// 			this.toggleDrawer();
	// 		}
	// 	}
	// }
}
