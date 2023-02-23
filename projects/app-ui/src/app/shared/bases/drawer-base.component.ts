import { SkipSelf, Input, Component, OnDestroy, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { AuthService } from '../../core/services/auth.service';
import { ErrorService } from '../services/error.service';
import { ShellDrawerSharingService } from '../services/shell-drawer-sharging.service';
import { FormBaseComponent } from './form-base.component';

@Component({
	template: ''
})
export abstract class DrawerBaseComponent<TData> extends FormBaseComponent<TData> implements OnInit, OnDestroy {
	@Input() index!: number;
	@Output() closeDrawer = new EventEmitter();
	isDrawerMode = false;
	isComponentHidden = false;
	totalNumberOfComponents = 0;
	sendTotalNumberOfComponentsSubscription!: Subscription;

	constructor(
		@SkipSelf() private shellDrawerSharingService: ShellDrawerSharingService,
		errorService: ErrorService,
		authService: AuthService,
		router: Router,
		route: ActivatedRoute
	) {
		super(errorService, authService, router, route);
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.sendTotalNumberOfComponentsSubscription = this.shellDrawerSharingService?.sendTotalNumberOfComponents$.subscribe(
			(totalNumberOfComponents) => {
				this.totalNumberOfComponents = totalNumberOfComponents;

				if (this.index !== this.totalNumberOfComponents) {
					setTimeout(() => {
						this.isComponentHidden = true;
					}, 350);
				} else {
					this.isComponentHidden = false;
				}
			}
		);
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
