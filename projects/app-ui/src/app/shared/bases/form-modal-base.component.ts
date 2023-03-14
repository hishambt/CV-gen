import { Input, Component, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { ComponentCanDeactivate } from '../models/componentCanDeactivate';
import { AppErrorService } from '../services/app-error.service';
import { AppFormSharingService } from '../services/app-form-sharging.service';
import { FormBaseComponent } from './form-base.component';

@Component({
	template: ''
})
export abstract class FormModalBaseComponent<TData> extends FormBaseComponent<TData> implements OnInit, OnDestroy, ComponentCanDeactivate {
	@Input() index!: number;
	@Input() override formData!: TData;
	@Output() closeDrawer = new EventEmitter();
	isDrawerMode = false;
	isDialogMode = false;
	isComponentHidden = false;
	totalNumberOfComponents = 0;
	sendTotalNumberOfComponentsSubscription!: Subscription;

	constructor(
		private appFormSharingService: AppFormSharingService,
		router: Router,
		route: ActivatedRoute,
		authService: AuthService,
		appErrorService: AppErrorService
	) {
		super(router, route, authService, appErrorService);
	}

	override ngOnInit(): void {
		super.ngOnInit();
	}

	override ngOnDestroy(): void {
		if (this.sendTotalNumberOfComponentsSubscription) {
			this.sendTotalNumberOfComponentsSubscription.unsubscribe();
		}
	}

	override goBack(): void {
		if (!this.isDrawerMode && !this.isDialogMode) {
			this.router.navigate(['../'], { relativeTo: this.route });
		} else {
			this.closeSideDrawer();
		}
	}

	closeSideDrawer(value?: any) {
		this.closeDrawer.emit(value);
	}
}
