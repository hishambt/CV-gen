import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, shareReplay, switchMap, tap } from 'rxjs';

import { AuthService } from '../../../../core/services/auth.service';
import { FormModalBaseComponent } from '../../../../shared/bases/form-modal-base.component';
import { AppErrorService } from '../../../../shared/services/app-error.service';
import { AppFormSharingService } from '../../../../shared/services/app-form-sharging.service';
import { CustomersStore } from '../../data-access/customers.store';

@Component({
	selector: 'app-customer-add',
	templateUrl: './customer-add.component.html',
	styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent extends FormModalBaseComponent<any> implements OnInit {
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
					firstName: x.FirstName,
					lastName: x.LastName
				});
			}
		})
	);

	onLoadData() {
		return {
			firstName: '',
			lastName: ''
		};
	}

	constructor(
		appFormSharingService: AppFormSharingService,
		public customersStore: CustomersStore,
		router: Router,
		route: ActivatedRoute,
		authService: AuthService,
		appErrorService: AppErrorService
	) {
		super(appFormSharingService, router, route, authService, appErrorService);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.customersStore.loadCustomers();
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

	onPageHeaderActionClick(value: any) {
		switch (value) {
			case 'Edit':
				this.router.navigate(['./edit'], { relativeTo: this.route });
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
