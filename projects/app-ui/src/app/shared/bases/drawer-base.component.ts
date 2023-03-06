import { Input, Component, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { ErrorService } from '../services/error.service';
import { AppFormSharingService } from '../services/app-form-sharging.service';
import { FormBaseComponent } from './form-base.component';

@Component({
	template: ''
})
export abstract class DrawerBaseComponent<TData> extends FormBaseComponent<TData> implements OnInit, OnDestroy {
	@Input() index!: number;
	@Input() override formData!: TData;
	@Output() closeDrawer = new EventEmitter();
	isDrawerMode = false;
	isComponentHidden = false;
	totalNumberOfComponents = 0;
	sendTotalNumberOfComponentsSubscription!: Subscription;

	constructor(
		private appFormSharingService: AppFormSharingService,
		errorService: ErrorService,
		authService: AuthService,
		router: Router,
		route: ActivatedRoute
	) {
		super(router, route, errorService, authService);
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
		if (!this.isDrawerMode) {
			this.router.navigate(['../'], { relativeTo: this.route });
		} else {
			this.closeSideDrawer();
		}
	}

	closeSideDrawer(value?: any) {
		this.closeDrawer.emit(value);
	}
}
