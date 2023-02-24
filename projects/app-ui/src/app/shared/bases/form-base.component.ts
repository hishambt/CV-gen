import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { BaseComponent } from './base.component';
import { ErrorService } from '../services/error.service';
import { AuthService } from '../../core/services/auth.service';
import { ComponentCanDeactivate } from '../models/componentCanDeactivate';

@Component({
	template: ''
})
export abstract class FormBaseComponent<TData> extends BaseComponent implements OnInit, OnDestroy, ComponentCanDeactivate {
	isDirty = false;
	isLoadingFailed = false;
	showValidation = false;
	validationMessages = new Map<string, string[]>([]);
	data!: TData;
	form: FormGroup;
	formMode: 'edit' | 'add' = 'add';
	formData!: TData;

	/**
	 * @description Set form object to build the FormControl
	 */
	abstract onLoadData(): TData;
	abstract submitRecord(status?: string): Promise<void>;

	constructor(errorService: ErrorService, authService: AuthService, protected router: Router, protected route: ActivatedRoute) {
		super(errorService, authService);

		this.sendValidationErrors$.subscribe((errors: any) => {
			errors.forEach((error: any) => {
				this.validationMessages.set(error.key, error.value);
			});
		});

		this.route.data.subscribe((data) => {
			this.formMode = data['mode'];
		});

		this.form = new FormGroup({});
	}

	override ngOnInit(): void {
		super.ngOnInit();
		this.data = this.onLoadData();
		const group: any = {};

		if (this.data) {
			Object.entries(this.data).forEach(([key, value]) => {
				if (typeof value === 'boolean') {
					group[key] = new FormControl(false);
				} else {
					group[key] = new FormControl(null);
				}
			});
		}

		this.form = new FormGroup(group);

		this.form.valueChanges.subscribe(() => {
			if (!this.form.dirty) {
				this.isDirty = false;
			} else {
				this.isDirty = true;
			}
		});
	}

	override ngOnDestroy(): void {
		super.ngOnDestroy();
	}

	/**
	 * Return this.form.controls
	 */
	get formControls() {
		return this.form.controls;
	}

	/**
	 * Get form controls as object key:value
	 * @returns form controls as object
	 */
	public mapControlsToModel<TCommand extends unknown>(): TCommand {
		const command: Partial<TCommand> = {};

		Object.entries(this.form.controls).forEach(([key, value]) => {
			command[key as keyof TCommand] = value.value;
		});

		return command as TCommand;
	}

	public submit(): void {
		this.showValidation = true;
		this.clearValidationErrorMessages();
	}

	goBack(): void {
		this.router.navigate(['../'], { relativeTo: this.route });
	}

	/**
	 * Reload same route
	 */
	reloadRoute() {
		// Must me used with onSameUrlNavigation to reload same url
		this.router.routeReuseStrategy.shouldReuseRoute = () => false;
		this.router.navigate([this.router.url]);
	}

	@HostListener('window:beforeunload')
	public canDeactivate(): boolean | Observable<boolean> {
		return !this.isDirty;
	}
}
