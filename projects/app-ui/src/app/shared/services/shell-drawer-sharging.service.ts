import { Injectable } from '@angular/core';
import { Customer } from 'projects/app-api/src/model/customer';
import { BehaviorSubject, Subject } from 'rxjs';

import { DrawerComponentItem } from '../models/drawerComponentItem';

export interface DrawerDetails {
	controlName?: string;
	rowIndex?: string;
}

@Injectable({ providedIn: 'root' })
export class ShellDrawerSharingService {
	private openCreateCustomerDrawer = new Subject<Customer>();
	openCreateCustomerDrawer$ = this.openCreateCustomerDrawer.asObservable();

	private publishDataOnClose = new Subject<any>();
	publishDataOnClose$ = this.publishDataOnClose.asObservable();

	private onCloseComponentInDrawer = new Subject<any>();
	onCloseComponentInDrawer$ = this.onCloseComponentInDrawer.asObservable();

	private sendTotalNumberOfComponents = new BehaviorSubject<number>(0);
	sendTotalNumberOfComponents$ = this.sendTotalNumberOfComponents.asObservable();

	private targetComponentDetails: DrawerDetails = {};

	private drawerCompoents = new BehaviorSubject<DrawerComponentItem[]>([]);
	drawerCompoents$ = this.drawerCompoents.asObservable();

	private activeComponents: DrawerComponentItem[] = [];

	openCreateCustomerForm(customer: Customer): void {
		this.openCreateCustomerDrawer.next(customer);
	}

	/**
	 * Send and Open component in drawer
	 * @param componentName component reference
	 * @param data any
	 * @param formMode 'edit' | 'add'
	 */
	openComponentInDrawer(componentName: any, data: any, formMode: 'edit' | 'add') {
		const activeComponent: DrawerComponentItem = {
			component: componentName,
			index: this.activeComponents.length,
			data: data,
			formMode: formMode
		};
		this.activeComponents.push(activeComponent);
		this.drawerCompoents.next(this.activeComponents);
	}

	sendDataOnClose(data: any): void {
		this.publishDataOnClose.next(data);
	}

	closeComponent(data?: any): void {
		console.log('called');
		this.onCloseComponentInDrawer.next(data);
		this.activeComponents.pop();
		setTimeout(() => {
			this.drawerCompoents.next(this.activeComponents);
		}, 50);
	}
}
