import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, shareReplay, switchMap, tap } from 'rxjs';
import { AuthService } from 'projects/app-ui/src/app/core/services/auth.service';
import { DrawerBaseComponent } from 'projects/app-ui/src/app/shared/bases/drawer-base.component';
import { AppErrorService } from 'projects/app-ui/src/app/shared/services/app-error.service';
import { AppFormSharingService } from 'projects/app-ui/src/app/shared/services/app-form-sharging.service';

import { CustomersStore } from '../../data-access/customers.store';

@Component({
	selector: 'app-customer-billing-address-add',
	templateUrl: './customer-billing-address-add.component.html',
	styleUrls: ['./customer-billing-address-add.component.scss']
})
export class CustomerBillingAddressAddComponent extends DrawerBaseComponent<any> implements OnInit {
	customer$ = this.route.paramMap.pipe(
		switchMap((params) =>
			this.customersStore.customers$.pipe(
				shareReplay(1),
				map((customers) => (customers ? customers.find((customer) => customer.Id === Number(params.get('id'))) : null))
			)
		),
		tap((x) => {
			if (x && this.formMode == 'edit') {
				this.form.patchValue({
					companyName: x.CompanyName
				});
			}
		})
	);

	onLoadData() {
		return {
			companyName: ''
		};
	}

	constructor(
		public customersStore: CustomersStore,
		appFormSharingService: AppFormSharingService,
		errorService: AppErrorService,
		authService: AuthService,
		router: Router,
		route: ActivatedRoute
	) {
		super(appFormSharingService, errorService, authService, router, route);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.customersStore.loadCustomers();
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
